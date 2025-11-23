interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
}

type Notifications = Notification[]

export type { Notification, Notifications }
