import api from '@/graphql'
export default {
  namespaced: true,
  state: {
    at_ratio: 0,
    finished_cache: false,
    total_at_amount: 0,
    locked_at_amount: 0,
    last_at_income: 0,
    locked_at_list: [],
    total_profit: { beu: {} },
    yesterday_profit: { beu: {} },
    seven_days_at: {}
  },
  mutations: {
    setMyIncome: (state, data) => {
      state.finished_cache = data.finished_cache
      state.total_at_amount = data.total_at && data.total_at.amount
      state.locked_at_amount = data.frozen_at && data.frozen_at.amount
      state.last_at_income = data.last_at_income && data.last_at_income.amount
      state.locked_at_list = data.frozen_at && data.frozen_at.list
      state.at_ratio = data.at_ratio
      state.total_profit = data.total_profit
      state.yesterday_profit = data.yesterday_profit
      state.seven_days_at = data.seven_days_at
    },
  },
  actions: {
    async getMyIncome({ commit }) {
      if (process.env.NODE_ENV === 'production') {
        const income = window.gon.income
        if (income) {
          commit('setMyIncome', income.profits)
        }
      } else {
        const resp = await api.query('INCOME')
        if (resp && resp.data && resp.data.income) {
          commit('setMyIncome', resp.data.income)
        }
      }
    }
  }
}
