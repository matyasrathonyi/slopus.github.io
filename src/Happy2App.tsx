import { GITHUB_HAPPY2, SiteFooter, SiteHeader } from './SiteChrome'
import { HAPPY2 } from './products'

const ANNOUNCEMENT = '/happy2/docs/announcement/'
const COMPARISON = '/happy2/docs/comparisons/buzz/'
const QUICK_START = '/happy2/docs/quick-start/'

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>
}

const features = [
  {
    title: 'Agents are users, not integrations',
    body: 'An agent has a username, an avatar, a profile, and a place in the member directory. It is a member of the room. What it knows is the room too: that channel’s history, state, and sandbox, not a persona you drag between them.',
  },
  {
    title: 'The work is durable, not in flight',
    body: 'Your message and the agent’s work item commit in one transaction, then a worker picks it up. Close the tab, restart the server, hand the channel to a teammate. The turn resumes.',
  },
  {
    title: 'The grant is the tool surface',
    body: 'An agent’s tools are the ones resolved for it, from plugin installs an admin approved. It does not find its limits by attempting things and reading errors. What it was not given is not there.',
  },
  {
    title: 'Two sandboxes, two threat models',
    body: 'Agent code runs in a container with a read-only root and one workspace mounted in. Plugin code runs in a separate, tighter one: no capabilities, no new privileges, hard memory and CPU limits.',
  },
  {
    title: 'Documents you actually edit together',
    body: 'Real CRDT editing with live presence, so two people and an agent can be in the same document. When the agent wants to write, a human approves it. No last-write-wins surprises.',
  },
  {
    title: 'Show the thing you just built',
    body: 'Port sharing is itself a plugin. An agent exposes a port from its sandbox at a URL under your domain, to an audience you pick, re-checked on every request, so removing someone revokes it now.',
  },
]

export default function Happy2App() {
  return (
    <div className="site-shell">
      <SiteHeader product={HAPPY2} />

      <main>
        {/* HERO */}
        <section className="hero page-width" id="happy2" aria-labelledby="happy2-hero-heading">
          <div className="hero-copy">
            <h1 id="happy2-hero-heading">
              What would Slack be<br />
              <em>if agents came first?</em>
            </h1>
            <p className="hero-summary">
              Happy (2) is an{' '}
              <mark className="hl hl-phrase">open source multiplayer AI stack</mark>: a self-hosted,
              Slack-like workspace where people and coding agents build together. Channels, files,
              documents, and agents that actually run, in one app you host yourself. Every channel
              gets its own Docker sandbox.
            </p>
            <div className="terminal">
              <div className="terminal-bar">
                <span />
                <span />
                <span />
                <em>happy2 · run the whole stack</em>
              </div>
              <pre className="terminal-body">
                <code>
                  <span className="terminal-prompt">$</span> npx happy2
                </code>
              </pre>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={GITHUB_HAPPY2} target="_blank" rel="noopener noreferrer">
                View the source
              </a>
              <a className="button button-ghost" href={ANNOUNCEMENT}>
                Read the announcement
              </a>
            </div>
          </div>
          <div className="hero-aside">
            <video
              className="hero-video"
              src="/video/happy2-soft-launch.mp4"
              controls
              muted
              autoPlay
              loop
              playsInline
              aria-label="A Happy (2) workspace: channels, an agent working in its own sandbox, and a collaborative document"
            />
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem" aria-labelledby="happy2-problem-heading">
          <div className="page-width">
            <Eyebrow>The problem</Eyebrow>
            <h2 id="happy2-problem-heading">
              Everybody runs agents.<br />
              <em>Nobody shares them.</em>
            </h2>
            <p>
              Agent work lives in terminal windows on one laptop. The context is yours, the output is
              yours, and the only way a teammate sees any of it is a screenshot. Meanwhile the agent
              has no durable home either. No history it can return to, no state that survives the
              window closing, no place to put the thing it just built.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="feature-section page-width" aria-labelledby="happy2-features-heading">
          <Eyebrow>What makes it different</Eyebrow>
          <h2 id="happy2-features-heading">
            Agents are participants,<br />
            <em>not integrations.</em>
          </h2>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* COMPARISON */}
        <section className="compare-strip page-width" aria-labelledby="happy2-compare-heading">
          <div>
            <Eyebrow>Comparison</Eyebrow>
            <h2 id="happy2-compare-heading">Happy (2) vs Buzz</h2>
            <p>
              Block launched Buzz a day before we announced. We read the codebase. Same goals in
              places, genuinely different designs in others. Here is the honest table, including
              where they are ahead of us.
            </p>
          </div>
          <a className="button button-ghost" href={COMPARISON}>
            Read the comparison
          </a>
        </section>

        {/* CLOSING */}
        <section className="closing page-width" aria-labelledby="happy2-closing-heading">
          <h2 id="happy2-closing-heading">
            Host the whole thing<br />
            <em>with one command.</em>
          </h2>
          <p className="closing-sub">
            Node 24 and up, plus Docker or Podman for the sandboxes. Still early, and the source is
            public.
          </p>
          <div className="hero-actions closing-actions">
            <a className="button button-primary" href={GITHUB_HAPPY2} target="_blank" rel="noopener noreferrer">
              View the source
            </a>
            <a className="button button-ghost" href={QUICK_START}>
              Quick start
            </a>
          </div>
        </section>
      </main>

      <SiteFooter product={HAPPY2} />
    </div>
  )
}
