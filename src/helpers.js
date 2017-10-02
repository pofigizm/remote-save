const isPlainObject = (value) => {
  return value && typeof value === 'object' && value.constructor === Object
}

const deepAssign = (target, ...sources) => {
  if (target === undefined || target === null) {
    throw new TypeError('Not expected undefined or null in first argument')
  }

  const result = Object(target)

  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (isPlainObject(sourceValue)) {
        result[key] = deepAssign(isPlainObject(targetValue) ? targetValue : {}, sourceValue)
      } else {
        result[key] = sourceValue
      }
    })
  })

  return result
}

export default { isPlainObject, deepAssign }
export { isPlainObject, deepAssign }
