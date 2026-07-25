export interface TeamMember {
  name: string
  label: string
  avatar: string
  href: string
}

export const STEVE: TeamMember = {
  name: 'Steve Korshakov',
  label: '@Ex3NDR',
  avatar: '/img/team/steve-korshakov.jpg',
  href: 'https://x.com/Ex3NDR',
}

export const KARL: TeamMember = {
  name: 'Karl Marx',
  label: 'Peoples Grocers',
  avatar: '/img/team/karl-marx.png',
  href: 'https://peoplesgrocers.com/en/projects',
}

export const KIRILL: TeamMember = {
  name: 'Kirill Dubovitskiy',
  label: '@bra1n_dump',
  avatar: '/img/team/kirill-dubovitskiy.jpg',
  href: 'https://x.com/bra1n_dump',
}

export function TeamSection({
  members,
  heading,
  intro,
}: {
  members: TeamMember[]
  heading: string
  intro: string
}) {
  return (
    <section className="team-section page-width" aria-labelledby="team-heading">
      <div className="team-heading">
        <div>
          <p className="eyebrow">The team</p>
          <h2 id="team-heading">{heading}</h2>
        </div>
        <p className="team-intro">{intro}</p>
      </div>
      <ul className="team-list">
        {members.map((member) => (
          <li key={member.name}>
            <a
              className="team-card"
              href={member.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="team-avatar"
                src={member.avatar}
                width={64}
                height={64}
                alt=""
                loading="lazy"
              />
              <span className="team-text">
                <span className="team-name">{member.name}</span>
                <span className="team-label">{member.label}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
