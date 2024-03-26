<template>
  <div class='mining-pc-wrap'>
    <div class='top-content' :class="{ru: isRu}">
      <div class="release-at" v-if='totalAt'>
        {{$t('m.home.releaseAT')}}{{totalAtFormat}}
      </div>
      <div class="everyday-at">
        {{$t('m.home.everyDayAt',{date: date ,mining:mining})}}
      </div>
    </div>
    <div class="pc_mining-wrap">
      <mining v-if="computingPower && computingPower.length"></mining>
    </div>
    <div class='block-list flex jcsb'>
      <div class='block-item' v-for='(v,i) in minedBlock' :key='i'>
        <block-mined v-if='i<3' :height='blockHeight(v,250)' :v='v' :i='i' />
        <block-mining v-else :height='blockHeight(v,250)' :v='v' :i='i' />
      </div>
    </div>
  </div>
</template>

<script>
import blockMined from './block-mined'
import blockMining from './block-mining'
import miningMixin from '../mixins/mining-mixin'
import Mining from './mining-block'
import lang from '@/utils/lang-utils'
export default {
  mixins: [miningMixin],
  data() {
    return {
      isRu: lang.isRu,
      date: (() => {
        const time = '1541520000000'
        const dateTime = new Date().getTime()
        if (dateTime < time) {
          return '(2018/11/6)'
        } else {
          return '(2018/11/6-2019/3/6)'
        }
      })(),
      mining: (() => {
        const time = '1541520000000'
        const dateTime = new Date().getTime()
        if (dateTime < time) {
          return '262,500'
        } else {
          return '175,000'
        }
      })()
    }
  },
  // computed: {
  //   date() {
  //     const time = '1541520000000'
  //     const dateTime = new Date().getTime()
  //     if (dateTime < time) {
  //       return '(2018/11/6)'
  //     } else {
  //       return '(2018/11/6-2019/3/6)'
  //     }
  //   },
  //   mining() {
  //     const time = '1541520000000'
  //     const dateTime = new Date().getTime()
  //     if (dateTime < time) {
  //       return '262,500'
  //     } else {
  //       return '175,000'
  //     }
  //   }
  // },
  components: {
    blockMined,
    blockMining,
    Mining,
  },
}
</script>

<style lang='scss' scoped>
$color-gray: #a19aa8;

.mining-pc-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //align-items: center;
  height: 400px;
  .top-content {
    color: $color-gray;
    font-size: 13px;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &.ru {
      margin-left: 90px;
    }
  }
  .block-list {
    width: 100%;
    align-items: flex-end;
    display: none;
    .block-item {
      width: 22%;
    }
  }
  .release-at {
    margin-right: 30px;
    position: relative;
    &:after {
      content: '';
      background-color: #999999;
      position: absolute;
      width: 1px;
      height: 9px;
      top: 3px;
      right: -17px;
    }
  }
}

@media (max-width: 1050px) {
  .pc_mining-wrap {
    display: none;
  }
  .block-list {
    display: flex !important;
  }
}
</style>
