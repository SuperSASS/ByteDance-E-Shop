import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'lucide-react'

export default function ErrorPage() {
  const error = useRouteError()
  const { t } = useTranslation('common')

  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // 404 or other standard HTTP errors
    errorMessage = error.status === 404 ? t('error404') : error.statusText
  } else if (error instanceof Error) {
    // JS errors
    errorMessage = error.message
  } else {
    // Unknown
    errorMessage = t('errorGeneric')
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="bg-destructive/10 flex h-24 w-24 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('errorTitle')}</h1>
        <p className="text-muted-foreground text-lg">{errorMessage}</p>
      </div>
      <Button asChild size="lg">
        <Link to="/">{t('backHome')}</Link>
      </Button>
    </div>
  )
}
