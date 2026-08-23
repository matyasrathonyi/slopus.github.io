import { GITHUB_HAPPY2, SiteFooter, SiteHeader } from './SiteChrome'
import { AppStoreButton, GooglePlayButton } from './StoreButtons'
import { KIRILL, STEVE, TeamSection } from './Team'
import { HAPPY2 } from './products'

const COMPARISON = '/desktop/docs/comparisons/buzz/'
const QUICK_START = '/desktop/docs/quick-start/'
/** Resolves to whatever shipped most recently, so it never needs a release-day edit. */
const DOWNLOAD_MACOS = 'https://github.com/slopus/happy-desktop/releases/latest'

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>
}

const features = [
  {
    title: 'Natively multiplayer',
    body: 'A session is not a private transcript. Bring your team into the same conversation with the same agent: anyone can share context, steer, approve, and take over in real time.',
  },
  {
    title: 'One harness, every agent',
    body: 'Let Claude plan, Codex build, and Grok review, or run them side by side. Each model keeps its native prompts and tools, while the session, permissions, and context survive every handoff.',
  },
  {
    title: 'Sessions that outlive the window',
    body: 'Start a task at your desk, check it from your phone, hand it to a teammate. Same session, same history, same permission boundary, on every device.',
  },
  {
    title: 'The environment, not just the chat',
    body: 'Conversations sit beside the files, diffs, terminals, and previews the work actually touches. Review a change, edit a file, or open rendered HTML without leaving the app.',
  },
  {
    title: 'Nowhere you did not send it',
    body: 'No telemetry, no hosted account, no third-party servers by default. Everything moving between agents, teammates, and devices is end-to-end encrypted, and relays carry ciphertext they cannot read.',
  },
  {
    title: 'Yours to run, yours to change',
    body: 'Open source end to end. Run it on your hardware, in your cloud, or in ours, and change it to fit how your team works. Your projects stay ordinary directories on your machine.',
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
              Any team. Any model.<br />
              <em>One harness.</em>
            </h1>
            <p className="hero-summary">
              Happy Desktop is the{' '}
              <mark className="hl hl-phrase">open source harness for coding agents</mark>: it runs
              every agent you already pay for, keeps each session alive and shareable, and never
              ships your work anywhere you did not point it. Conversations sit beside the files,
              diffs, terminals, and previews the work touches.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={DOWNLOAD_MACOS} target="_blank" rel="noopener noreferrer">
                Download for macOS
              </a>
              <a className="button button-ghost" href={GITHUB_HAPPY2} target="_blank" rel="noopener noreferrer">
                View the source
              </a>
            </div>
            <p className="hero-note">
              Open it and setup runs itself: Happy starts its own agent runtime and picks up the
              Claude, Codex, and Grok sign-ins already on your machine.
            </p>
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
              aria-label="A Happy Desktop workspace: channels, an agent working in its own sandbox, and a collaborative document"
            />
          </div>
        </section>

        {/* PROBLEM */}
        <section className="problem" aria-labelledby="happy2-problem-heading">
          <div className="page-width">
            <Eyebrow>The problem</Eyebrow>
            <h2 id="happy2-problem-heading">
              Serious agent work<br />
              <em>outgrows a terminal tab.</em>
            </h2>
            <p>
              Sessions die with the window that held them. Every vendor’s agent lives in its own app
              with its own tools, its own permissions, and its own idea of a session, so switching
              models means abandoning context. Your teammates cannot see what your agent is doing,
              let alone step in. And the moment the work matters, someone asks where the code is
              going and who can read it.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="feature-section page-width" aria-labelledby="happy2-features-heading">
          <Eyebrow>What makes it different</Eyebrow>
          <h2 id="happy2-features-heading">
            One place for every agent,<br />
            <em>and everyone using them.</em>
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
            <h2 id="happy2-compare-heading">Happy Desktop vs Buzz</h2>
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

        {/* TEAM */}
        <TeamSection
          members={[STEVE, KIRILL]}
          heading="Two people, so far."
          intro="The authors of Happy and Rig, building this full time. We are looking for a GTM partner with a track record."
        />

        {/* CLOSING */}
        <section className="closing page-width" aria-labelledby="happy2-closing-heading">
          <h2 id="happy2-closing-heading">
            Download it and open it.<br />
            <em>That is the whole setup.</em>
          </h2>
          <p className="closing-sub">
            Point it at a folder you work in and start a session. Then connect your phone and the
            same sessions follow you. Still early, and the source is public.
          </p>
          <div className="store-actions closing-store-actions">
            <AppStoreButton />
            <GooglePlayButton />
          </div>
          <div className="hero-actions closing-actions">
            <a className="button button-primary" href={DOWNLOAD_MACOS} target="_blank" rel="noopener noreferrer">
              Download for macOS
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
