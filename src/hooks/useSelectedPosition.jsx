import { useEffect } from 'react'

const useSelectedPosition = ({ isSelected, zoomPositionVector, selectedVector, tempVector, translationVector, itemRef }) => {
  useEffect(() => {
    let vectorUpdateTimeout
    if (isSelected) {
      zoomPositionVector.copy(itemRef.current.position)
      selectedVector.copy(itemRef.current.position).multiplyScalar(-1)
      vectorUpdateTimeout = setTimeout(() => {
        zoomPositionVector.copy(itemRef.current.position).multiplyScalar(-0.45)
        tempVector.copy(translationVector)
        tempVector.transformDirection(itemRef.current.matrixWorld).normalize().multiplyScalar(1.7)
        zoomPositionVector.add(tempVector)
      }, 500)
    }
    return () => clearTimeout(vectorUpdateTimeout)
  }, [isSelected])
}

export default useSelectedPosition
