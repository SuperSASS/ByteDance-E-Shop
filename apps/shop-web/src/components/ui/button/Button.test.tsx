import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button Component', () => {
  // 1. 基础渲染测试
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  // 2. 事件处理测试
  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // 3. 变体(Variants)测试
  it('applies variant classes correctly', () => {
    // 测试 destructive 变体
    const { rerender } = render(<Button variant="destructive">Delete</Button>)
    let button = screen.getByRole('button', { name: /delete/i })
    // 检查是否包含 destructive 对应的类名 (根据 Button.variants.ts)
    expect(button.className).toContain('bg-destructive')
    expect(button.className).toContain('text-white')

    // 测试 outline 变体
    rerender(<Button variant="outline">Cancel</Button>)
    button = screen.getByRole('button', { name: /cancel/i })
    expect(button.className).toContain('border-input')
    expect(button.className).toContain('bg-background')
  })

  // 4. 多态性(Polymorphism)测试 - asChild
  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/login">Login</a>
      </Button>
    )

    // 应该渲染为链接而不是按钮
    const link = screen.getByRole('link', { name: /login/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/login')
    // 仍然应该有按钮的样式
    expect(link.className).toContain('inline-flex')
  })

  // 5. 禁用状态测试
  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })
})
