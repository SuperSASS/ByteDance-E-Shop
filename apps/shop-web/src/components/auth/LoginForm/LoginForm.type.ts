import type { Login } from '@/models/Login'

export interface LoginFormProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
  onSubmit?: (data: Login) => void
  error?: string | null // 错误信息
  isLoading?: boolean
}
