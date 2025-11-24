import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { LoginForm } from '@/components/auth/LoginForm'
import { authService } from '@/services/authService'
import type { Login } from '@/models/Login'

export default function Login() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const handleLogin = async (data: Login) => {
    setError(null)
    setIsLoading(true)

    try {
      // 调用后端 API 登录
      const response = await authService.login({
        email: data.email,
        password: data.password,
      })

      // 登录成功,保存用户信息和 token
      login(response.user, response.token)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-muted dark:bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-black dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]"></div>
      <div className="relative z-10 w-full max-w-sm md:max-w-4xl">
        <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />
      </div>
    </div>
  )
}
