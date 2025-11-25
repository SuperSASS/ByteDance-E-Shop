import { useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { Outlet } from 'react-router-dom'

export interface MainLayoutContext {
  scrollToTop: () => void
}

function MainLayout() {
  const mainRef = useRef<HTMLElement>(null)

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main ref={mainRef} className="bg-muted/40 flex-1 overflow-auto">
        <div className="mx-auto flex h-full w-full max-w-screen-2xl justify-center p-4 md:p-6">
          <Outlet context={{ scrollToTop } satisfies MainLayoutContext} />
        </div>
      </main>
    </div>
  )
}

export { MainLayout }
