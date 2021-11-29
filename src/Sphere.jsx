import { A11y } from '@react-three/a11y'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from './App'
import { CARDS_NUMBER } from './constants'
import SphereItem from './SphereItem'
import { getData } from './utils'

const originVector = new THREE.Vector3(0, 0, 0)
const Sphere = ({ cardVisibleRef }) => {
  const [data] = useState(getData())
  const sphereRef = useRef()
  const selectedIndex = useStore((state) => state.selectedIndex)
  const setSelectedIndex = useStore((state) => state.setSelectedIndex)
  const selectedVector = useStore((state) => state.selectedVector)
  const ratingFilter = useStore((state) => state.ratingFilter)

  useFrame(({ camera }) => {
    camera.position.lerp(selectedVector, 0.02)
    camera.lookAt(originVector)
    if (!cardVisibleRef.current && camera.position.distanceTo(selectedVector) < 1) {
      cardVisibleRef.current = true
    }
  })

  useEffect(() => {
    setSelectedIndex(null)
  }, [ratingFilter])

  useEffect(() => {
    cardVisibleRef.current = false
  }, [selectedIndex])

  const dataWithFiltered = useMemo(() => data.map((game) => ({ ...game, filtered: ratingFilter > game.pressRating })), [ratingFilter])

  return (
    <group ref={sphereRef}>
      {dataWithFiltered.map(({ id, playerRating, pressRating, filtered }, index) => (
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
