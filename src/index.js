const string = require('./string')
const any = require('./any')

const object = schema => {
  return (value, key) => {
    if (key) {
      return schema[key](key, value[key])
    }

    const obj = Object.entries(schema).reduce((acc, [k, v]) => {
      const m = v(k, value[k])
      if (!m) {
        return acc
      }

      return {
        ...acc,
        [k]: m
      }
    }, {})

    if (Object.keys(obj).length === 0) {
      return null
    }
    return obj
  }
}

const property = (fns, options = {}) => {
  return (key, value) => {
    return fns.reduce((acc, validator) => {
      const label = options.label || key
      const m = `${label}: ${validator(value)}`
      if (m) {
        return acc.concat(m)
      }
      return acc
    }, [])
  }
}

module.exports = {
  object,
  property,
  string,
  any
}
