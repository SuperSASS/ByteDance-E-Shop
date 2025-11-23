import { User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../ui/DropdownMenu'
import type { UserPanelProps } from './UserPanel.types'
import { useTranslation } from 'react-i18next'

function UserPanel({ user, trigger, onLogout }: UserPanelProps) {
  const { t } = useTranslation('user')

  return (
    <DropdownMenu>
      {/* 1. 触发器：这里用 Button 包裹 Avatar，为了获得更好的点击态和键盘支持 */}
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      {/* 2. 菜单内容区域 */}
      {user && (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {/* 顶部用户信息栏 */}
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs leading-none">{user.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t('profile')}</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('settings')}</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* 登出按钮：红色醒目样式 */}
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logout')}</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

export { UserPanel }
