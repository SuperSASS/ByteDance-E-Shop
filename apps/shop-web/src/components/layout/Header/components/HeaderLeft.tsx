import { Menu, ShoppingBasketIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from '@/components/ui/Sheet'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import useIsMobile from '@/hooks/use-is-mobile'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu'
import { Navigations } from '@/config/navigation'

// 公司图标组件，可以根据需要替换为实际的公司 Logo
const CompanyIcon = ({ ...props }) => <ShoppingBasketIcon {...props} />

export function HeaderLeft() {
  const { t } = useTranslation('header')
  const { t: t_sr } = useTranslation('sr')
  const { t: t_nav } = useTranslation('nav')
  const { isMobile } = useIsMobile()

  const CompanyInfo = () => (
    <div className="text-primary flex items-center gap-2 text-xl font-bold">
      <CompanyIcon className="h-6 w-6" />
      <span className="text-nowrap">{t('title')}</span>
    </div>
  )

  return isMobile ? (
    // 移动端
    <div className="flex items-center gap-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t_sr('toggleMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" showCloseBtn={false} className="p-2">
          <SheetHeader>
            <CompanyInfo />
          </SheetHeader>
          <nav className="mx-4 flex flex-col gap-4">
            {Navigations.map((item) => (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'hover:text-primary rounded-md p-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )
                }
              >
                {t_nav(item.id)}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  ) : (
    // 桌面端
    <div className="flex items-center gap-2">
      <CompanyInfo />
      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList>
          {Navigations.map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(isActive && 'bg-accent text-accent-foreground font-bold')
                  }
                >
                  {t_nav(item.id)}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
