import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import Happy2App from './Happy2App'
import { Router } from './Router'

function productSwitch() {
  return screen.getByRole('group', { name: 'Choose a product' })
}

describe('Happy Desktop landing page', () => {
  afterEach(() => {
    cleanup()
  })

  it('leads with the Happy Desktop pitch', () => {
    render(<Happy2App />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading.textContent).toMatch(/any team\.\s*any model\.\s*one harness\./i)
  })

  it('sends the download straight to the latest release', () => {
    render(<Happy2App />)

    const download = screen.getAllByRole('link', { name: /download for macos/i })

    expect(download.length).toBeGreaterThan(0)
    for (const link of download) {
      expect(link.getAttribute('href')).toBe('https://github.com/slopus/happy-desktop/releases/latest')
    }
  })

  it('no longer pitches an npx command', () => {
    const { container } = render(<Happy2App />)

    expect(container.textContent).not.toMatch(/npx/i)
    expect(container.querySelector('.terminal')).toBeNull()
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

  it('is served at /desktop', () => {
    render(<Router pathname="/desktop/" />)

    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/one harness/i)
  })

  it('still answers on the old /happy2 URLs', () => {
    const { unmount } = render(<Router pathname="/happy2/" />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/one harness/i)
    unmount()

    render(<Router pathname="/happy2/docs/quick-start/" />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/quick start/i)
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

    const current = within(productSwitch()).getByRole('link', { name: 'Happy Mobile' })

    expect(current.getAttribute('aria-current')).toBe('page')
    expect(within(productSwitch()).getByRole('link', { name: /^Happy Desktop/ }).getAttribute('aria-current')).toBeNull()
  })

  it('follows the URL into the Happy Desktop documentation', () => {
    render(<Router pathname="/desktop/docs/quick-start/" />)

    const current = within(productSwitch()).getByRole('link', { name: /^Happy Desktop/ })

    expect(current.getAttribute('aria-current')).toBe('page')
  })

  it('stays on Happy for the Happy documentation', () => {
    render(<Router pathname="/docs/quick-start/" />)

    const current = within(productSwitch()).getByRole('link', { name: 'Happy Mobile' })

    expect(current.getAttribute('aria-current')).toBe('page')
  })
})
