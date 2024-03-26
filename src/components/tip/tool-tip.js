import Vue from 'vue'
import Main from './tool-tip.vue'

let TooltipContrustor = Vue.extend(Main)

const Tooltip = function(options) {
  options = options || {}
  let instance = new TooltipContrustor({
    data: { options },
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.dom = instance.vm.$el
  Vue.prototype.$clearTooltip = () => {
    instance.options.show = false
  }
  return instance.vm
}

export default Tooltip
