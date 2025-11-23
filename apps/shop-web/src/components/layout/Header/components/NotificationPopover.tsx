import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Badge } from '@/components/ui/Badge'
import type { NotificationPopoverProps } from './NotificationPopover.types'
import { useTranslation } from 'react-i18next'

export function NotificationPopover({ notifications }: NotificationPopoverProps) {
  const { t } = useTranslation('user')
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold">{t('notification.title')}</h4>
          {unreadCount > 0 && (
            <span className="text-muted-foreground text-xs">
              {t('notification.unread', { count: unreadCount })}
            </span>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className={`hover:bg-muted/50 flex flex-col items-start gap-1 border-b px-4 py-3 text-left transition-colors ${
                    !notification.read ? 'bg-muted/20' : ''
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm font-medium">{notification.title}</span>
                    <span className="text-muted-foreground text-xs">{notification.time}</span>
                  </div>
                  <span className="text-muted-foreground line-clamp-2 text-xs">
                    {notification.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground flex h-[150px] items-center justify-center text-sm">
              {t('notification.noNotifications')}
            </div>
          )}
        </ScrollArea>
        <div className="border-t p-2">
          <Button variant="ghost" className="h-8 w-full text-xs">
            {t('notification.viewAll')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
