<template>
  <div class="v-select">
    <div class="selected-info" @click="showItems">
      <template v-if='selected.currency'>
        <div class="select-currency_img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${selected.currency}.png)`, backgroundSize:'100% 100%'}"></div>
        <div class="text-color semi-bold f16">{{selected.currency | upperCase}}
          <span class="dark-text-color semi-bold f12">{{selected.readable_name}}</span>
        </div>
      </template>
      <div v-else>
        {{currencyType}}
      </div>
      <div class="icon-box">
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>
    <div class="select-items-wrap" v-if="isShowItems">
      <div class="search-box">
        <i class="el-icon-search"></i>
        <input type="text" v-model="coinKey" :placeholder="$t('m.funds.coinKey')" class='fb' @input="search">
      </div>
      <div v-if="!coinKey">
        <div class="l-title">{{$t('m.langSettings.common')}}</div>
        <div class="select-item " v-for="(item,index) in oftenItems" :key="index" @click="changeItem(item)" :class="{hasbg:index % 2 !== 0 }">
          <div class="select-currency_img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${item.currency}.png)`, backgroundSize:'100% 100%'}"></div>
          <div class="text-color semi-bold f16">
            <span>{{item.currency | upperCase}}</span>
            <span class="semi-bold f12 all-name" v-if="item.readable_name">{{item.readable_name}}</span>
          </div>
        </div>
      </div>

      <div class="l-title">{{$t('m.langSettings.list')}}</div>
      <div v-if="coinKey">
        <div class="select-item " v-for="(item,index) in filterItems" :key="index" @click="changeItem(item)" :class="{hasbg:index % 2 !== 0 }" v-if="hidden(item)">
          <div class="select-currency_img"  :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${item.currency}.png)`, backgroundSize:'100% 100%'}"></div>
          <div class="text-color semi-bold f16">
            <span>{{item.currency | upperCase}}</span>
            <span class="semi-bold f12 all-name" v-if="item.readable_name">{{item.readable_name}}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="select-item " v-for="(item,index) in items" :key="index" @click="changeItem(item)" :class="{hasbg:index % 2 !== 0 }" v-if="hidden(item)">
          <div class="select-currency_img"  :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${item.currency}.png)`, backgroundSize:'100% 100%'}"></div>
          <div class="text-color semi-bold f16">
            <span>{{item.currency | upperCase}}</span>
            <span class="semi-bold f12 all-name" v-if="item.readable_name">{{item.readable_name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upperCase from '@/utils/upperCase'
export default {
  mixins: [upperCase],
  props: ['selectItems', 'selected', 'type', 'disabledClick'],

  data() {
    return {
      isShowItems: false,
      coinKey: '',
      t: null,
      filterItems: []
    }
  },
  watch: {
    selected(val) {
      if (val) {
        this.isShowItems = false
      } else {
        this.isShowItems = true
      }
    },
  },
  created() {
    document.addEventListener('click', e => {
      if (this.disabledClick) {
        return
      }
      if (!this.$el.contains(e.target)) {
        this.isShowItems = false
      }
    })
    if (!this.selected.currency) {
      this.isShowItems = true
    }
  },
  computed: {
    currencyType() {
      return this.type === 'withdraw' ? this.$t('m.funds.selectCurrency1') : this.$t('m.funds.selectCurrency2')
    },
    oftenItems() {
      let arr = []
      this.selectItems.forEach(obj => {
        if (obj.currency === 'btc' || obj.currency === 'eth' || obj.currency === 'usdt' || obj.currency === 'trx') {
          arr.push(obj)
        }
      })
      return arr
    },
    items() {
      let arr = []
      this.selectItems.forEach(obj => {
        if (obj.currency !== 'btc' && obj.currency !== 'eth' && obj.currency !== 'usdt' || obj.currency !== 'trx') {
          arr.push(obj)
        }
      })
      return arr
    }
  },
  methods: {
    hidden(item) {
      if (item.currency === 'btc' && !this.coinKey || item.currency === 'eth' && !this.coinKey || item.currency === 'usdt' && !this.coinKey) {
        return false
      }
      return true
    },
    showItems() {
      this.isShowItems = !this.isShowItems
      if (this.isShowItems) {
        this.$emit('show')
      }
    },
    changeItem(item) {
      this.$emit('change', item)
      this.isShowItems = false
    },
    search() {
      clearTimeout(this.t)
      this.t = setTimeout(() => {
        this.filterItems = this.selectItems.filter(i => i.currency.toUpperCase().indexOf(this.coinKey.toUpperCase()) > -1)
      }, 100)
    },
  },
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.v-select {
  position: relative;
  width: 100%;
  background: #ffffff;
  .all-name {
    //margin-left: 5px;
    position: relative;
    left: 8px;

    &:before {
      content: '';
      position: absolute;
      left: -8px;
      top: 8px;
      width: 5px;
      height: 2px;
      background-color: #333333;
    }
  }

  .select-currency_img {
    width: 20px;
    height: 20px;
  }

  .select-items-wrap {
    position: absolute;
    margin: 0 auto;
    padding: 20px 0;
    width: 100%;
    max-height: 480px;
    background-color: #ffffff;
    z-index: $zindex-dropdown;
    border: 1px solid #eaedf5;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.08) 0 7px 14px 0;
    overflow: scroll;

    .l-title {
      font-size: 13px;
      color: #97a5b3;
      padding: 20px 40px 0;
    }
  }

  .search-box {
    position: relative;
    margin: 0 30px;
    padding: 10px 0;
    border-bottom: 1px solid #eaedf5;

    input {
      border: 0;
      text-indent: 20px;
      width: 100%;
      color: $color-assist3;
      font-size: 12px;
    }

    i {
      position: absolute;
      top: 14px;
    }
  }

  .select-item,
  .selected-info {
    display: flex;
    position: relative;
    align-items: center;
    font-size: 14px;
    cursor: pointer;

    .select-currency_img {
      margin-right: 6px;

      &:nth-of-type(1) {
        font-size: 16px;
      }

      &:nth-of-type(2) {
        flex: 1;
      }
    }
  }

  .select-item {
    padding: 10px;
    margin: 0 28px;

    &.hasbg {
      background-color: #f8f8fb;
    }

    &:hover {
      background-color: #f6f6f6;
    }
  }

  .selected-info {
    border: 1px solid #dfe1e8;
    padding: 10px 0 10px 15px;
    border-radius: 3px;

    &:hover {
      border-color: $color-border-hover;
    }

    .icon-box {
      position: absolute;

      /* float: right; */
      right: 0;
      height: 100%;
      border-left: 1px solid #dfe1e8;
      width: 50px;
      text-align: center;
      line-height: 1.8;

      i {
        font-size: 24px;
        color: $color-assist7;
      }
    }
  }
}
</style>
