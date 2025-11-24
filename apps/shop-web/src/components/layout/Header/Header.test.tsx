import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Header } from './Header'
import { MemoryRouter } from 'react-router-dom'

// Mock dependencies
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@/hooks/use-is-mobile', () => ({
  default: () => ({ isMobile: false }),
}))

vi.mock('@/stores/useAuthStore', () => ({
  useAuthStore: (selector: any) =>
    selector({
      user: null,
      logout: vi.fn(),
    }),
}))

// Mock sub-components to isolate Header logic
vi.mock('@/components/layout/HeaderLeft', () => ({
  HeaderLeft: () => <div data-testid="header-left">HeaderLeft</div>,
}))
vi.mock('@/components/layout/NotificationPopover', () => ({
  NotificationPopover: () => <div data-testid="notification-popover">Notifications</div>,
}))
vi.mock('@/components/layout/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Lang</div>,
}))
vi.mock('@/components/layout/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme</div>,
}))
vi.mock('@/components/auth/UserPanel', () => ({
  UserPanel: () => <div data-testid="user-panel">UserPanel</div>,
}))

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders essential elements', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByTestId('header-left')).toBeInTheDocument()
    // Search input should be visible on desktop
    expect(screen.getByPlaceholderText('search')).toBeInTheDocument()
  })

  it('renders login button when user is not authenticated', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const loginLink = screen.getByRole('link', { name: /login/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('renders utility icons on desktop', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByTestId('notification-popover')).toBeInTheDocument()
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
