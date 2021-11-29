import { CARDS_NUMBER } from './constants'

const radius = 8

const getRandomRating = () => Math.round(Math.random() * 20)

const getData = () =>
  Array.from({ length: CARDS_NUMBER }, (value, key) => ({ id: key, playerRating: getRandomRating(), pressRating: getRandomRating() }))

const getElementPosition = ({ index }) => {
  const phi = Math.acos(-1 + (2 * index) / CARDS_NUMBER)
  const theta = Math.sqrt(CARDS_NUMBER * Math.PI) * phi

  return { radius, phi, theta }
}

const getRandomTags = () => {
  const tags = [
    { color: 'blue', label: 'RPG' },
    { color: 'red', label: 'FPS' },
    { color: 'green', label: 'ADVENTURE' },
    { color: 'purple', label: 'ACTION' },
    { color: 'indigo', label: 'RTS' },
    { color: 'gray', label: 'MOBA' },
  ]

  const randomTagIndex1 = Math.floor(Math.random() * tags.length)
  const randomTagIndex2 = (randomTagIndex1 + 1) % tags.length

  return [tags[randomTagIndex1], tags[randomTagIndex2]]
}

export { getElementPosition, getRandomRating, getRandomTags, getData }
