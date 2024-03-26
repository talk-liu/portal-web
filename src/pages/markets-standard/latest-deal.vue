<template>
  <div class="latest-deal">
    <div class="tab-title">
      <div class="u-tabs tabs latest-deal-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['u-tab-button', {current: curTab === tab.key}]"
          @click="curTab = tab.key"
        >
          <div class="name">{{tab.name}}</div>
        </div>
      </div>
    </div>
    <div class="depth-table-ct" v-if="curTab == 'pair'">
      <div class="table-ct scrollStyle">
        <table>
          <tbody>
            <tr
              class="semi-bold"
              :class="[item.type === 'buy' ? 'green':'red']"
              v-for="(item,idx) in trades"
              :key="`trades-${idx}-${item.tid}`"
              @click="setOrderPrice(item.price)"
            >
              <td>{{item.price}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="depth-table-ct my" v-if="curTab == 'my'">
      <div class="table-ct scrollStyle">
        <table v-if="myList.length > 0">
          <tbody>
            <tr
              class="semi-bold"
              :class="[item.type === 'buy' ? 'green':'red']"
              v-for="item in myList"
              :key="`my-${item.tid}`"
              @click="setOrderPrice(item.price)"
            >
              <td>{{item.price}}</td>
              <td>{{item.amount}}</td>
              <td>{{formatDate(item.date)}}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty">{{$t('m.exchange.noOrder')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import dayjs from 'dayjs'
import api from '@/graphql'

export default {
  name: 'latest-deal',
  computed: {
    ...mapState('tickers', ['currentMarketId']),
    ...mapGetters('trades', ['trades']),
  },
  data() {
    return {
      curTab: 'pair',
      tabs: [
        {
          name: this.$t('m.exchange.pair'),
          key: 'pair',
        },
        {
          name: this.$t('m.exchange.my'),
          key: 'my',
        },
      ],
      myList: [],
    }
  },
  watch: {
    curTab(val) {
      if (val === 'my') {
        this.loadMyTrades()
      }
    },
  },
  methods: {
    ...mapMutations('standardPrice', ['setOrderPrice']),
    loadMyTrades() {
      const url = 'HISTORYTRADES'
      const from = dayjs()
        .add(-1, 'day')
        .unix()
      const params = {
        page: 1,
        page_size: 50,
        market: this.currentMarketId,
        from,
      }
      api.query(url, params).then(resp => {
        if (resp && resp.data && resp.data.historyTrade && resp.data.historyTrade.trades) {
          this.myList = resp.data.historyTrade.trades
        }
      })
    },
    formatDate(val) {
      return dayjs(val).format('HH:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
.latest-deal-tabs {
  margin: 0 5px;
}

.latest-deal {
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid $color-line;
  padding: 0 15px;
  height: 300px;
  margin-top: 16px;
  .tab-title {
    display: flex;
    justify-content: space-between;
    .right-title {
      color: $color-assist3;
      line-height: 38px;
      font-size: 13px;
      font-weight: 600;
    }
  }

  .depth-table-ct {
    width: 268px;
    color: $color-gray;
    border-top: 1px solid $color-assist4;
    padding-top: 6px;
    .table-ct {
      width: 274px;
      height: 248px;
      padding-right: 12px;
      .empty {
        margin-top: 80px;
        color: #cccccc;
        text-align: center;
        font-size: 14px;
      }
      table {
        table-layout: fixed;
        width: 100%;
        text-align: left;
        font-size: 13px;
        border-collapse: collapse;
        tbody {
          width: 100%;
          display: block;
          tr {
            display: flex;
            width: 100%;
            height: 27px;
            line-height: 27px;
            td {
              flex: 1;
              &:nth-child(2) {
                padding-left: 30px;
              }
              &:nth-child(3) {
                text-align: right;
                color: $color-assist2;
              }
            }
            &:hover {
              cursor: pointer;
              background-color: #f6f6f6;
            }
            > :nth-child(2) {
              color: $color-assist1;
            }
          }
        }
        .red {
          > :first-child {
            color: $color-assist6;
          }
        }
        .green {
          > :first-child {
            color: $color-assist5;
          }
        }
      }
    }
  }
}
</style>
