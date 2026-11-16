import { useEffect, useRef, useState } from 'react'
import { AsciiPhoto } from './AsciiPhoto'
import { KoiPond } from './KoiPond'
import { brands, contact, creator, hero, partnership, services, showEmptySlots, socials, steps, testimonials, videos } from './content'
import type { Video } from './content'

// Adds .is-in to every [data-reveal] element the first time it scrolls into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M8 5v14l11-7z" fill="currentColor" />
  </svg>
)

/** A real video file: plays muted on hover (mouse) or on tap. */
function Clip({ v, label }: { v: Video; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    const el = ref.current
    if (!el) return
    document.querySelectorAll('video').forEach((other) => other !== el && other.pause())
    el.play().catch(() => {})
  }
  const pause = () => ref.current?.pause()

  return (
    <button
      type="button"
      className={`media media--clip${playing ? ' is-playing' : ''}`}
      aria-label={`${playing ? 'Pause' : 'Play'} video: ${label}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && play()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && pause()}
      onClick={() => (playing ? pause() : play())}
    >
      <video
        ref={ref}
        src={v.video}
        poster={v.poster || undefined}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <span className="media__play">
        <PlayIcon />
      </span>
    </button>
  )
}

function Card({ v }: { v: Video }) {
  const label = `${v.brand} ${v.product}`
  const empty = !v.video && !v.poster && !v.link

  let media
  if (v.video) {
    media = <Clip v={v} label={label} />
  } else if (v.link) {
    media = (
      <a className="media media--link" href={v.link} target="_blank" rel="noreferrer" aria-label={`Watch ${label} on Instagram`}>
        {v.poster && <img src={v.poster} alt={v.posterAlt} loading="lazy" decoding="async" />}
        <span className="media__play">
          <PlayIcon />
        </span>
        <span className="media__note">watch on instagram</span>
      </a>
    )
  } else if (v.poster) {
    media = (
      <div className="media">
        <img src={v.poster} alt={v.posterAlt} loading="lazy" decoding="async" />
      </div>
    )
  } else {
    media = (
      <div className="media media--empty">
        <span aria-hidden="true">{'><(((º>'}</span>
        <span>video coming soon</span>
      </div>
    )
  }

  return (
    <li className={`card${empty ? ' card--empty' : ''}`} data-reveal>
      {media}
      <div className="card__text">
        <h3>
          {v.brand} <span>{v.product}</span>
        </h3>
        <ul className="tags">
          <li>{v.format}</li>
          <li>{v.platform}</li>
          {v.spec && <li className="tags__spec">spec</li>}
        </ul>
        <p className="card__why">
          <b>Why it works:</b> {v.why}
        </p>
        {v.metric && <p className="card__metric">{v.metric}</p>}
      </div>
    </li>
  )
}

export default function App() {
  useReveal()
  const shown = videos.filter((v) => showEmptySlots || v.video || v.poster || v.link)

  return (
    <>
      <KoiPond />
      <div className="page">
        <a className="skip" href="#work">
          Skip to the videos
        </a>

        <header className="bar">
          <a className="bar__name" href="#top">
            {creator.name.toLowerCase()}
          </a>
          <nav aria-label="Sections">
            <a href="#work">work</a>
            <a href="#services">services</a>
            <a href="#process">process</a>
            <a className="bar__chat" href="#contact">
              let’s chat
            </a>
          </nav>
        </header>

        <main id="top">
          <section className={`hero${hero.photo ? ' hero--photo' : ''}`} aria-labelledby="hero-headline">
            <p className="hero__title">
              {creator.name} <span aria-hidden="true">~</span> {creator.title}
            </p>
            <h1 id="hero-headline">{hero.headline}</h1>
            <div className="hero__lines">
              {hero.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="buttons">
              <a className="button button--solid" href="#work">
                {hero.primary}
              </a>
              <a className="button" href="#contact">
                {hero.secondary}
              </a>
            </div>
            {hero.photo && (
              <figure className="hero__photo">
                <AsciiPhoto src={hero.photo} alt={hero.photoAlt} />
                {hero.photoCaption && <figcaption>{hero.photoCaption}</figcaption>}
              </figure>
            )}
            <p className="hero__hint" aria-hidden="true">
              {'><(((º>'} tap the water to feed the koi
            </p>
          </section>

          <section className="section" id="work" aria-labelledby="work-title">
            <header className="section__head" data-reveal>
              <h2 id="work-title">The work</h2>
              <p>Tap a video to watch. Under each one: who it’s for, and the decision that makes it sell.</p>
            </header>
            <ul className="grid">
              {shown.map((v, i) => (
                <Card v={v} key={i} />
              ))}
            </ul>
          </section>

          <section className="section" id="services" aria-labelledby="services-title">
            <header className="section__head" data-reveal>
              <h2 id="services-title">What I help brands with</h2>
              <p>Every video has one job: get someone closer to buying.</p>
            </header>
            <ul className="services">
              {services.map((s) => (
                <li key={s.title} data-reveal>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section" id="process" aria-labelledby="process-title">
            <header className="section__head" data-reveal>
              <h2 id="process-title">How I work</h2>
              <p>Four steps, no mystery.</p>
            </header>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal>
                  <span className="steps__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="partnership" data-reveal>
              {partnership}
            </p>
          </section>

          {testimonials.length > 0 && (
            <section className="section" id="reviews" aria-labelledby="reviews-title">
              <header className="section__head" data-reveal>
                <h2 id="reviews-title">What brands say</h2>
              </header>
              <ul className="quotes">
                {testimonials.map((t) => (
                  <li key={t.name + t.brand} data-reveal>
                    <p className="quotes__stars" aria-label={`${t.stars} out of 5 stars`}>
                      {'★'.repeat(t.stars)}
                    </p>
                    <blockquote>{t.quote}</blockquote>
                    <p className="quotes__who">
                      {t.name}, {t.brand}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {brands.length > 0 && (
            <section className="section" id="brands" aria-labelledby="brands-title">
              <header className="section__head" data-reveal>
                <h2 id="brands-title">Brands I’ve created for</h2>
              </header>
              <ul className="logos">
                {brands.map((b) => (
                  <li key={b.name}>
                    <img src={b.logo} alt={b.name} loading="lazy" />
                    {b.spec && <span>spec</span>}
                  </li>
                ))}
              </ul>
              {brands.some((b) => b.spec) && (
                <p className="logos__note">“Spec” marks unpaid concept work I made on my own, not a paid partnership.</p>
              )}
            </section>
          )}

          <section className="contact" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title" data-reveal>
              {contact.headline}
            </h2>
            <p>{contact.line}</p>
            <div className="buttons">
              <a className="button button--solid" href={`mailto:${creator.email}`}>
                {creator.email}
              </a>
              <a className="button" href={creator.instagram} target="_blank" rel="noreferrer">
                @{creator.handle}
              </a>
            </div>
            <div className="socials">
              <h3>See more of my content</h3>
              <ul>
                {socials.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      <span className="socials__label">{s.label}</span>
                      <b>{s.handle}</b>
                      <span className="socials__note">{s.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <footer className="foot">
          <span>
            {creator.name}, {creator.location}
          </span>
          <span>
            Koi by{' '}
            <a href="https://github.com/DesignerStephen1/ascii-animals" target="_blank" rel="noreferrer">
              ascii-animals
            </a>
          </span>
        </footer>
      </div>
    </>
  )
}
