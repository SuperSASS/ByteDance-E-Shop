import { Button } from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

function Home() {
  const { t } = useTranslation('home')
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {user ? (
        <h1 className="text-3xl font-bold">{t('welcome', { name: user.name })}</h1>
      ) : (
        <Button onClick={() => navigate('/login')}>{t('login')}</Button>
      )}
    </div>
  )
}

export default Home
