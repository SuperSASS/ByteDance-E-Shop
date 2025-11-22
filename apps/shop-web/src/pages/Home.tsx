import { useState } from 'react'
import { Button } from '../components/ui/button/button'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t, i18n } = useTranslation()

  const [count, setCount] = useState(0)

  return (
    <>
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
          {t('switch-language')}
        </Button>
      </div>
    </>
  )
}

export default Home
