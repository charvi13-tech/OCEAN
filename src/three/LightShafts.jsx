import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Soft volumetric-looking god rays near the surface. A handful of thin,
// additive, tapered planes that sway — cheap but convincing sunlight.
export default function LightShafts({ count = 7 }) {
  const group = useRef()
  const shafts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.random() - 0.5) * 26,
        z: -8 - Math.random() * 10,
        rot: (Math.random() - 0.5) * 0.4,
        w: 1.2 + Math.random() * 2.2,
        h: 40 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        op: 0.05 + Math.random() * 0.06,
      })),
    [count],
  )

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((m, i) => {
      m.rotation.z = shafts[i].rot + Math.sin(t * 0.25 + shafts[i].phase) * 0.06
    })
  })

  return (
    <group ref={group} position={[0, 6, 0]}>
      {shafts.map((s, i) => (
        <mesh key={i} position={[s.x, 0, s.z]} rotation={[0, 0, s.rot]}>
          <planeGeometry args={[s.w, s.h]} />
          <meshBasicMaterial
            color="#bff6ff"
            transparent
            opacity={s.op}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}
