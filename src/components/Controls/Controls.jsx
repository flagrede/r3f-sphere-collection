import Joystick from './Joystick/Joystick'
import Slider from './Slider/Slider'
import Toggle from './Toggle/Toggle'

const Controls = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center fixed bottom-8 w-8/12 h-30 p-4 bg-gray-200 bg-opacity-50 rounded-md">
        <Joystick />
        <Toggle />
        <Slider />
      </div>
    </div>
  )
}

export default Controls
