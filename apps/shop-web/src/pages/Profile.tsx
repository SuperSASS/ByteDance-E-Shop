import { Button } from '@/components/ui/Button'
import { useAuthStore } from '../stores/useAuthStore'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const { t } = useTranslation('profile')

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">{t('profile')}</h1>
      <p>
        {t('welcome')} {user?.name} ({user?.email})
      </p>
      <Button variant="destructive" onClick={logout}>
        {t('logout')}
      </Button>
    </div>
  )
}
