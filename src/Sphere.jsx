import { A11y } from '@react-three/a11y'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from './App'
import { CARDS_NUMBER } from './constants'
import SphereItem from './SphereItem'

const originVector = new THREE.Vector3(0, 0, 0)
const Sphere = ({ cardVisibleRef }) => {
  const data = Array.from({ length: CARDS_NUMBER })
  const sphereRef = useRef()
  const selectedIndex = useStore((state) => state.selectedIndex)
  const selectedVector = useStore((state) => state.selectedVector)
  const ratingFilter = useStore((state) => state.ratingFilter)

  useFrame(({ camera, performance }) => {
    camera.position.lerp(selectedVector, 0.02)
    camera.lookAt(originVector)
    if (!cardVisibleRef.current && camera.position.distanceTo(selectedVector) < 1) {
      cardVisibleRef.current = true
    }
  })

  useEffect(() => {
    cardVisibleRef.current = false
  }, [selectedIndex])

  const maxItems = data.length - ratingFilter[0]

  return (
    <group ref={sphereRef}>
      {data.map((element, i) => (
        <SphereItem key={i} cardIndex={i} isSelected={selectedIndex === i} maxItems={maxItems} />
      ))}
    </group>
  )
}

export default Sphere
