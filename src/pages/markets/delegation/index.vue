<template>
  <div :class="boxWrapClass">
    <div class="overflow-container scrollStyle">
      <div :class="wrapClass">
        <div class="delegation-title">
          <div class="u-tabs tabs delegation-tabs">
            <div
              v-for="tab in tabs"
              :key="tab.key"
              :class="['u-tab-button', {current: curTab === tab.key}]"
              @click="curTab = tab.key"
            >
              <div class="name">{{tab.name}}</div>
            </div>
          </div>
          <div class="opt" v-if="type !== 'h5'">
            <v-checkbox v-model="checked">{{$t('m.exchange.showPairs')}}</v-checkbox>
          </div>
        </div>
        <template v-if="type !== 'h5'">
          <current v-if="curTab === 'orderCurrent'" :checked="checked"/>
          <history v-if="curTab === 'orderHistory'" :checked="checked"/>
          <stop-current v-if="curTab === 'stopCurrent'" :checked="checked"/>
          <stop-history v-if="curTab === 'stopHistory'" :checked="checked"/>
        </template>
        <template v-else>
          <div class="mobile-opt-wrap">
            <div class="mobile-opt">
              <v-checkbox v-model="checked">{{$t('m.optionExchange.showPairs')}}</v-checkbox>
              <a
                class="cancel"
                v-if="(curTab === 'orderCurrent' && myOpenList.length) || (curTab === 'stopCurrent' && myCondList.length)"
                @click="cancelAll"
              >{{$t('m.exchange.cancelAll')}}</a>
            </div>
          </div>
          <div class="mobile-list-wrap scrollStyle">
            <mobile-current v-if="curTab === 'orderCurrent'" :checked="checked"/>
            <mobile-history v-if="curTab === 'orderHistory'" :checked="checked"/>
            <mobile-stop-current v-if="curTab === 'stopCurrent'" :checked="checked"/>
            <mobile-stop-history v-if="curTab === 'stopHistory'" :checked="checked"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import VCheckbox from '@/components/checkbox'

import Current from './current'
import History from './history'
import StopCurrent from './stop-current'
import StopHistory from './stop-history'

import MobileCurrent from './mobile-current'
import MobileHistory from './mobile-history'
import MobileStopCurrent from './mobile-stop-current'
import MobileStopHistory from './mobile-stop-history'

export default {
  components: {
    Current,
    History,
    VCheckbox,
    StopCurrent,
    StopHistory,
    MobileCurrent,
    MobileHistory,
    MobileStopCurrent,
    MobileStopHistory,
  },
  data() {
    return {
      curTab: 'orderCurrent',
      tabs: [
        {
          name: this.$t('m.exchange.openOrders'),
          key: 'orderCurrent',
        },
        {
          name: this.$t('m.exchange.orderHistory'),
          key: 'orderHistory',
        },
        {
          name: this.$t('m.exchange.ordersEntrustment'),
          key: 'stopCurrent',
        },
        {
          name: this.$t('m.exchange.ordersEntrustmentHistory'),
          key: 'stopHistory',
        },
      ],
      checked: true,
    }
  },
  watch: {
    tabIndex() {
      this.$emit('tabIndex', this.tabIndex)
    },
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    ...mapGetters('openOrders', { openAllOrders: 'allOrders', openCurrentOrders: 'currentOrders' }),
    ...mapGetters('conditionCurrent', { condAllOrders: 'allOrders', condCurrentOrders: 'currentOrders' }),
    wrapClass() {
      return this.type !== 'h5' ? 'delegation-wrap' : 'mobile-delegation-wrap'
    },
    boxWrapClass() {
      return this.type !== 'h5' ? 'delegation-box-wrap' : 'mobile-delegation-box-wrap'
    },
    myOpenList() {
      return this.checked ? this.openAllOrders : this.openCurrentOrders
    },
    myCondList() {
      return this.checked ? this.condAllOrders : this.condCurrentOrders
    },
  },
  methods: {
    ...mapActions('openOrders', ['clearOrder']),
    ...mapActions('conditionCurrent', ['clearCondition']),
    async cancelAll() {
      if (this.curTab === 'orderCurrent') {
        const resp = await this.clearOrder()
        const result = resp && resp.data && resp.data.clearOrder
        if (result && result[0].id) {
          this.$notify.success(this.$t('m.successMessage.cancelSuccess'))
        } else {
          this.$notify.error(this.$t('m.exchange.cancelFailed'))
        }
      }
      if (this.curTab === 'stopCurrent') {
        const resp = await this.clearCondition()
        const result = resp && resp.data && resp.data.conditionClear && resp.data.conditionClear.result
        if (result === 'success') {
          this.$notify.success(this.$t('m.successMessage.cancelSuccess'))
        } else {
          this.$notify.error(this.$t('m.exchange.cancelFailed'))
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.delegation-box-wrap {
  display: flex;
  min-width: 0;
  min-height: 0;
  .overflow-container {
    flex: 1;
    overflow: auto;
    height: 260px;
    .delegation-wrap {
      min-width: 1366px;
      .delegation-title {
        position: relative;
        .delegation-tabs {
          height: 45px;
          padding: 0 20px;
        }
        .opt {
          position: absolute;
          right: 20px;
          top: 14px;
          font-size: 13px;

          @include themify($themes) {
            color: themed('textColor3');
          }
        }
      }
    }
  }
}

.mobile-delegation-wrap {
  height: 100%;

  @include themify($themes) {
    background-color: themed('wrapBgColor');
  }
  .delegation-title {
    width: 100%;
    overflow-y: scroll;
  }
  .delegation-tabs {
    white-space: nowrap;
  }
  .delegation-tabs.u-tabs {
    margin: 0;
    padding: 0 20px;
  }
  .mobile-opt-wrap {
    padding: 0 15px;
    .mobile-opt {
      font-size: 12px;
      height: 37px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid;

      @include themify($themes) {
        border-color: themed('lineBorderColorF5');
        color: themed('textColor3');
      }
      .cancel {
        font-size: 12px;
        line-height: 17px;

        @include themify($themes) {
          color: themed('textColor3');
        }
      }
    }
  }
  .mobile-list-wrap {
    height: calc(100% - 82px);
  }
}
</style>
