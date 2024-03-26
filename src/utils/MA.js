let MA = function(dayCount, data, dataIndex, fixed) {
  this.data = data && data.length ? data : []
  this.dayCount = dayCount || 0
  this.dataIndex = dataIndex >= 0 ? dataIndex : null
  this.fixed = fixed >= 0 ? fixed : 0
}
MA.prototype = {
  add(v) {
    this.data.push(v)
    let dayCount = this.dayCount
    if (dayCount > this.data.length) {
      return '-'
    }
    let result = this.compute()
    return result[result.length - 1]
  },
  prepend(list) {
    let newList = list.concat(this.data)
    this.data = newList
  },
  compute() {
    let data = this.data.concat([])
    let size = this.dayCount
    while (!data[data.length - 1][0]) { // 末尾可能被填充了空数据
      data.pop()
    }
    const length = data.length
    if (size > length) {
      return Array(length + 1)
        .join('-')
        .split('')
    }

    const prepare = size - 1
    const ret = []
    const dataIndex = this.dataIndex
    const fixed = this.fixed
    let sum = 0
    let i = 0
    let counter = 0
    let datum

    for (; i < length && counter < prepare; i++) {
      datum = data[i][dataIndex]

      sum += datum
      counter++
      ret[i] = '-'
    }

    for (; i < length; i++) {
      datum = data[i][dataIndex]

      sum += datum

      if (data[i - size] && data[i - size][dataIndex] > 0) {
        sum -= data[i - size][dataIndex]
      }

      ret[i] = (sum / size).toFixed(fixed)
    }

    return ret
  }
}
export default MA
