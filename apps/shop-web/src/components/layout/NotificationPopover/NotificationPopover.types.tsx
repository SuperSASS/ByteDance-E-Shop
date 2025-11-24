interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
}

interface NotificationPopoverProps {
  notifications: Notification[]
}

export type { Notification, NotificationPopoverProps }
