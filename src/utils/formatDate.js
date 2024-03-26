function addZero(val) {
  val = val < 10 ? `0${val}` : val
  return val
}


function formatDate(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = addZero(date.getMonth() + 1)
  const day = addZero(date.getDate())
  const hour = addZero(date.getHours())
  const minute = addZero(date.getMinutes())
  const second = addZero(date.getSeconds())

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}

export default formatDate
