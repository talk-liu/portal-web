import cloneDeep from 'lodash/cloneDeep'

import api from '@/graphql'

export default {
  namespaced: true,
  state: {
    allLoveTickers: [],
  },
  mutations: {
    getAllLoveTickers(state, data) {
      state.allLoveTickers = data
    },
    tickerLove(state, data) {
      state.allLoveTickers.push(data)
    },
    tickerUnlove(state, data) {
      const index = state.allLoveTickers.indexOf(data)
      state.allLoveTickers.splice(index, 1)
    },
  },
  actions: {
    async getAllLoveTickers({ commit }) {
      const resp = await api.query('FAVORITEMARKET', {}, 'no-cache')
      const result = resp && resp.data && resp.data.favoriteMarket && resp.data.favoriteMarket.fm
      // console.log('<----loveTickers---->', result)
      if (!result) return false
      commit('getAllLoveTickers', cloneDeep(result))
    },
    async tickerLove(store, data) {
      // 提前加入
      store.commit('tickerLove', data.market_id)
      const resp = await api.mutate('UPDATE_FAVORITEMARKET', { market: data.market_id })
      if (resp.data.updateFavoriteMarket.market !== 'success') {
        // 失败则将提前加入的移除
        store.commit('tickerUnlove', data.market_id)
      }
    },
    async tickerUnlove(store, data) {
      // 提前移除
      store.commit('tickerUnlove', data.market_id)
      const resp = await api.mutate('DELETE_FAVORITEMARKET', { market: data.market_id })
      if (resp.data.deleteFavoriteMarket.market !== 'success') {
        // 失败则将提前移除的重新加入
        store.commit('tickerLove', data.market_id)
      }
    },
  },
}
