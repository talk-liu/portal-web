const data = window.gon
const id = data.current_user && data.current_user.id
export default {
  data() {
    const role = localStorage.getItem(id + 'user-guide-role') || 1
    const steps = {
      1: ['funds', 'recharge', 'exchange', 'orderForm', 'historyOrder', 'finish'],
      2: ['funds', 'recharge', 'exchange', 'orderForm', 'historyOrder', 'finish'],
      3: ['mining', 'funds', 'recharge', 'exchange', 'orderForm', 'historyOrder', 'finish']
    }
    return {
      steps: steps[role],
      step: '',
      nextStep: '',
      prevStep: '',
      isLogin: id
    }
  },
  mounted() {
    // const isShowGuide = localStorage.getItem('user-guide-show') === 'true'
    // if (isShowGuide && this.isLogin) {
    //   this.step = localStorage.getItem('user-guide-step') || this.steps[0]
    //   this.step_index = this.steps.indexOf(this.step)
    //   this.nextStep = this.step_index < this.steps.length ? this.steps[this.step_index + 1] : ''
    //   this.prevStep = this.step_index > 0 ? this.steps[this.step_index - 1] : ''
    // }
  },
  methods: {
    setAllStep(step) {
      this.step = step
      this.step_index = this.steps.indexOf(step)
      this.nextStep = this.step_index < this.steps.length ? this.steps[this.step_index + 1] : ''
      this.prevStep = this.step_index > 0 ? this.steps[this.step_index - 1] : ''
    },
    close() {
      localStorage.setItem('user-guide-show', '')
      localStorage.setItem('user-guide-step', '')
      this.step = ''
    }
  }
}
