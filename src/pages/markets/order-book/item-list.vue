<template>
  <div :class="['item', type, active]" @click="setPrice(item.price)">
    <span class="strip" :style="percent(item.amount,'ask')"></span>
    <ul class="tr">
      <li class="amount">{{item.amount}}<span class="zero">{{item.amountZero}}</span></li>
      <li><span class="before">{{item.priceBefore}}.</span><span class="after">{{item.priceAfter}}</span></li>
      <li>{{item.mySize || '-'}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    item: { type: Object, default: () => ({}) },
    type: { type: String, default: '' },
  },
  data() {
    return {
      active: '',
    }
  },
  computed: {
    ...mapGetters('orderBook', ['orderAsks', 'orderBids']),
  },
  methods: {
    ...mapMutations('orderForm', ['setPrice']),
    percent(val, type) {
      let max = 0
      max = type === 'ask' ? this.orderAsks.max : this.orderBids.max
      let p = (val / max) * 100
      let style = { width: (p > 100 ? 100 : p) + '%' }
      return style
    },
  },
  mounted() {
    this.active = 'enter'
    setTimeout(() => {
      this.active = ''
    }, 1500)
  },
}
</script>

<style lang="scss">
$time: 1.5s;

.item {
  position: relative;
  .strip {
    display: block;
    position: absolute;
    height: 22px;
    margin-right: 20px;
    top: 0;
  }
  .tr {
    width: 100%;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    display: flex;
    position: relative;

    @include themify($themes) {
      color: themed('textColor3');
    }
    .zero {
      @include themify($themes) {
        color: themed('zeroColor');
      }
    }
    li {
      text-align: right;
      flex: 1;
      &:nth-child(1) {
        padding-left: 20px;
      }
      &:nth-child(3) {
        padding-right: 20px;
      }
    }
    &:hover {
      position: relative;
      cursor: pointer;

      @include themify($themes) {
        background-color: themed('orderHoverColor');
      }
      &:before {
        content: '';
        display: block;
        height: 22px;
        width: 2px;
        position: absolute;
      }
    }
  }
}

.ask.item {
  .before {
    @include themify($themes) {
      color: rgba(themed('sellColor'), 0.5);
    }
  }
  .after {
    @include themify($themes) {
      color: themed('sellColor');
    }
  }
  .strip {
    @include themify($themes) {
      background-color: rgba(themed('sellColor'), 0.2);
    }
  }
  .tr {
    &:hover {
      &:before {
        @include themify($themes) {
          background-color: themed('sellColor');
        }
      }
      li {
        @include themify($themes) {
          color: themed('sellColor');
        }
        .zero,
        .before {
          @include themify($themes) {
            color: themed('sellColor');
          }
        }
      }
    }
  }
}

.bid.item {
  .before {
    @include themify($themes) {
      color: rgba(themed('buyColor'), 0.5);
    }
  }
  .after {
    @include themify($themes) {
      color: themed('buyColor');
    }
  }
  .strip {
    @include themify($themes) {
      background-color: rgba(themed('buyColor'), 0.2);
    }
  }
  .tr {
    &:hover {
      &:before {
        @include themify($themes) {
          background-color: themed('buyColor');
        }
      }
      li {
        @include themify($themes) {
          color: themed('buyColor');
        }
        .zero,
        .before {
          @include themify($themes) {
            color: themed('buyColor');
          }
        }
      }
    }
  }
}

.ask.enter {
  transition: all $time;
  animation: show $time infinite;
  .amount {
    @include themify($themes) {
      color: themed('sellColor');
    }
  }
}

.bid.enter {
  transition: all $time;
  animation: show $time infinite;
  .amount {
    @include themify($themes) {
      color: themed('buyColor');
    }
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

