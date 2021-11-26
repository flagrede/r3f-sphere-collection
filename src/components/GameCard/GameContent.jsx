import { animated as a, config, useSpring, useSpringRef, useChain } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { LoremIpsum } from 'react-lorem-ipsum'
import { getRandomRating, getRandomTags } from '../../utils'

const GameContent = ({ cardIndex }) => {
  const springRate1Ref = useSpringRef()
  const springRate2Ref = useSpringRef()
  const [rateA] = useState(getRandomRating())
  const [rateB] = useState(getRandomRating())
  const { rate1 } = useSpring({
    from: { rate1: 0 },
    to: { rate1: rateA },
    config: config.slow,
    ref: springRate1Ref,
    delay: 2000,
  })
  const { rate2 } = useSpring({ from: { rate2: 0 }, to: { rate2: rateB }, config: config.slow, ref: springRate2Ref })
  useChain([springRate1Ref, springRate2Ref])
  const tags = getRandomTags()

  return (
    <div className="flex justify-center">
      <div className="flex justify-end">
        <div className="relative md:w-1/2 max-w-7xl rounded-lg p-8 bg-white border-t border-l border-r border-gray-300">
          <h1 className="text-center text-7xl bold antialiased mb-4">Game {cardIndex}</h1>
          <div className="flex mb-4">
            {tags.map((tag, index) => (
              <strong
                key={index}
                className={`inline-block px-3 py-1 text-xs font-semibold text-white uppercase bg-${tag.color}-600 rounded-full mr-2`}
              >
                {tag.label}
              </strong>
            ))}
          </div>
          <div className="text-gray-700 italic text-lg tracking-wide antialiased mb-2">
            <LoremIpsum avgWordsPerSentence={1} />
          </div>
          <div className="text-gray-700 text-lg tracking-wide antialiased mb-4">
            <LoremIpsum avgWordsPerSentence={4} />
          </div>
          <div className="flex justify-evenly text-blue-gray-700 ">
            <div className="flex flex-col items-center">
              <p className="text-lg italic">Press</p>
              <p className="text-5xl bold">
                <a.span>{rate1.to((v) => v.toFixed(0))}</a.span>
                /20
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg italic">Players</p>
              <p className="text-5xl bold">
                <a.span>{rate2.to((v) => v.toFixed(0))}</a.span>
                /20
              </p>
            </div>
          </div>
          <span className="absolute inset-x-0 bottom-0 rounded-lg rounded-t h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
        </div>
      </div>
    </div>
  )
}

export default GameContent
