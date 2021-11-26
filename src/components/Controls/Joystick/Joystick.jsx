import { WidthIcon } from '@radix-ui/react-icons'
import { animated as a, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRef } from 'react'
import { useStore } from '../../../App'

const Joystick = () => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }))
  const containerRef = useRef()
  const { left, right } = useStore((state) => state.sphereControls)
  const setControls = useStore((state) => state.setControls)
  const resetControls = useStore((state) => state.resetControls)

  const bind = useDrag(
    ({ down, movement: [mx], direction: [dx] }) => {
      if (Math.abs(mx) > 10 && !left && !right) {
        setControls({ left: dx < 0, right: dx > 0 })
      }
      if (!down && (left || right)) {
        resetControls()
      }
      api.start({ x: down ? mx : 0, immediate: down })
    },
    { bounds: containerRef }
  )

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="flex items-center justify-center rounded-full bg-gray-500 w-20 h-14"
        style={{ touchAction: 'none' }}
      >
        <a.div {...bind()} style={{ x }} className="bg-gray-300 rounded-full w-10 h-10" />
      </div>
      <WidthIcon className="w-8 h-8 text-gray-500 mt" />
    </div>
  )
}

export default Joystick
