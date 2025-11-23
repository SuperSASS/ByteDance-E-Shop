import { ShoppingBasketIcon, UserRound } from 'lucide-react'
import type { HeaderProps } from './Header.types'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Skeleton } from '@/components/ui/Skeleton'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserPanel } from '@/components/auth/UserPanel'
import { useAuthStore } from '@/stores/useAuthStore'
import { NotificationPopover } from './components/NotificationPopover'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { ThemeToggle } from './components/ThemeToggle'
import { mockNotifications } from '../fixtures/notifications'

function Header({ className }: HeaderProps) {
  const { t } = useTranslation('header') // 确保加载了对应的 namespace
  const user = useAuthStore((state) => state.user)
  const handleLogout = useAuthStore((state) => state.logout)

  return (
    <header className={cn('flex h-16 items-center justify-between border-b px-6 py-2', className)}>
      {/* 左侧 - Logo + 导航*/}
      <div className="flex items-center gap-2">
        <ShoppingBasketIcon color="#33b0e6" />{' '}
        {/* TODO: [Lv.2] 这里定死了颜色，后续更改为主题色相关方式 */}
        <h1> {t('title')} </h1>
        <nav>
          {/* TODO: [Lv.2] 重构为对象存储，动态生成，而不是写死 */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(navigationMenuTriggerStyle(), isActive && 'font-bold')
                    }
                  >
                    {t('home')}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      cn(navigationMenuTriggerStyle(), isActive && 'font-bold')
                    }
                  >
                    {t('products')}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      cn(navigationMenuTriggerStyle(), isActive && 'font-bold')
                    }
                  >
                    {t('orders')}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      {/* 中间 - 搜索栏 */}
      <div className="flex items-center gap-2">
        {/* TODO: [Lv.1] 优化样式 */}
        <input type="text" placeholder={t('search')} />
      </div>

      {/* 右侧 - 状态按钮 + 用户 */}
      <div className="flex items-center gap-2">
        {/* TODO: [Lv.2]现在是 mock 数据 */}
        <NotificationPopover notifications={mockNotifications} />
        <LanguageSwitcher />
        <ThemeToggle />
        <UserPanel
          user={user}
          trigger={
            // 按状态显示头像
            <Avatar>
              {user?.avatar && <AvatarImage src={user.avatar} />}
              <AvatarFallback>
                {!user ? (
                  <UserRound className="h-6 w-6" />
                ) : user.avatar ? (
                  <Skeleton className="h-full w-full rounded-full" />
                ) : (
                  user.name?.slice(0, 2).toUpperCase() || <UserRound className="h-6 w-6" />
                )}
              </AvatarFallback>
            </Avatar>
          }
          onLogout={handleLogout}
        />
      </div>
    </header>
  )
}

export { Header }
