let lastTime = 0
let prefixes = 'webkit moz ms o'.split(' ') // 各浏览器前缀

let requestAnimationFrame = window.requestAnimationFrame
let cancelAnimationFrame = window.cancelAnimationFrame

let prefix
// 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (let i = 0; i < prefixes.length; i++) {
  if (requestAnimationFrame && cancelAnimationFrame) {
    break
  }
  prefix = prefixes[i]
  requestAnimationFrame =
    requestAnimationFrame || window[prefix + 'RequestAnimationFrame']
  cancelAnimationFrame =
    cancelAnimationFrame ||
    window[prefix + 'CancelAnimationFrame'] ||
    window[prefix + 'CancelRequestAnimationFrame']
}

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function(callback) {
    let currTime = new Date().getTime()
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    let timeToCall = Math.max(0, 16 - (currTime - lastTime))
    let id = window.setTimeout(function() {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }

  cancelAnimationFrame = function(id) {
    window.clearTimeout(id)
  }
}

// 得到兼容各浏览器的API
window.requestAnimationFrame = requestAnimationFrame
window.cancelAnimationFrame = cancelAnimationFrame
