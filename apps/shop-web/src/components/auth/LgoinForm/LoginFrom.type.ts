import type { Login } from '@/models/Login'

interface LoginFormProps extends Omit<React.ComponentProps<'div'>, 'onSubmit'> {
  onSubmit?: (data: Login) => void
}

export type { LoginFormProps }
