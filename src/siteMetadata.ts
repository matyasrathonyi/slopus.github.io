import type { ProductKey } from './products'

export interface PageMetadata {
  title: string
  description: string
  canonicalPath: string
  socialTitle?: string
  socialDescription?: string
  twitterDescription?: string
  robots?: string
}

export const homepageMetadata: PageMetadata = {
  title: 'Happy — Remote Control for Claude Code & Codex',
  description:
    'Happy is the open-source remote control for Claude Code, Codex, and other coding agents running on your computers. Use them from iOS, Android, or the web.',
  canonicalPath: '/',
  socialTitle: 'Happy — Leave your desk. Keep your agents moving.',
  socialDescription:
    'Start, steer, approve, and review coding agents running on your own computers from iOS, Android, or the web.',
  twitterDescription:
    'Control Claude Code, Codex, and other coding agents running on your computers from anywhere.',
}

export const happy2Metadata: PageMetadata = {
  title: 'Happy (2) — Open Source Multiplayer AI Stack',
  description:
    'Happy (2) is a self-hosted, Slack-like workspace where people and coding agents build together. One server owns the truth, every channel gets its own sandbox, and the whole thing starts with npx happy2.',
  canonicalPath: '/happy2/',
  socialTitle: 'Happy (2) — an open source multiplayer AI stack',
  socialDescription:
    'A self-hosted, Slack-like workspace where people and coding agents build together. Channels, files, documents, and sandboxed agents in one app you run yourself.',
  twitterDescription:
    'Self-hosted, Slack-like, agents first. One command to run the whole stack: npx happy2.',
}

export const docsMetadata: PageMetadata = {
  title: 'Happy Docs — Remote Control for Coding Agents',
  description:
    'Install, configure, self-host, and use Happy with Claude Code, Codex, and other coding agents across desktop, mobile, and web.',
  canonicalPath: '/docs/',
}

export const happy2DocsMetadata: PageMetadata = {
  title: 'Happy (2) Docs — Self-Hosted Workspace for People and Agents',
  description:
    'Install, self-host, and understand Happy (2): channels, sandboxed agents, collaborative documents, and plugins in one app you run yourself.',
  canonicalPath: '/happy2/docs/',
}

export function docsMetadataForProduct(product: ProductKey): PageMetadata {
  return product === 'happy2' ? happy2DocsMetadata : docsMetadata
}

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
}

export function applyPageMetadata(metadata: PageMetadata) {
  const canonicalUrl = new URL(metadata.canonicalPath, 'https://happy.engineering').toString()
  const socialTitle = metadata.socialTitle ?? metadata.title
  const socialDescription = metadata.socialDescription ?? metadata.description

  document.title = metadata.title
  setMetaContent('meta[name="description"]', metadata.description)
  setMetaContent('meta[name="robots"]', metadata.robots ?? 'index, follow')
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  setMetaContent('meta[property="og:url"]', canonicalUrl)
  setMetaContent('meta[property="og:title"]', socialTitle)
  setMetaContent('meta[property="og:description"]', socialDescription)
  setMetaContent('meta[name="twitter:title"]', socialTitle)
  setMetaContent(
    'meta[name="twitter:description"]',
    metadata.twitterDescription ?? socialDescription,
  )
}