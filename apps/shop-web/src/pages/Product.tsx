import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb'
import { FilterSidebar } from '@/components/product/FilterSidebar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ChevronDownIcon, FilterIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu/DropdownMenu'
import { useEffect, useState } from 'react'
import { productService } from '@/services/productService'
import type { ProductDTO } from '@e-shop/shared'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useOutletContext } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination/Pagination'
import { generatePageNumbers } from '@/utils/generatePageNumbers'
import type { MainLayoutContext } from '@/layouts/MainLayout'
import useDebounce from '@/hooks/use-debounce'

export default function ProductPage() {
  const { t } = useTranslation('product')
  const { t: t_nav } = useTranslation('nav')
  const [searchParams, setSearchParams] = useSearchParams()
  const { scrollToTop } = useOutletContext<MainLayoutContext>()

  // 添加防抖：当 URL searchParams 变化时，延迟 500ms 再重新加载数据
  const debouncedSearchParams = useDebounce(searchParams, 500)

  const [products, setProducts] = useState<ProductDTO[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [isLoading, setIsLoading] = useState(true)

  const totalPages = Math.ceil(total / pageSize)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const response = await productService.getProducts(searchParams)
      setTotal(response.total)
      setPage(response.page)
      setPageSize(response.pageSize)
      setProducts(response.items)
    } finally {
      setIsLoading(false)
    }
  }

  // 当 debouncedSearchParams 变化时加载数据（防抖处理）
  // 原理：筛选条件改变 -> debouncedSearchParams 变化（在 FilterSidebar 中 setSearchParams） -> loadData 加载筛选后的数据
  useEffect(() => {
    loadData()
  }, [debouncedSearchParams])

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', newPage.toString())
    setSearchParams(newParams)
    scrollToTop()
  }

  const handleResetFilters = () => {
    setSearchParams({})
    scrollToTop()
  }

  return (
    <div className="container py-6">
      {/* 面包屑导航 */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t_nav('home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t_nav('products')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8 pb-3 lg:flex-row">
        {/* 移动端筛选组件 */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <FilterIcon className="mr-2 h-4 w-4" />
              {t('filters')}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <FilterSidebar />
          </SheetContent>
        </Sheet>

        {/* 桌面端筛选组件 */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <FilterSidebar />
        </aside>

        {/* 商品展示 */}
        <div className="flex-1">
          {/* 搜索结果标题栏 */}
          <div className="items-top mb-6 flex justify-between gap-4">
            <h1 className="text-2xl font-bold text-nowrap">{t('allProducts')}</h1>
            <div className="flex flex-wrap items-center justify-end gap-5">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">{t('sort')}:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      {t(`sorts.${searchParams.get('sort') || 'sales_desc'}`)}
                      <ChevronDownIcon className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {['sales_desc', 'sales_asc', 'price_desc', 'price_asc', 'newest', 'oldest'].map(
                      (sort) => (
                        <DropdownMenuItem
                          key={sort}
                          onClick={() => {
                            const newParams = new URLSearchParams(searchParams)
                            newParams.set('sort', sort)
                            newParams.set('page', '1') // 重置页码
                            setSearchParams(newParams)
                          }}
                        >
                          {t(`sorts.${sort}`)}
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="text-muted-foreground text-sm">
                {t('showingResults', {
                  begin: (page - 1) * pageSize + 1,
                  end: Math.min(page * pageSize, total),
                  total,
                })}
              </div>
            </div>
          </div>

          <ProductGrid
            products={products}
            isLoading={isLoading}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (page > 1) handlePageChange(page - 1) // 上一页
                      }}
                      className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {/* Page Numbers Logic */}
                  {generatePageNumbers(totalPages, page).map((item) =>
                    typeof item === 'string' ? (
                      <PaginationItem key={item}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={item}>
                        <PaginationLink
                          href="#"
                          isActive={page === item}
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(item) // 跳转到指定页码
                          }}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (page < totalPages) handlePageChange(page + 1) // 下一页
                      }}
                      className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
