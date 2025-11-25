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
import { FilterIcon } from 'lucide-react'
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

export default function ProductPage() {
  const { t } = useTranslation('product')
  const { t: t_nav } = useTranslation('nav')
  const [searchParams, setSearchParams] = useSearchParams()
  const { scrollToTop } = useOutletContext<MainLayoutContext>()

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

  // 当 searchParams 变化时加载数据
  // 原理：筛选条件改变 -> searchParams 变化（在 FilterSidebar 中 setSearchParams） -> loadData 加载筛选后的数据
  useEffect(() => {
    loadData()
  }, [searchParams])

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('page', newPage.toString())
    setSearchParams(newParams)
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

      <div className="flex flex-col gap-8 lg:flex-row">
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
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('allProducts')}</h1>
            {/* TODO: 在这里加上排序方式 */}
            <div></div>
            <div className="text-muted-foreground text-sm">
              {t('showingResults', {
                begin: (page - 1) * pageSize + 1,
                end: Math.min(page * pageSize, total),
                total,
              })}
            </div>
          </div>

          <ProductGrid products={products} isLoading={isLoading} />

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
