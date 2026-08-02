import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

// Colour stops from bright surface water down to the pitch-black abyss.
const STOPS = [
  { at: 0.0, color: new THREE.Color('#41c6d4') },
  { at: 0.22, color: new THREE.Color('#1a86b3') },
  { at: 0.45, color: new THREE.Color('#0b4a71') },
  { at: 0.7, color: new THREE.Color('#06263f') },
  { at: 1.0, color: new THREE.Color('#01070f') },
]

function sampleDepth(t) {
  const c = new THREE.Color()
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i]
    const b = STOPS[i + 1]
    if (t >= a.at && t <= b.at) {
      const k = (t - a.at) / (b.at - a.at)
      return c.copy(a.color).lerp(b.color, k)
    }
  }
  return c.copy(STOPS[STOPS.length - 1].color)
}

export default function DepthColor() {
  const scroll = useScroll()
  const { scene } = useThree()

  if (!scene.fog) scene.fog = new THREE.Fog('#41c6d4', 8, 60)
  if (!scene.background) scene.background = new THREE.Color('#41c6d4')

  useFrame(() => {
    const t = scroll.offset
    const c = sampleDepth(t)
    scene.background.lerp(c, 0.08)
    scene.fog.color.lerp(c, 0.08)
    // Water gets murkier with depth: pull the far plane in.
    scene.fog.far = THREE.MathUtils.lerp(scene.fog.far, 62 - t * 34, 0.08)
  })

  return null
}
