import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const distRoot = path.join(projectRoot, 'dist')
const baseHtml = await readFile(path.join(distRoot, 'index.html'), 'utf8')
const siteUrl = 'https://happy.engineering'

const docsSections = [
  {
    contentRoot: path.join(projectRoot, 'content', 'docs'),
    routeRoot: 'docs',
    canonicalRoot: '/docs',
    indexTitle: 'Happy Docs — Remote Control for Coding Agents',
    titleSuffix: 'Happy Docs',
    description:
      'Install, configure, self-host, and use Happy with Claude Code, Codex, and other coding agents across desktop, mobile, and web.',
  },
  {
    contentRoot: path.join(projectRoot, 'content', 'happy2'),
    routeRoot: path.posix.join('happy2', 'docs'),
    canonicalRoot: '/happy2/docs',
    indexTitle: 'Happy (2) Docs — Self-Hosted Workspace for People and Agents',
    titleSuffix: 'Happy (2) Docs',
    description:
      'Install, self-host, and understand Happy (2): channels, sandboxed agents, collaborative documents, and plugins in one app you run yourself.',
  },
]

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? findMarkdownFiles(entryPath) : [entryPath]
  }))

  return files.flat().filter((file) => file.endsWith('.mdx'))
}

function titleFromFilename(filename) {
  return filename
    .replace(/\.mdx$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function replaceMeta(html, attribute, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const expression = new RegExp(
    `(<meta\\s+${attribute}="${escapedName}"\\s+content=")[^"]*("\\s*\\/?>)`,
  )
  return html.replace(expression, `$1${escapeHtml(content)}$2`)
}

function htmlForPage({
  title,
  description,
  canonicalPath,
  socialTitle = title,
  socialDescription = description,
  twitterDescription = socialDescription,
  robots = 'index, follow',
}) {
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString()
  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/,
      `$1${escapeHtml(canonicalUrl)}$2`,
    )
    .replace(/\s*<script id="software-application-schema"[\s\S]*?<\/script>/, '')

  html = replaceMeta(html, 'name', 'description', description)
  html = replaceMeta(html, 'name', 'robots', robots)
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl)
  html = replaceMeta(html, 'property', 'og:title', socialTitle)
  html = replaceMeta(html, 'property', 'og:description', socialDescription)
  html = replaceMeta(html, 'name', 'twitter:title', socialTitle)
  html = replaceMeta(html, 'name', 'twitter:description', twitterDescription)
  return html
}

async function writeRoute(route, html) {
  const routeDirectory = path.join(distRoot, route)
  await mkdir(routeDirectory, { recursive: true })
  await writeFile(path.join(routeDirectory, 'index.html'), html)
}

let documentRoutes = 0

for (const section of docsSections) {
  const files = await findMarkdownFiles(section.contentRoot)

  for (const filename of files) {
    const relativePath = path.relative(section.contentRoot, filename).replace(/\\/g, '/')
    const documentPath = relativePath
      .replace(/\.mdx$/, '')
      .replace(/(^|\/)index$/, '')
      .replace(/\/$/, '')
    const markdown = await readFile(filename, 'utf8')
    const markdownTitle = markdown.match(/^#\s+(.+)$/m)?.[1].trim()
    const contentTitle = markdownTitle ?? titleFromFilename(path.basename(relativePath))
    const isIndex = documentPath === ''

    await writeRoute(
      path.posix.join(section.routeRoot, documentPath),
      htmlForPage({
        title: isIndex ? section.indexTitle : `${contentTitle} — ${section.titleSuffix}`,
        description: section.description,
        canonicalPath: `${section.canonicalRoot}/${documentPath ? `${documentPath}/` : ''}`,
      }),
    )
    documentRoutes += 1
  }
}

await writeRoute('happy2', htmlForPage({
  title: 'Happy (2) — Open Source Multiplayer AI Stack',
  description:
    'Happy (2) is a self-hosted, Slack-like workspace where people and coding agents build together. One server owns the truth, every channel gets its own sandbox, and the whole thing starts with npx happy2.',
  canonicalPath: '/happy2/',
  socialTitle: 'Happy (2) — an open source multiplayer AI stack',
  socialDescription:
    'A self-hosted, Slack-like workspace where people and coding agents build together. Channels, files, documents, and sandboxed agents in one app you run yourself.',
  twitterDescription:
    'Self-hosted, Slack-like, agents first. One command to run the whole stack: npx happy2.',
}))

// The Buzz comparison moved into the Happy (2) section; keep the announced URL resolving.
await writeRoute('docs/comparisons/happy-2-vs-buzz', htmlForPage({
  title: 'Happy (2) vs Buzz — Happy (2) Docs',
  description: "Where Happy (2) and Block's Buzz agree, and where the designs split.",
  canonicalPath: '/happy2/docs/comparisons/buzz/',
}))

await writeRoute('privacy', htmlForPage({
  title: 'Privacy Policy — Happy',
  description: 'Privacy policy for Happy.',
  canonicalPath: '/privacy/',
}))
await writeRoute('terms', htmlForPage({
  title: 'Terms of Use — Happy',
  description: 'Terms of use for Happy.',
  canonicalPath: '/terms/',
}))
await writeRoute('tos', htmlForPage({
  title: 'Terms of Use — Happy',
  description: 'Terms of use for Happy.',
  canonicalPath: '/terms/',
}))
await writeFile(
  path.join(distRoot, '404.html'),
  htmlForPage({
    title: 'Page not found — Happy',
    description: 'The requested Happy page could not be found.',
    canonicalPath: '/404.html',
    robots: 'noindex, follow',
  }),
)

console.log(`Generated ${documentRoutes + 5} static routes.`)
