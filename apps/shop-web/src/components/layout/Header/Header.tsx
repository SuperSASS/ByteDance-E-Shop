import { UserRoundIcon, SearchIcon, LogInIcon } from 'lucide-react'
import type { HeaderProps } from './Header.types'
import { cn } from '@/utils/cn'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Skeleton } from '@/components/ui/Skeleton'
import { Input } from '@/components/ui/Input'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserPanel } from '@/components/auth/UserPanel'
import { useAuthStore } from '@/stores/useAuthStore'
import { NotificationPopover } from '@/components/layout/NotificationPopover'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { HeaderLeft } from '@/components/layout/HeaderLeft'
import { mockNotifications } from './fixtures/notifications'
import useIsMobile from '@/hooks/use-is-mobile'
import { Button } from '@/components/ui/Button'
import { Navigations } from '@/config/navigation'

function Header({ className }: HeaderProps) {
  const { t } = useTranslation('header')
  const { t: t_nav, i18n } = useTranslation('nav')
  const { isMobile } = useIsMobile()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const handleLogout = useAuthStore((state) => state.logout)

  return (
    <header
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur', // 毛玻璃样式
        'sticky top-0 z-50 w-full border-b',
        'h-16 px-4 py-2 md:px-6',
        'grid grid-cols-[1fr_auto_1fr] items-center', // 左中右布局
        className
      )}
    >
      {/* 左侧 - Logo + 导航*/}
      <HeaderLeft />

      {/* 中间 - 搜索栏 / 标题 */}
      <div className={'flex min-w-[30vw] items-center justify-center'}>
        {isMobile ? (
          // 移动端: 页面标题
          <span className="text-lg font-semibold">
            {t_nav(Navigations.find((n) => n.to === location.pathname)?.id || 'home')}
          </span>
        ) : (
          // Desktop: 搜索框
          <>
            {/* Show Input on large screens (lg and up) */}
            <div className="relative hidden w-full lg:block">
              <SearchIcon className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder={t('search')}
                className="bg-background text-co w-full pl-8"
              />
            </div>

            {/* Show Icon Button on medium screens (md to lg) where space is tight */}
            <div className="flex lg:hidden">
              <Button variant="outline" size="icon" aria-label={t('search')}>
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 右侧 - 状态按钮 + 用户 */}
      <div className="flex items-center justify-end gap-2">
        {/* 移动端不展示 */}
        {!isMobile && (
          <div className="hidden items-center gap-2 md:flex">
            <NotificationPopover notifications={mockNotifications} />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        )}

        {user ? (
          <UserPanel
            user={user}
            trigger={
              <Avatar className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-80">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.avatar ? (
                    <Skeleton className="h-full w-full rounded-full" />
                  ) : (
                    user.name?.slice(0, 1).toUpperCase() || <UserRoundIcon className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
            }
            onLogout={handleLogout}
          />
        ) : (
          <Button variant="outline" size="icon" asChild>
            <NavLink to="/login" aria-label="Login">
              <LogInIcon />
            </NavLink>
          </Button>
        )}
      </div>
    </header>
  )
}

export { Header }
