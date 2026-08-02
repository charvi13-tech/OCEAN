import { profile, about, experience, projects, links } from '../data.js'

export default function Overlay() {
  return (
    <div className="overlay">
      {/* 0 — Surface / Hero */}
      <section className="section hero">
        <div className="eyebrow">{profile.role}</div>
        <h1>
          <span>{profile.name.split(' ')[0]}</span>
          <span>{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="tag">{profile.tagline}</p>
        <div className="scroll-cue">
          <span className="line" />
          Scroll to descend
        </div>
      </section>

      {/* 1 — Sunlight zone / About */}
      <section className="section about">
        <div className="eyebrow">About</div>
        <h2>Surface tension.</h2>
        <p className="lead">{about.body}</p>
        <div className="stats">
          {about.stats.map((s) => (
            <div className="stat" key={s.lbl}>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2 — Twilight zone / Experience */}
      <section className="section experience">
        <div className="eyebrow">Experience</div>
        <h2>The descent so far.</h2>
        <div className="timeline">
          {experience.map((e) => (
            <div className="tl-item" key={e.role}>
              <div className="when">{e.when}</div>
              <div className="role">{e.role}</div>
              <div className="desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — Midnight zone / Projects */}
      <section className="section work">
        <div className="eyebrow">Selected Work</div>
        <h2>Bioluminescence.</h2>
        <div className="cards">
          {projects.map((p, i) => (
            <article className="card" key={p.title}>
              <div className="idx">{String(i + 1).padStart(2, '0')}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4 — Abyss / Contact */}
      <section className="section contact">
        <div className="eyebrow">Contact</div>
        <h2>Follow the light.</h2>
        <div className="links">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
        <div className="footnote">
          © {profile.name} — built with React, Three.js &amp; a lungful of air.
        </div>
      </section>
    </div>
  )
}
