import { useEffect, useRef } from 'react'
import { AnimalEngine } from './ascii-animals/engine'

// The ASCII koi swimming behind the whole page.
// Tapping anywhere that isn't a link, button or video drops food for them.
export function KoiPond() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const small = window.matchMedia('(max-width: 720px)').matches
    const engine = new AnimalEngine(canvas, {
      animal: 'koi',
      theme: 'dark',
      tuning: { density: small ? 1.1 : 0.9, speed: 1.3 },
    })

    const feed = (e: PointerEvent) => {
      const target = e.target as Element | null
      // The engine already handles taps that land on the canvas itself.
      if (!target || target === canvas || target.closest('a, button, video')) return
      const rect = canvas.getBoundingClientRect()
      engine.poke(e.clientX - rect.left, e.clientY - rect.top)
    }
    window.addEventListener('pointerdown', feed, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', feed)
      engine.destroy()
    }
  }, [])

  return <canvas ref={ref} className="pond" aria-hidden="true" />
}
