import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

/**
 * LoginProtectedRoute 组件：用于确保用户已登录，否决跳转至登陆页面
 *
 * 通常只用在路由中的某一个页面
 *
 * @param children -    要渲染的子组件
 * @returns 如果用户已登录，渲染子组件；否则跳转至登录页面
 */
export function LgoinProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

/*
如果要实现“按某按钮时需要登录”，这种交互时机、而非上面的加载时机，则可以用如下逻辑：

const handleAddToCart = () => {
    // 1. 判断是否登录
    if (!isAuthenticated) {
        // 2. 未登录 -> 跳转登录页 (并带上当前页面路径，以便登录后跳回来)
        navigate('/login', { state: { from: location } })
        // 或者：弹出登录 Modal (更现代的做法)
        // setIsLoginModalOpen(true)
        return
    }

    // 3. 已登录 -> 执行业务逻辑
    addToCart(product)
}
*/
