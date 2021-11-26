import * as Slider from '@radix-ui/react-slider'
import { useStore } from '../../../App'

const SliderComponent = () => {
  const ratingFilter = useStore((state) => state.ratingFilter)
  const setRatingFilter = useStore((state) => state.setRatingFilter)
  return (
    <div className="flex flex-col items-center relative w-44">
      <Slider.Root
        className="relative flex items-center w-full h-14 select-none"
        defaultValue={[0]}
        max={20}
        step={1}
        value={ratingFilter}
        onValueChange={setRatingFilter}
      >
        <Slider.Track className="relative flex-grow h-1 bg-gray-900 rounded-full outline-none">
          <Slider.Range className="absolute h-full bg-indigo-600 rounded-full outline-none" />
        </Slider.Track>
        <Slider.Thumb
          className="z-50 block w-4 h-4 font-bold bg-indigo-600 rounded-full shadow-xl outline-none ring-indigo-300 focus:ring-4 "
          data-tip="1.0"
        />
      </Slider.Root>
      <div className="flex items-center w-full h-8 text-gray-500 mt bg-white p-2 rounded-lg">
        {'Filter by rating: >= '}
        <span className="font-bold">{ratingFilter[0]}</span>
      </div>
    </div>
  )
}

export default SliderComponent
