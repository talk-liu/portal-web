<template>
  <div class="v-select">
    <div class="selected-info" @click="showItems">
      <div class="info" v-if="selected.currency">
        <div class="select-currency_img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${selected.currency}.png)`, backgroundSize:'100% 100%'}"></div>
        <div class="semi-bold ">
          <p class="text-color">{{selected.currency | upperCase}}</p>
          <p class="dark-text-color">{{selected.readable_name}}</p>
        </div>
      </div>
      <div v-else>
        {{currencyType}}
      </div>
      <div class="icon-box" >
        <i class="iconfont icon-forward"></i>
      </div>
    </div>
    <div class="select-items-wrap" v-if="isShowItems">
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <input type="text" v-model="coinKey" :placeholder="$t('m.searchBar.searchPlaceholder')" @input="search">
        <span class="cancel" :class='{active : coinKey}' @click='cancel'>{{$t('m.searchBar.cancel')}}</span>
      </div>
      <div v-if="coinKey">
        <div class="select-item " v-for="(item,index) in filterItems" :key="index" @click="changeItem(item)">
          <div class="select-currency_img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${item.currency}.png)`, backgroundSize:'100% 100%'}"></div>
          <div class=" semi-bold">
            <p class="text-color"><span>{{item.currency | upperCase}}</span></p>
            <p class="semi-bold dark-text-color" v-if="item.readable_name">{{item.readable_name}}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="select-item " v-for="(item,index) in items" :key="index" @click="changeItem(item)" >
          <div class="select-currency_img" :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${item.currency}.png)`, backgroundSize:'100% 100%'}"></div>
          <div class=" semi-bold">
            <p class="text-color"><span>{{item.currency | upperCase}}</span></p>
            <p class="semi-bold dark-text-color" v-if="item.readable_name">{{item.readable_name}}</p>
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
  props: ['selectItems', 'selected', 'type'],

  data() {
    return {
      isShowItems: false,
      coinKey: '',
      filterItems: [],
      t: null,
    }
  },
  computed: {
    currencyType() {
      return this.type === 'withdraw' ? this.$t('m.funds.selectCurrency1') : this.$t('m.funds.selectCurrency2')
    },
    items() {
      let arr = []
      this.selectItems.forEach(obj => {
        arr.push(obj)
      })
      arr.sort(function(a, b) {
        return a.currency.localeCompare(b.currency)
      })
      return arr
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
      if (!this.$el.contains(e.target)) {
        this.isShowItems = false
      }
    })
    if (!this.selected.currency) {
      this.isShowItems = true
    }
  },
  methods: {
    cancel() {
      this.isShowItems = false
    },
    showItems() {
      this.isShowItems = !this.isShowItems
      this.coinKey = ''
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
        this.filterItems = this.items.filter(i => i.currency.toUpperCase().indexOf(this.coinKey.toUpperCase()) > -1)
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

  .select-currency_img {
    width: 28px;
    height: 28px;
  }

  .select-items-wrap {
    position: fixed;
    left: 0;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    z-index: $zindex-modal;
    top: 0;
    border: 1px solid #eaedf5;
    box-shadow: rgba(0, 0, 0, 0.08) 0 7px 14px 0;
    overflow: scroll;
  }

  .search-box {
    position: relative;
    padding: 23px 20px 10px;
    border-bottom: 1px solid #eaedf5;
    display: flex;
    .cancel {
      color: #cccccc;
      font-size: 15px;
      position: absolute;
      right: 20px;
      &.active {
        color: #111111;
      }
    }
    input {
      border: 0;
      width: 100%;
      color: #111111;
      font-size: 15px;
      margin-left: 10px;
      &::-webkit-input-placeholder {
        color: #cccccc;
      }
    }

    i {
      margin-top: 2px;
      color: #cccccc;
      font-size: 18px;
    }
  }

  .select-item,
  .selected-info {
    display: flex;
    position: relative;
    align-items: center;
    cursor: pointer;
    p {
      font-size: 15px;
      &:last-child {
        font-size: 12px;
      }
    }
    .select-currency_img {
      margin-right: 10px;

      &:nth-of-type(1) {
        font-size: 16px;
      }

      &:nth-of-type(2) {
        flex: 1;
      }
    }
  }

  .select-item {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    &:hover {
      background-color: #f6f6f6;
    }
  }

  .selected-info {
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 10px 0 10px 0;
    .info {
      display: flex;
      align-items: center;
    }
    .icon-box {
      i {
        font-size: 12px;
        color: $color-assist7;
      }
    }
  }
}
</style>
