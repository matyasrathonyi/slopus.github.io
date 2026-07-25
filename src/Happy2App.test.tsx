import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import Happy2App from './Happy2App'
import { Router } from './Router'

function productSwitch() {
  return screen.getByRole('group', { name: 'Choose a product' })
}

describe('Happy (2) landing page', () => {
  afterEach(() => {
    cleanup()
  })

  it('leads with the Happy (2) pitch', () => {
    render(<Happy2App />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading.textContent).toMatch(/if agents came first/i)
  })

  it('shows the soft-launch demo', () => {
    const { container } = render(<Happy2App />)

    const video = container.querySelector('video')

    expect(video?.getAttribute('src')).toBe('/video/happy2-soft-launch.mp4')
  })

  it('links only to the repository, not the mobile app stores', () => {
    render(<Happy2App />)

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })

    expect(within(navigation).getByRole('link', { name: /on github/i })).toBeTruthy()
    expect(within(navigation).queryByRole('link', { name: /ios app/i })).toBeNull()
    expect(within(navigation).queryByRole('link', { name: /android app/i })).toBeNull()
  })

  it('is served at /happy2', () => {
    render(<Router pathname="/happy2/" />)

    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/if agents came first/i)
  })
})

describe('product switch', () => {
  afterEach(() => {
    cleanup()
  })

  it('offers both products from either page', () => {
    const { unmount } = render(<App />)
    expect(within(productSwitch()).getAllByRole('link')).toHaveLength(2)
    unmount()

    render(<Happy2App />)
    expect(within(productSwitch()).getAllByRole('link')).toHaveLength(2)
  })

  it('marks Happy as current on the homepage', () => {
    render(<App />)

    const current = within(productSwitch()).getByRole('link', { name: 'Happy' })

    expect(current.getAttribute('aria-current')).toBe('page')
    expect(within(productSwitch()).getByRole('link', { name: /^Happy \(2\)/ }).getAttribute('aria-current')).toBeNull()
  })

  it('follows the URL into the Happy (2) documentation', () => {
    render(<Router pathname="/happy2/docs/quick-start/" />)

    const current = within(productSwitch()).getByRole('link', { name: /^Happy \(2\)/ })

    expect(current.getAttribute('aria-current')).toBe('page')
  })

  it('stays on Happy for the Happy documentation', () => {
    render(<Router pathname="/docs/quick-start/" />)

    const current = within(productSwitch()).getByRole('link', { name: 'Happy' })

    expect(current.getAttribute('aria-current')).toBe('page')
  })
})
