import Vue from 'vue'
import store from '@/store'
import Main from './notification.vue'

let NotificationContrustor = Vue.extend(Main)
const Notification = function(options) {
  options = options || {}
  let targetElement = options.targetElement || document.body
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  let instance = new NotificationContrustor({
    data: options,
  })
  instance.vm = instance.$mount()
  targetElement === options.targetElement ? (targetElement.style.position = 'relative') : ''
  targetElement.appendChild(instance.vm.$el)
  instance.dom = instance.vm.$el
  return instance.vm
}

;['error', 'success', 'warn'].forEach(type => {
  Notification[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
      }
    }
    options.type = type
    options.viewType = store.getters['viewport/type']
    return Notification(options)
  }
})

export default Notification
