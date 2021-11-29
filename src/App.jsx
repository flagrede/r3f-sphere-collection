import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import 'virtual:windi-devtools'
import 'virtual:windi.css'
import create from 'zustand'
import Controls from './components/Controls/Controls'
import { DEFAULT_CARD } from './constants'
import Sphere from './Sphere'
import './styles.css'
import { getData, getNewIndex } from './utils'

export const useStore = create((set) => ({
  sphereControls: { left: false, right: false },
  selectedIndex: DEFAULT_CARD,
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
  const ratingFilter = useStore((state) => state.ratingFilter)
  const cardVisibleRef = useRef(false)
  const [data] = useState(getData())

  const dataWithFiltered = useMemo(() => data.map((game) => ({ ...game, filtered: ratingFilter > game.pressRating })), [ratingFilter])

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
        const newIndex = getNewIndex({ direction: left ? -1 : 1, currentIndex: index, data: dataWithFiltered })
        setSelectedIndex(newIndex)
        if (right || left) {
          updateControl(newIndex)
        }
      }, 500)
    }

    if (left || right) {
      const newIndex =
        selectedIndex !== null
          ? getNewIndex({ direction: left ? -1 : 1, currentIndex: useStore.getState().selectedIndex, data: dataWithFiltered })
          : DEFAULT_CARD
      setSelectedIndex(newIndex)
      updateControl(newIndex)
    }

    return () => clearInterval(controlsTimeout)
  }, [left, right, dataWithFiltered])

  useEffect(() => {
    canvasContainerRef.current.focus()
  }, [])

  return (
    <>
      <div className="w-full h-full outline-none" ref={canvasContainerRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="-1">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sphere cardVisibleRef={cardVisibleRef} data={dataWithFiltered} />
          <Stars />
          {/* <axisHelper /> */}
          {/* <Perf /> */}
        </Canvas>
        <Controls />
      </div>
    </>
  )
}
