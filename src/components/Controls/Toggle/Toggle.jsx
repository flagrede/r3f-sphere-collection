import { Switch } from '@headlessui/react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useStore } from '../../../App'

const Toggle = () => {
  const cardHidden = useStore((state) => state.cardHidden)
  const setCardHidden = useStore((state) => state.setCardHidden)
  return (
    <div className="flex flex-col items-center mx-4">
      <div className="flex items-center h-14">
        <Switch
          checked={cardHidden}
          onChange={setCardHidden}
          className={`${cardHidden ? 'bg-indigo-900' : 'bg-indigo-700'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Card hidden</span>
          <span
            aria-hidden="true"
            className={`${cardHidden ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
      {cardHidden ? <EyeClosedIcon className="w-8 h-8 text-gray-500 mt" /> : <EyeOpenIcon className="w-8 h-8 text-gray-500 mt" />}
    </div>
  )
}

export default Toggle
