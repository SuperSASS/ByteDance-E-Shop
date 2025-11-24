import type { LoginRequest } from '@e-shop/shared'

export interface LoginFormProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onSubmit'> {
  onSubmit?: (data: LoginRequest) => void
  error?: string | null // 错误信息
  isLoading?: boolean
}
