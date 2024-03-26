<template>
  <div
    class="v-drop_down"
    @mouseenter="mouseenter"
    @mouseleave.stop="mouseout"
    :class="type=='labelSelect' ? 'label-select' : ''"
  >
    <div
      v-if="type !== 'userAvatar'"
      class="selected-item"
      @click="selectedClick"
      :class="{active:showList}"
    >
      <span @click="clickTitle">{{val}}</span>
      <i class="iconfont icon-xiala" v-if="type==='lang'"></i>
    </div>
    <div v-else class="selected-item avatar-item" @click="selectedClick" :class="{active:showList}">
      <img src="../assets/images/avatar.png" v-if="!isMiner">
      <img src="../assets/images/miner-avatar.png" class="miner" v-else>
    </div>
    <ul
      class="drop-list clearfix"
      :class="{exchange: type==='exchange',lang: type==='lang'}"
      @click="selectItem"
      ref="droplist"
    >
      <slot name="list"></slot>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['value', 'type', 'width'],

  data() {
    return {
      showList: false,
      val: this.value,
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
  },
  computed: {
    ...mapGetters(['currentTicker', 'isMiner']),
  },
  methods: {
    selectItem(e) {
      if (this.type === 'lang') {
        const name = e.target.getAttribute('name')
        // this.val = e.target.innerText
        this.$emit('change', name)
        this.showList = !this.showList
      } else if (this.type === 'labelSelect') {
        this.showList = !this.showList
        this.$refs.droplist.style.transform = 'scaleY(0)'
        this.$emit('mouseout')
      }
    },
    mouseenter() {
      setTimeout(() => {
        this.$refs.droplist.style.transform = 'scaleY(1)'
        this.$emit('mouseenter')
      }, 0)
    },
    mouseout() {
      this.$refs.droplist.style.transform = 'scaleY(0)'
      this.$emit('mouseout')
    },
    selectedClick() {
      this.$emit('click')
    },
    clickTitle() {
      if (this.type === 'exchange') {
        if (this.currentTicker && this.currentTicker.marketId) {
          location.href = '/pro/markets/ateth' // PD要求点击title默认到达ateth
        }
      }
      if (this.type === 'funds') {
        location.href = '/funds'
      } else if (this.type === 'orders') {
        location.href = '/history/orders/#open-orders'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.v-drop_down {
  position: relative;
  color: $color-text;
  height: 100%;
  &:hover {
    .selected-item {
      background-color: $color-text;
      color: $color-primary;
    }

    .drop-list {
      display: block;
    }
  }

  .selected-item {
    padding: 0 15px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    line-height: 60px;
    font-weight: 500;

    &.avatar-item {
      padding-left: 15px;

      img {
        width: 30px;
        height: 30px;
        margin-top: 15px;

        &.miner {
          margin-top: 10px;
          width: 39px;
          height: 34px;
        }
      }
    }

    .icon-xiala {
      vertical-align: middle;
    }

    &:hover {
      background-color: $color-text;
      color: $color-primary;

      .drop-list {
        display: block;
      }
    }

    &.active {
      background-color: $color-text;
      color: $color-primary;
    }

    i.icon-ICON {
      display: inline-block;
      //margin-top: 2px;
      font-size: 30px;
      //color: $color-text;
    }
  }

  .drop-list {
    display: none;
    position: absolute;
    padding: 10px 0;
    min-width: 140%;
    max-height: 500px;
    transform: scaleY(0);
    transform-origin: top center;
    background-color: #ffffff;
    box-shadow: rgba($color: #000000, $alpha: 0.05) 0 10px 10px;
    transition: all 0.3s;
    z-index: $zindex-dropdown;
    overflow-x: hidden;
    &.lang {
      width: 180px;
      right: 0;
      padding-left: 10px;

      li {
        display: inline-block;
        min-width: 75px;
        margin-right: 5px;
        margin-left: 0;
      }
    }
    &.exchange {
      transition: all 0.05s;
    }
    li {
      margin: 0 10px;
      list-style: none;
      cursor: pointer;
      color: #666666;
      font-size: 14px;
      border-radius: 4px;
      font-weight: 500;
      .email-address {
        font-size: 11px;
        color: $color-assist2;
      }
      &:hover {
        background-color: $color-primary;
        color: $color-text;
        font-weight: 500;

        a {
          color: $color-text;
          font-weight: 500;
        }
      }
      a {
        padding: 10px 10px;
        white-space: nowrap;
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: $color-assist1;
      }
    }
  }
}

.label-select {
  &:hover {
    .selected-item {
      background-color: #ffffff !important;
      color: $color-text !important;
    }
  }
  .drop-list li {
    padding: 5px 10px;
  }

  .selected-item {
    margin-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-text;
    border-radius: 4px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    padding: 0;
    border: 1px solid #dce0eb;
    &:hover {
      background-color: #ffffff !important;
      color: $color-text !important;
    }
    &.active {
      background-color: #ffffff !important;
      color: $color-text !important;
    }
  }
}
</style>
