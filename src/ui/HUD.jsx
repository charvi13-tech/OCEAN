import { useEffect, useRef } from 'react'
import { profile, zones, MAX_DEPTH } from '../data.js'
import { scrollState } from '../three/scrollStore.js'

function zoneFor(t) {
  let z = zones[0].label
  for (const zone of zones) if (t >= zone.at) z = zone.label
  return z
}

// Fixed heads-up display. Reads the live scroll offset via rAF (no re-renders).
export default function HUD() {
  const depthRef = useRef(null)
  const zoneRef = useRef(null)

  useEffect(() => {
    let raf
    const tick = () => {
      const t = scrollState.offset
      const m = Math.round(t * MAX_DEPTH)
      if (depthRef.current) depthRef.current.textContent = m.toLocaleString() + ' m'
      if (zoneRef.current) zoneRef.current.textContent = zoneFor(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div className="hud brand">{profile.brand}</div>
      <div className="hud depth">
        <div className="val" ref={depthRef}>
          0 m
        </div>
        <div className="zone" ref={zoneRef}>
          Surface
        </div>
      </div>
      <div className="hud rail">{profile.name}</div>
    </>
  )
}
