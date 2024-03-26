export default function(arr) {
  if (arr.length > 0) {
    const a1 = arr[0]
    const a2 = arr[1]
    const b1 = arr[arr.length - 1]
    const b2 = arr[arr.length - 2]

    const virtualFirst = a1 / (a2 / a1)
    const virtualLast = (b1 / b2) * b1
    arr.unshift(virtualFirst)
    arr.push(virtualLast)
    return arr
  } else {
    return []
  }

}