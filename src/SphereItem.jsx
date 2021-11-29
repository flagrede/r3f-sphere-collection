import { animated as a, useSpring } from '@react-spring/three'
import { A11y } from '@react-three/a11y'
import { Html, Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from './App'
import GameContent from './components/GameCard/GameContent'
import GameCard from './components/GameCard/GameCover'
import { getElementPosition } from './utils'

const cameraVector = new THREE.Vector3()
const tempVector = new THREE.Vector3(0, 0, 0)
const translationVector = new THREE.Vector3(-1, 0, 0)

const bgMaterialProps = {
  thickness: 5,
  roughness: 0.8,
  clearcoat: 1,
  clearcoatRoughness: 0,
  transmission: 1,
  ior: 1.45,
  envMapIntensity: 25,
  color: '#ffffff',
  attenuationTint: '#ffe79e',
  attenuationDistance: 0,
}

const SphereItem = ({ cardIndex, isSelected, id, playerRating, pressRating, filtered }) => {
  const ref = useRef()
  const planeRef = useRef()
  const selectedVector = useStore((state) => state.selectedVector)
  const setSelectedIndex = useStore((state) => state.setSelectedIndex)
  const setCardHidden = useStore((state) => state.setCardHidden)
  const [initialPositionVector] = useState(new THREE.Vector3())
  const [zoomPositionVector] = useState(new THREE.Vector3())
  const isZoomCompleteRef = useRef(false)
  const [{ scale }, scaleApi] = useSpring(() => ({
    scale: 0,
  }))
  const { scaleGroup } = useSpring({
    scaleGroup: filtered ? 0 : 1,
  })

  useEffect(() => {
    if (ref.current !== undefined) {
      const { radius, phi, theta } = getElementPosition({ index: cardIndex })
      ref.current.position.setFromSphericalCoords(radius, phi, theta)
      initialPositionVector.copy(ref.current.position)
      cameraVector.copy(ref.current.position).multiplyScalar(-2)
      ref.current.lookAt(cameraVector)
    }
  }, [cardIndex])

  useEffect(() => {
    let vectorUpdateTimeout
    if (isSelected) {
      zoomPositionVector.copy(ref.current.position)
      selectedVector.copy(ref.current.position).multiplyScalar(-1)
      vectorUpdateTimeout = setTimeout(() => {
        zoomPositionVector.copy(ref.current.position).multiplyScalar(-0.45)
        tempVector.copy(translationVector)
        tempVector.transformDirection(ref.current.matrixWorld).normalize().multiplyScalar(1.7)
        zoomPositionVector.add(tempVector)
      }, 500)
    }
    return () => clearTimeout(vectorUpdateTimeout)
  }, [isSelected])

  useFrame(() => {
    if (isSelected && !useStore.getState().cardHidden) {
      ref.current.position.lerp(zoomPositionVector, 0.1)
      const distance = ref.current.position.distanceTo(zoomPositionVector)
      if (!isZoomCompleteRef.current && distance !== 0 && distance < 0.2) {
        isZoomCompleteRef.current = true
        scaleApi.start({ scale: 1 })
      }
    } else {
      ref.current.position.lerp(initialPositionVector, 0.1)
      if (isZoomCompleteRef.current) {
        isZoomCompleteRef.current = false
        scaleApi.start({ scale: 0 })
      }
    }
  })
  return (
    <A11y
      role="button"
      description="Show game card"
      actionCall={() => {
        setSelectedIndex(cardIndex)
        setCardHidden(false)
      }}
    >
      <a.group ref={ref} scale={scaleGroup}>
        <Suspense fallback="loading...">
          <GameCard cardIndex={cardIndex} isSelected={isSelected} />
        </Suspense>
        {isSelected && (
          <a.group scale={scale}>
            <Plane args={[7, 4]} ref={planeRef} position={[1.7, 0, -0.1]}>
              <a.meshPhysicalMaterial attach="material" {...bgMaterialProps} />
            </Plane>
            <Html scale={0.1} position={[1.5, 0, 0]} distanceFactor={20} transform>
              <GameContent cardIndex={cardIndex} playerRating={playerRating} pressRating={pressRating} />
            </Html>
          </a.group>
        )}
      </a.group>
    </A11y>
  )
}

export default React.memo(SphereItem)
