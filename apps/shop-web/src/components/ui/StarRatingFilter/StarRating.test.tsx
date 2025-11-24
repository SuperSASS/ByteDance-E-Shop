import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('renders correctly with default props', () => {
    render(<StarRating value={3} onChange={() => {}} />)
    const stars = screen.getAllByRole('button')
    expect(stars).toHaveLength(5)
  })

  it('renders the correct number of stars based on max prop', () => {
    render(<StarRating value={0} onChange={() => {}} max={10} />)
    const stars = screen.getAllByRole('button')
    expect(stars).toHaveLength(10)
  })

  it('calls onChange with correct value when clicked (full star)', () => {
    const handleChange = vi.fn()
    render(<StarRating value={0} onChange={handleChange} />)

    const stars = screen.getAllByRole('button')
    const thirdStar = stars[2] // 0-indexed, so 3rd star

    // Mock getBoundingClientRect for the click handler calculation
    thirdStar.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      width: 20,
      top: 0,
      bottom: 20,
      right: 20,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => {},
    }))

    // Click on the right side (e.g., x=15, width=20 -> 15 > 10 -> full)
    fireEvent.click(thirdStar, { clientX: 15 })

    expect(handleChange).toHaveBeenCalledWith(3)
  })

  it('calls onChange with correct value when clicked (half star)', () => {
    const handleChange = vi.fn()
    render(<StarRating value={0} onChange={handleChange} />)

    const stars = screen.getAllByRole('button')
    const secondStar = stars[1] // 2nd star

    secondStar.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      width: 20,
      top: 0,
      bottom: 20,
      right: 20,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => {},
    }))

    // Click on the left side (e.g., x=5, width=20 -> 5 < 10 -> half)
    fireEvent.click(secondStar, { clientX: 5 })

    expect(handleChange).toHaveBeenCalledWith(1.5)
  })
})
