import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { LoginForm } from '@/components/auth/LgoinForm'
import type { Login } from '@/models/Login'
import type { User } from '@/models/User'

export default function Login() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleLogin = (data: Login) => {
    // TODO: 模拟请求，以后改为 API Service
    const mockUser: User = {
      id: '1',
      name: 'Mock User',
      email: data.email,
      avatar: '',
    }
    login(mockUser)
    navigate(from, { replace: true })
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
