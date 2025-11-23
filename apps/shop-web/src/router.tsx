import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { LgoinProtectedRoute } from './components/auth/LoginProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // TODO: 删除临时测试
  {
    path: '/profile',
    element: (
      <LgoinProtectedRoute>
        <Profile />
      </LgoinProtectedRoute>
    ),
  },
])
