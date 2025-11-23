import { Button } from '@/components/ui/Button'
import { useAuthStore } from '../stores/useAuthStore'

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p>
        Welcome, {user?.name} ({user?.email})
      </p>
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}
