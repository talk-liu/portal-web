<template>
  <div class="list">
    <router-link
      :to="$i18nRoute({path:`/pro/markets/${item.marketId}`})"
      v-for="(item, idx) in list"
      :key="item.id"
      class="list-item"
    >
      <ul :class="[idx < 3 && pos === 'left' && extype === 'common' ? `top top-${idx}` : '']">
        <li class="icon-wrap">
          <div
            class="icon"
            :style="{backgroundImage:`url(https://i.riostox.com/img/currency/${item.base_unit}.png)`}"
          ></div>
        </li>
        <li class="name-wrap space">
          <div class="name">{{item.name}}</div>
          <div class="total">{{item.volume | thousands}}</div>
        </li>
        <template v-if="type !== 'h5'">
          <li class="data-wrap space">
            <div :class="['change', item.changePercent < 0 ? 'down' : 'up']">{{item.changePercent}}%</div>
            <div>
              <span :class="['last', item.changePercent < 0 ? 'down' : 'up']">{{item.last}}</span>
              <span class="price">{{lastLegal(item)}}</span>
            </div>
          </li>
          <li class="chart-wrap">
            <chart-k
              :market="marketsKData[item.base_unit + item.quote_unit] || []"
              :bidFixed="item.bid_fixed"
              :marketId="item.marketId"
              :side="item.isUp ? 'up':'down'"
              class="chart"
              :class="item.isUp ? 'up':'down'"
            ></chart-k>
          </li>
        </template>
        <template v-else>
          <li class="price-wrap space">
            <div :class="['last', item.changePercent < 0 ? 'down' : 'up']">{{item.last}}</div>
            <div class="price">{{lastLegal(item)}}</div>
          </li>
          <li class="change-wrap space">
            <div :class="['change', item.changePercent < 0 ? 'down' : 'up']">{{item.changePercent}}%</div>
          </li>
        </template>
      </ul>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import totalMoeny from '@/mixins/total-money'
import ChartK from '@/components/chart-k'

export default {
  props: ['list', 'pos', 'marketsKData', 'extype'],
  mixins: [totalMoeny],
  computed: {
    ...mapGetters('viewport', ['type']),
  },
  components: {
    ChartK,
  },
}
</script>

<style lang="scss" scoped>
.list {
  a {
    display: block;
  }
  ul {
    position: relative;
    display: flex;
    width: 100%;
    padding: 20px 40px;
    background: #fafafa;
    margin-bottom: 15px;
    font-size: 15px;
    line-height: 18px;
    font-family: dinMedium;
    border: 1px solid #fafafa;
    &:hover {
      border: 1px solid #ffd200;
    }
    &.top {
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 0;
        height: 0;
        border-width: 15px;
        border-color: #1d1f3a transparent transparent #1d1f3a;
        font-size: 0;
        line-height: 0;
        border-style: solid;
      }
      &:after {
        position: absolute;
        top: 2px;
        left: 4px;
        color: #ffd200;
        font-size: 13px;
        font-family: euBold;
        font-weight: 500;
      }
    }
    &.top-0 {
      &:after {
        content: '1';
      }
    }
    &.top-1 {
      &:after {
        content: '2';
      }
    }
    &.top-2 {
      &:after {
        content: '3';
      }
    }
    .space {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .icon-wrap {
      width: 40px;
      .icon {
        height: 40px;
        width: 40px;
        background-size: 100% 100%;
      }
    }
    .name-wrap {
      padding-left: 20px;
      flex: 1;
      .name {
        color: #0f0f1d;
        font-size: 18px;
        line-height: 24px;
        font-family: euBold;
      }
      .total {
        font-size: 14px;
        line-height: 17px;
        color: rgba($color: #0f0f1d, $alpha: 0.5);
      }
    }
    .data-wrap {
      flex: 1;
      .change {
        font-family: 'dinBold';
        font-size: 16px;
        line-height: 19px;
        font-weight: 500;
      }
      .last {
        font-size: 14px;
        line-height: 17px;
      }
      .price {
        font-size: 14px;
        line-height: 13px;
        color: rgba($color: #0f0f1d, $alpha: 0.5);
        margin-left: 10px;
      }
    }
    .chart-wrap,
    .chart {
      width: 160px;
      height: 31px;
      text-align: right;
    }
    .chart {
      margin-top: 9px;
    }
    .up {
      color: $buy-color;
    }
    .down {
      color: $sell-color;
    }
  }
}

@include screen-h5-new() {
  .list {
    ul {
      font-size: pxtovw(12px);
      line-height: pxtovw(15px);
      .icon-wrap {
        width: pxtovw(30px);
        .icon {
          height: pxtovw(30px);
          width: pxtovw(30px);
          background-size: 100% 100%;
        }
      }
      .name-wrap {
        padding-left: pxtovw(10px);
        .name {
          font-size: pxtovw(12px);
          line-height: pxtovw(15px);
        }
        .total {
          font-size: pxtovw(10px);
          line-height: pxtovw(13px);
        }
      }
      .price-wrap {
        flex: 1;
        .price {
          color: rgba($color: #0f0f1d, $alpha: 0.5);
          font-size: pxtovw(10px);
          line-height: pxtovw(13px);
        }
      }
      .change-wrap {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>


