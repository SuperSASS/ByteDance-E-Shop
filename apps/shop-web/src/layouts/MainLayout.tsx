import { Header } from '@/components/layout/Header/Header'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="bg-muted/40 flex-1 overflow-hidden">
        <div className="mx-auto h-full w-full max-w-screen-2xl p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export { MainLayout }
