module.exports = {
  required: (options = {}) => (v) => {
    if (!v) {
      if (typeof options.showMessage === 'function') {
        return options.showMessage()
      }
      return `必須項目です。`
    }

    return null
  }
}
