import { useEffect } from 'react'
import { useStore } from '../App'
import { DEFAULT_CARD } from '../constants'
import { getNewIndex } from '../utils'

const useControlsUpdate = ({ data }) => {
  const selectedIndex = useStore((state) => state.selectedIndex)
  const setSelectedIndex = useStore((state) => state.setSelectedIndex)
  const { left, right } = useStore((state) => state.sphereControls)

  useEffect(() => {
    let controlsTimeout
    const updateControl = (index) => {
      controlsTimeout = setTimeout(() => {
        const newIndex = getNewIndex({ direction: left ? -1 : 1, currentIndex: index, data })
        setSelectedIndex(newIndex)
        if (right || left) {
          updateControl(newIndex)
        }
      }, 500)
    }

    if (left || right) {
      const newIndex =
        selectedIndex !== null
          ? getNewIndex({ direction: left ? -1 : 1, currentIndex: useStore.getState().selectedIndex, data })
          : DEFAULT_CARD
      setSelectedIndex(newIndex)
      updateControl(newIndex)
    }

    return () => clearInterval(controlsTimeout)
  }, [left, right, data])

  return null
}

export default useControlsUpdate
