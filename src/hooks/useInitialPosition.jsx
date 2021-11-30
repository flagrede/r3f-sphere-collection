import { useEffect } from 'react'
import { getElementPosition } from '../utils'

const useInitialPosition = ({ itemRef, cardIndex, initialPositionVector, cameraVector }) => {
  useEffect(() => {
    if (itemRef.current !== undefined) {
      const { radius, phi, theta } = getElementPosition({ index: cardIndex })
      itemRef.current.position.setFromSphericalCoords(radius, phi, theta)
      initialPositionVector.copy(itemRef.current.position)
      cameraVector.copy(itemRef.current.position).multiplyScalar(-2)
      itemRef.current.lookAt(cameraVector)
    }
  }, [cardIndex])

  return null
}

export default useInitialPosition
