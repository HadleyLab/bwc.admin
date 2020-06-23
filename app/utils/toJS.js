import { reduce } from 'lodash'

export default (object) => {
  const newObject = {}
  for (const [key, value] of object) {
    newObject[key] = value
  }
  return newObject
}
