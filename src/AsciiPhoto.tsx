import { useEffect, useRef } from 'react'

const RAMP = ' .:-=+*#%@'
const CELL_W = 8
const CELL_H = 11
const RADIUS = 130 // how far the effect reaches from the cursor, in CSS pixels

/**
 * A photo that turns into rippling ASCII around the cursor (or a tap).
 * The canvas sits on top of the image and only paints the cells near the pointer.
 */
export function AsciiPhoto({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cols = 0
    let rows = 0
    let cells: Uint8ClampedArray | null = null
    let w = 0
    let h = 0
    let raf = 0
    let strength = 0 // eases 0 → 1 while the pointer is over the photo
    let target = 0
    let px = 0
    let py = 0
    let start = 0
    let fadeTimer = 0

    // Shrink the photo to one pixel per character cell and keep the colours.
    const sample = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      if (w < 1 || h < 1 || !img.complete || !img.naturalWidth) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL_W)
      rows = Math.ceil(h / CELL_H)
      const off = document.createElement('canvas')
      off.width = cols
      off.height = rows
      const o = off.getContext('2d')
      if (!o) return
      // Match object-fit: cover.
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const sw = w / scale
      const sh = h / scale
      o.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, cols, rows)
      cells = o.getImageData(0, 0, cols, rows).data
    }

    const frame = (now: number) => {
      strength += (target - strength) * 0.12
      ctx.clearRect(0, 0, w, h)
      if (!cells || (target === 0 && strength < 0.01)) {
        strength = 0
        raf = 0
        return
      }
      const t = (now - start) / 1000
      ctx.font = `700 ${CELL_H}px 'JetBrains Mono', ui-monospace, Menlo, monospace`
      ctx.textBaseline = 'top'
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * CELL_W + CELL_W / 2
          const cy = r * CELL_H + CELL_H / 2
          const d = Math.hypot(cx - px, cy - py)
          if (d > RADIUS) continue
          const fall = 1 - d / RADIUS
          const a = strength * fall * fall * (3 - 2 * fall) // smoothstep
          if (a < 0.03) continue
          const wave = Math.sin(d * 0.085 - t * 5.5)
          const i = (r * cols + c) * 4
          const R = cells[i]
          const G = cells[i + 1]
          const B = cells[i + 2]
          const lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255
          const level = Math.min(RAMP.length - 1, Math.max(1, Math.round((lum + wave * 0.22) * (RAMP.length - 1))))
          const lift = 1.25 + wave * 0.3
          ctx.globalAlpha = Math.min(1, a * 1.5)
          ctx.fillStyle = '#06070c'
          ctx.fillRect(c * CELL_W, r * CELL_H, CELL_W + 0.5, CELL_H + 0.5)
          ctx.fillStyle = `rgb(${Math.min(255, R * lift + 30)},${Math.min(255, G * lift + 30)},${Math.min(255, B * lift + 30)})`
          ctx.fillText(RAMP[level], c * CELL_W + 1, r * CELL_H + wave * 3 * a)
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const wake = () => {
      if (!raf) {
        start = start || performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    const move = (e: PointerEvent) => {
      px = e.offsetX
      py = e.offsetY
      target = 1
      window.clearTimeout(fadeTimer)
      // A finger doesn't hover, so let a tap ripple for a moment and then fade.
      if (e.pointerType !== 'mouse') fadeTimer = window.setTimeout(() => (target = 0), 1400)
      wake()
    }
    const leave = () => {
      target = 0
    }

    const ro = new ResizeObserver(sample)
    ro.observe(canvas)
    img.addEventListener('load', sample)
    sample()
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerdown', move)
    canvas.addEventListener('pointerleave', leave)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(fadeTimer)
      ro.disconnect()
      img.removeEventListener('load', sample)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerdown', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [src])

  return (
    <div className="ascii-photo">
      <img ref={imgRef} src={src} alt={alt} width="440" height="550" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  )
}
