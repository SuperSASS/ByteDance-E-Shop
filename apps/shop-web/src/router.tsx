import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'
import { LgoinProtectedRoute } from './components/auth/LoginProtectedRoute'
import { MainLayout } from './layouts/MainLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <MainLayout>
        <ErrorPage />
      </MainLayout>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: (
          <LgoinProtectedRoute>
            <Profile />
          </LgoinProtectedRoute>
        ),
      },
      {
        path: '/products',
        async lazy() {
          const { default: ProductPage } = await import('./pages/Product')
          return { Component: ProductPage }
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
