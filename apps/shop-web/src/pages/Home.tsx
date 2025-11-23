import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t, i18n } = useTranslation()

  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold underline">{t('welcome')}</h1>
      <h1 className="mb-4 text-3xl font-bold">{i18n.language}</h1>
      <Button className="mb-4" onClick={() => setCount(count + 1)}>
        {t('count', { anb: count })}
      </Button>
      <Button
        className="mb-4"
        onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
      >
        {t('switchLanguage')}
      </Button>
      <div className="flex gap-4">
        <a href="/login" className="text-blue-500 hover:underline">
          Go to Login
        </a>
        <Button asChild className="text-blue-500 hover:underline">
          <a href="/profile">Go to Profile (Protected)</a>
        </Button>
      </div>
    </div>
  )
}

export default Home
