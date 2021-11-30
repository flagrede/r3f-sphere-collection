import { useStore } from '../App'

const useKeyboardControls = () => {
  const { left, right } = useStore((state) => state.sphereControls)
  const setRight = useStore((state) => state.setRight)
  const setLeft = useStore((state) => state.setLeft)
  const resetControls = useStore((state) => state.resetControls)

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

  return { handleKeyDown, handleKeyUp }
}

export default useKeyboardControls
