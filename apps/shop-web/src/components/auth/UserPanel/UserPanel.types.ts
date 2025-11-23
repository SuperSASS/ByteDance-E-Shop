import type { User } from '@/models/User'

interface UserPanelProps {
  user: User | null
  trigger: React.ReactNode
  onLogout: () => void
}

export type { UserPanelProps }
