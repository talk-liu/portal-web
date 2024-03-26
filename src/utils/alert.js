import Vue from 'vue'
import Main from '../components/popover.vue'

let AlertContrustor = Vue.extend(Main)

// const body = document.body

const Alert = function(options) {
  options = options || {}
  let instance = new AlertContrustor({
    data: { options },
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.dom = instance.vm.$el
  return instance.vm
}


export default Alert
