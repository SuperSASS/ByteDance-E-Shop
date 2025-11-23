interface NavigationItem {
  id: string // 需要跟 i18n 中的 nav 里对应
  to: string // 导航链接
}

export const Navigations: NavigationItem[] = [
  {
    id: 'home',
    to: '/',
  },
  {
    id: 'products',
    to: '/products',
  },
  {
    id: 'orders',
    to: '/orders',
  },
]
