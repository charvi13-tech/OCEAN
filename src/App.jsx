import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, useProgress } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import Scene from './three/Scene.jsx'
import Overlay from './ui/Overlay.jsx'
import HUD from './ui/HUD.jsx'

function Loader() {
  const { progress, active } = useProgress()
  const [gone, setGone] = useState(false)
  // With no async assets to await, `active` is the reliable signal — fade out
  // shortly after loading goes idle so the first frame has a beat to render.
  useEffect(() => {
    if (!active) {
      const id = setTimeout(() => setGone(true), 900)
      return () => clearTimeout(id)
    }
  }, [active])
  if (gone) return null
  return (
    <div className={`loader ${!active ? 'hidden' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="ring" />
        <div className="pct">{active ? `${Math.round(progress)}%` : 'dive in'}</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Loader />
      <HUD />
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.28}>
            <Scene />
            <Scroll html style={{ width: '100%' }}>
              <Overlay />
            </Scroll>
          </ScrollControls>
          <EffectComposer disableNormalPass>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.55}
              luminanceSmoothing={0.2}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  )
}
