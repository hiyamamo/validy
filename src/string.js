const eaw = require('eastasianwidth')
module.exports = {
  max: (limit, options = {}) => (v) => {
    const len = options.eaw ? eaw.length(v) : v.length

    if (limit < len) {
      if (typeof options.showMessage === 'function') {
        return options.showMessage(limit)
      }
      return `${limit}文字以内で入力してください。`
    }

    return null
  }
}
