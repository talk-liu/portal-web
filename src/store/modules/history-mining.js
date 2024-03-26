import api from '@/graphql'
import cloneDeep from 'lodash/cloneDeep'
export default {
  namespaced: true,
  state: {
    oriMining: [],
    miningMeta: {},
  },
  getters: {
    miningHistory: ({ oriMining }) => {
      let mining = cloneDeep(oriMining)
      mining.map(val => {
        try {
          const extraObj = JSON.parse(val.extra_info)
          val['extra'] = extraObj.created_at
          val['update_time'] =
            extraObj.created_at && extraObj.created_at.split(' ')[0]
          if (extraObj.type === 'mining') {
            val['source'] = 'my_tom'
          } else if (extraObj.level === 0 && extraObj.type === 'power_coupon') {
            val['source'] = 'power_coupon'
          } else if (extraObj.level === 0) {
            val['source'] = 'invited_tom'
          } else if (extraObj.level === 1) {
            val['source'] = 'level1_tom'
          } else if (extraObj.level === 2) {
            val['source'] = 'level2_tom'
          }
        } catch (e) {
          // empty
        }
      })
      return mining
    },
  },
  mutations: {
    setMining: (state, data) => {
      if (data.isLoadMore) {
        state.oriMining = state.oriMining.concat(data.deposits)
      } else {
        state.oriMining = data.deposits
      }
    },
    setMiningMeta: (state, data) => (state.miningMeta = data),
  },
  actions: {
    async getMiningHistory({ commit }, params) {
      const resp = await api.query('HISTORYMINING', params, 'no-cache')
      const result = resp && resp.data && resp.data.historyMining
      if (result && result.deposits) {
        let res = cloneDeep(result)
        res.isLoadMore = params.isLoadMore
        commit('setMining', res)
        commit('setMiningMeta', res.meta)
      }
    },
  },
}