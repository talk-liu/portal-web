import Vue from 'vue'
import Main from '../components/message.vue'

let MessageContrustor = Vue.extend(Main)

// const body = document.body

const Message = function(options) {
  options = options || {}


  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  let instance = new MessageContrustor({
    data: options,
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.dom = instance.vm.$el
  return instance.vm
};

['error', 'success', 'warn'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default Message
