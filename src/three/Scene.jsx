import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import DepthColor from './DepthColor.jsx'
import LightShafts from './LightShafts.jsx'
import Jellyfish from './Jellyfish.jsx'
import { Bubbles, Plankton } from './Particles.jsx'
import { scrollState } from './scrollStore.js'

// Total vertical distance (world units) the camera travels top → abyss.
const DEPTH_SPAN = 55

// Drives the descent: maps scroll offset (0→1) to camera Y and reports it.
function Rig() {
  const scroll = useScroll()
  const { current: mouse } = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const t = scroll.offset
    scrollState.offset = t

    // descend
    const targetY = -t * DEPTH_SPAN
    state.camera.position.y += (targetY - state.camera.position.y) * 0.1

    // subtle parallax from pointer
    mouse.x = state.pointer.x
    mouse.y = state.pointer.y
    state.camera.position.x += (mouse.x * 1.6 - state.camera.position.x) * 0.04
    state.camera.rotation.z += (-mouse.x * 0.03 - state.camera.rotation.z) * 0.04
    state.camera.lookAt(0, state.camera.position.y + mouse.y * 1.2, -2)
  })

  return null
}

// A glowing lure in the darkness of the abyss — the anglerfish's invitation.
function Lure({ position }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.5
    ref.current.position.x = position[0] + Math.sin(t * 0.5) * 0.3
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#eafff6" emissive="#7dffdd" emissiveIntensity={4} />
      </mesh>
      <pointLight color="#7dffdd" intensity={6} distance={9} decay={2} />
    </group>
  )
}

export default function Scene() {
  return (
    <>
      <DepthColor />
      <Rig />

      {/* lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 20, 4]} intensity={1.1} color="#dffcff" />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#bfefff" />

      {/* surface sunlight */}
      <LightShafts />

      {/* inhabitants of each depth */}
      <Jellyfish position={[-4, -9, -3]} scale={1.6} color="#8be9ff" speed={1} />
      <Jellyfish position={[5, -20, -5]} scale={1.1} color="#b58bff" speed={0.8} />
      <Jellyfish position={[-3.5, -33, -4]} scale={1.9} color="#63f5d8" speed={0.7} />
      <Jellyfish position={[4, -44, -6]} scale={0.9} color="#ff8bd0" speed={1.1} />
      <Lure position={[1.5, -52, -3]} />

      {/* atmosphere */}
      <Bubbles />
      <Plankton />
    </>
  )
}
