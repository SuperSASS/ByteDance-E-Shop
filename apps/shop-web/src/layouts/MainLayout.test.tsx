import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MainLayout } from './MainLayout'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Mock Header component to avoid testing its internal logic here
vi.mock('@/components/layout/Header/Header', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}))

describe('MainLayout', () => {
  it('renders Header and Outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div data-testid="mock-content">Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('mock-content')).toBeInTheDocument()
  })

  it('has correct layout structure classes', () => {
    const { container } = render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    )

    // Check for flex column layout
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('flex', 'h-screen', 'flex-col')

    // Check for main content area classes
    const main = container.querySelector('main')
    expect(main).toHaveClass('flex-1', 'overflow-hidden')
  })
})
