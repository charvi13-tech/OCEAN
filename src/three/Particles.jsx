import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Rising bubbles — stream upward through a tall column around the camera.
export function Bubbles({ count = 260, span = 70 }) {
  const ref = useRef()
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const speed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 34
      pos[i * 3 + 1] = (Math.random() - 0.5) * span
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24 - 4
      speed[i] = 0.6 + Math.random() * 1.8
    }
    return { pos, speed }
  }, [count, span])

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const arr = g.geometry.attributes.position.array
    const camY = state.camera.position.y
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += data.speed[i] * delta
      // wrap within a band that follows the camera so bubbles are always present
      const rel = arr[i * 3 + 1] - camY
      if (rel > span / 2) arr[i * 3 + 1] -= span
      // gentle horizontal wobble
      arr[i * 3 + 0] += Math.sin(state.clock.elapsedTime * 0.6 + i) * delta * 0.15
    }
    g.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        sizeAttenuation
        color="#dffbff"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  )
}

// Marine snow / plankton — slow drifting motes that fill the volume.
export function Plankton({ count = 700, span = 80 }) {
  const ref = useRef()
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 48
      pos[i * 3 + 1] = (Math.random() - 0.5) * span
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 6
    }
    return { pos }
  }, [count, span])

  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const camY = state.camera.position.y
    const arr = g.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= delta * 0.25 // drift down slowly
      const rel = arr[i * 3 + 1] - camY
      if (rel < -span / 2) arr[i * 3 + 1] += span
    }
    g.geometry.attributes.position.needsUpdate = true
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        color="#bfeaff"
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  )
}
