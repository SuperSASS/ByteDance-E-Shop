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

export default function ProductPage() {
  const { t } = useTranslation('product')
  const { t: t_nav } = useTranslation('nav')
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const response = await productService.getProducts({})
      setTotal(response.total)
      setPage(response.page)
      setPageSize(response.pageSize)
      setProducts(response.items)
    } finally {
      setIsLoading(false)
    }
  }

  // 加载数据
  // TODO: [Lv.2] 采用 React Query 管理数据？
  useEffect(() => {
    loadData()
  }, [])

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
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('allProducts')}</h1>
            <div className="text-muted-foreground text-sm">
              {t('showingResults', {
                begin: (page - 1) * pageSize + 1,
                end: page * pageSize,
                total,
              })}
            </div>
          </div>

          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
