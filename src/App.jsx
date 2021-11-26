import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import 'virtual:windi-devtools'
import 'virtual:windi.css'
import create from 'zustand'
import Controls from './components/Controls/Controls'
import Sphere from './Sphere'
import './styles.css'

export const useStore = create((set) => ({
  sphereControls: { left: false, right: false },
  selectedIndex: 50,
  cardHidden: false,
  selectedVector: new THREE.Vector3(),
  ratingFilter: [0],
  setRight: () => set({ sphereControls: { left: false, right: true } }),
  setLeft: () => set({ sphereControls: { left: true, right: false } }),
  setControls: (sphereControls) => set({ sphereControls }),
  resetControls: () => set({ sphereControls: { left: false, right: false } }),
  setCardHidden: (cardHidden) => set({ cardHidden }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  setRatingFilter: (ratingFilter) => set({ ratingFilter }),
}))

export default function App() {
  const canvasContainerRef = useRef()
  const selectedIndex = useStore((state) => state.selectedIndex)
  const setSelectedIndex = useStore((state) => state.setSelectedIndex)
  const { left, right } = useStore((state) => state.sphereControls)
  const setRight = useStore((state) => state.setRight)
  const setLeft = useStore((state) => state.setLeft)
  const resetControls = useStore((state) => state.resetControls)
  const cardVisibleRef = useRef(false)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && !left) {
      setLeft()
    } else if (event.key === 'ArrowRight' && !right) {
      setRight()
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      resetControls()
    }
  }

  useEffect(() => {
    let controlsTimeout
    const updateControl = (index) => {
      controlsTimeout = setTimeout(() => {
        const newIndex = index + (left ? -1 : 1)
        setSelectedIndex(newIndex)
        if (right || left) {
          updateControl(newIndex)
        }
      }, 500)
    }

    if (left || right) {
      const newIndex = selectedIndex + (left ? -1 : 1)
      setSelectedIndex(newIndex)
      updateControl(newIndex)
    }

    return () => clearInterval(controlsTimeout)
  }, [left, right])

  useEffect(() => {
    canvasContainerRef.current.focus()
  }, [])

  return (
    <>
      <div className="w-full h-full outline-none" ref={canvasContainerRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="-1">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sphere cardVisibleRef={cardVisibleRef} />
          <Stars />
          {/* <axisHelper /> */}
          {/* <Perf /> */}
        </Canvas>
        <Controls />
      </div>
    </>
  )
}
