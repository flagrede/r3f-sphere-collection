import { CARDS_NUMBER } from './constants'

const radius = 8

const getElementPosition = ({ index, maxItems }) => {
  const phi = Math.acos(-1 + (2 * index) / CARDS_NUMBER)
  const theta = Math.sqrt(CARDS_NUMBER * Math.PI) * phi

  return { radius, phi, theta }
}

const getRandomRating = () => Math.min(Math.random() * 20 + 5, 20)

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

const getItemsNumber = ({ rating, maxItems }) => {
  return 0
}

export { getElementPosition, getRandomRating, getRandomTags, getItemsNumber }
