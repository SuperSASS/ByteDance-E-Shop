import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Separator } from '@/components/ui/Separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'
import {
  ACCESSORY_COMPATIBILITY,
  ACCESSORY_TYPES,
  ALL_ATTRIBUTES,
  AUDIO_CONNECTIVITY,
  AUDIO_FEATURES,
  AUDIO_TYPES,
  MAIN_CATEGORIES,
  PC_CPUS,
  PC_RAMS,
  PC_TYPES,
  PHONE_BRANDS,
  PHONE_SERIES,
  PHONE_STORAGE,
  TABLET_BRANDS,
  TABLET_CONNECTIVITY,
  TABLET_SIZES,
  TAGS,
  type MainCategory,
} from '@e-shop/shared'
import { ChevronRightIcon, XIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'
import { useCallback } from 'react'
import { StarRating } from '@/components/ui/StarRating'

export function FilterSidebar() {
  const { t } = useTranslation('product')
  const [searchParams, setSearchParams] = useSearchParams() // 使用 URLSearchParams 管理查询参数

  const currentCategory = searchParams.get('category') as MainCategory | null // 所选 MainCategory
  const minRating = Number(searchParams.get('minRating') || 0)

  // 更新查询参数（使用 URLSearchParams）
  const handleUpdateFilter = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams)
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      newParams.set('page', '1')
      setSearchParams(newParams)
    },
    [searchParams, setSearchParams]
  )

  const handleToggleTag = (tag: string) => {
    const currentTags = searchParams.getAll('tags')
    const newParams = new URLSearchParams(searchParams)

    if (currentTags.includes(tag)) {
      newParams.delete('tags')
      currentTags.filter((t) => t !== tag).forEach((t) => newParams.append('tags', t))
    } else {
      newParams.append('tags', tag)
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handleClearFilters = () => {
    setSearchParams({})
  }

  const handleCloseCategory = () => {
    // 只保留标签、价格、评分
    const newParams = new URLSearchParams()
    const keepKeys = ['keyword', 'minPrice', 'maxPrice', 'minRating', 'sort', 'pageSize', 'tags']

    searchParams.forEach((value, key) => {
      if (keepKeys.includes(key)) {
        newParams.append(key, value)
      }
    })

    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  return (
    <Card className="border-none shadow-none lg:border lg:shadow-sm">
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('filters')}</CardTitle>
          {Array.from(searchParams).length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-primary h-8 px-2 text-xs"
            >
              {t('reset')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 关键词（名称）筛选 */}
        <div className="space-y-2">
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchParams.get('keyword') || ''}
            onChange={(e) => handleUpdateFilter('keyword', e.target.value)}
            className="h-9"
          />
        </div>

        <Separator />

        {/* 类别筛选 */}
        <div className="space-y-2">
          <Label className="text-sm font-bold">{t('category')}</Label>
          {!currentCategory ? (
            <div className="flex flex-col gap-1">
              {MAIN_CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  className="h-8 justify-between px-2 font-normal"
                  onClick={() => handleUpdateFilter('category', cat)}
                >
                  {t(`categories.${cat}`)}
                  <ChevronRightIcon className="text-muted-foreground h-4 w-4" />
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted/50 flex items-center justify-between rounded-md p-2">
                <span className="text-sm font-medium">{t(`categories.${currentCategory}`)}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCloseCategory()}
                >
                  <XIcon className="h-3.5 w-3.5" />
                </Button>
              </div>

              {Object.entries(ALL_ATTRIBUTES[currentCategory]).map(([key, values]) => (
                <div key={key} className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs">{t(`categories.${key}`)}</Label>
                  <div className="flex flex-wrap gap-1">
                    {values.map((option) => {
                      const isActive = searchParams.get(key) === option
                      return (
                        <Button
                          key={option}
                          variant={isActive ? 'secondary' : 'outline'}
                          size="sm"
                          className={cn(
                            'h-6 px-2 text-xs',
                            isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
                          )}
                          onClick={() => handleUpdateFilter(key, isActive ? null : option)}
                        >
                          {t(`categories.${option}`, { defaultValue: option })}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* 标签筛选 */}
        <div className="space-y-3">
          <Label className="text-sm font-bold">{t('tag')}</Label>
          <div className="space-y-2">
            {TAGS.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={searchParams.getAll('tags').includes(tag)}
                  onCheckedChange={() => handleToggleTag(tag)}
                />
                <Label htmlFor={`tag-${tag}`} className="cursor-pointer text-sm font-normal">
                  {t(`tags.${tag}`, { defaultValue: tag })}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 价格筛选 */}
        <div className="space-y-2">
          <Label className="text-sm font-bold">{t('priceRange')}</Label>
          <div className="flex items-center justify-around gap-2">
            <Input
              type="number"
              placeholder={t('min')}
              className="h-8 w-20 text-xs"
              value={searchParams.get('minPrice') || ''}
              onChange={(e) => handleUpdateFilter('minPrice', e.target.value)}
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder={t('max')}
              className="h-8 w-20 text-xs"
              value={searchParams.get('maxPrice') || ''}
              onChange={(e) => handleUpdateFilter('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* 评分筛选 */}
        <Separator />
        <div className="space-y-2">
          <Label className="text-sm font-bold">{t('rating')}</Label>
          <div className="flex items-center gap-2">
            <StarRating
              value={minRating}
              onChange={(val) => handleUpdateFilter('minRating', val.toString())}
            />
            <span className="text-muted-foreground text-xs">
              {minRating > 0 ? t('ratingUp', { rating: minRating }) : t('allRatings')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
