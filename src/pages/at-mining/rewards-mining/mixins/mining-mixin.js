import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      seletedIdx: 3,
    }
  },
  computed: {
    ...mapGetters({
      computingPower: 'computingPower',
      downTime: 'downTime',
      lastFee: 'lastFee',
      lastComputingPower: 'lastComputingPower',
      blockCount: 'blockCount',
      totalAt: 'totalAt',
    }),
    minedBlock() {
      let minedBlock = this.computingPower.slice(0, 3)
      if (this.lastComputingPower) {
        minedBlock = minedBlock.concat(this.lastComputingPower)
      } else {
        minedBlock = this.computingPower
      }
      return minedBlock
    },
    currentExchangeData() {
      return this.minedBlock[this.seletedIdx]
    },
    totalAtFormat() {
      return Number(this.totalAt).toLocaleString('en-US')
    },
  },
  methods: {
    blockClick(i) {
      localStorage.setItem('mine_clicked', 1)
      this.seletedIdx = i
    },
    blockHeight(v, totalHeight) {
      if (v) {
        const x = v.totalBtc > 100 ? 1 : v.totalBtc / 100
        return totalHeight * x + 'px'
      } else {
        return 0
      }
    },
  },
}
