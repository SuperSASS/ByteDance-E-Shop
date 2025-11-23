import { Header } from '@/components/layout/Header/Header'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-hidden p-6 shadow">
        <Outlet />
      </main>
    </div>
  )
}

export { MainLayout }
