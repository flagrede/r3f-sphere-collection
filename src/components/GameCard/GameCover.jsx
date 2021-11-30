import { animated as a, useSpring } from '@react-spring/three'
import { Image } from '@react-three/drei'
import { useRef } from 'react'

const GameCover = ({ id, isSelected }) => {
  const imageIndex = id % 54
  const imageUrl = `images/games/${imageIndex}.jpeg`
  const { scale } = useSpring({ scale: isSelected ? [2, 2, 1] : [1, 1, 1] })
  const ref = useRef()
  const imageRef = useRef()

  return (
    <a.group scale={scale} ref={ref}>
      <Image ref={imageRef} url={imageUrl} scale={[1, 1.5, 1]} />
    </a.group>
  )
}

export default GameCover
