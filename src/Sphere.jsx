import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from './App'
import SphereItem from './SphereItem'

const originVector = new THREE.Vector3(0, 0, 0)
const Sphere = ({ cardVisibleRef, data }) => {
  const sphereRef = useRef()
  const selectedIndex = useStore((state) => state.selectedIndex)
  const selectedVector = useStore((state) => state.selectedVector)
  const setSelectedIndex = useStore((state) => state.setSelectedIndex)
  const ratingFilter = useStore((state) => state.ratingFilter)

  useFrame(({ camera }) => {
    camera.position.lerp(selectedVector, 0.02)
    camera.lookAt(originVector)
    if (!cardVisibleRef.current && camera.position.distanceTo(selectedVector) < 1) {
      cardVisibleRef.current = true
    }
  })

  useEffect(() => {
    cardVisibleRef.current = false
  }, [selectedIndex])

  useEffect(() => {
    setSelectedIndex(null)
  }, [ratingFilter])

  return (
    <group ref={sphereRef}>
      {data.map(({ id, playerRating, pressRating, filtered }, index) => (
        <SphereItem
          key={id}
          id={id}
          cardIndex={index}
          isSelected={selectedIndex === index}
          playerRating={playerRating}
          pressRating={pressRating}
          filtered={filtered}
        />
      ))}
    </group>
  )
}

export default Sphere
