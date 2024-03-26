export default {
  filters: {
    upperCase(val) {
      if (!val) return val
      return val.toUpperCase()
    }
  },
}