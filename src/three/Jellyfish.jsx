import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A translucent, glowing bell with drifting tentacles. Bobs and pulses.
export default function Jellyfish({
  position = [0, 0, 0],
  scale = 1,
  color = '#8be9ff',
  speed = 1,
}) {
  const group = useRef()
  const bell = useRef()

  const tentacles = useMemo(() => {
    const arr = []
    const n = 10
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2
      arr.push({ x: Math.cos(a) * 0.42, z: Math.sin(a) * 0.42, phase: Math.random() * 6 })
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t * 0.6) * 0.6
      group.current.position.x = position[0] + Math.sin(t * 0.3) * 0.4
      group.current.rotation.y = t * 0.1
    }
    if (bell.current) {
      // pulsing "swim" — squash & stretch the bell
      const p = 1 + Math.sin(t * 1.6) * 0.12
      bell.current.scale.set(1 / p, p, 1 / p)
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh ref={bell}>
        <sphereGeometry args={[0.5, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          transparent
          opacity={0.55}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {tentacles.map((tc, i) => (
        <Tentacle key={i} x={tc.x} z={tc.z} phase={tc.phase} color={color} speed={speed} />
      ))}
    </group>
  )
}

function Tentacle({ x, z, phase, color, speed }) {
  const ref = useRef()
  const geo = useMemo(() => new THREE.BufferGeometry(), [])
  const points = useMemo(() => new Array(8).fill(0).map(() => new THREE.Vector3()), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase
    for (let i = 0; i < points.length; i++) {
      const d = i / (points.length - 1)
      points[i].set(
        x + Math.sin(t + d * 4) * 0.08 * d,
        -d * 1.4,
        z + Math.cos(t + d * 4) * 0.08 * d,
      )
    }
    geo.setFromPoints(points)
    if (ref.current) ref.current.geometry = geo
  })

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.4} />
    </line>
  )
}
