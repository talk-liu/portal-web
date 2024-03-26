<template>
  <v-dialog :visible="visible">
    <div class="order-confirm-wrap">
      <div class="header">
        <h4 class="regular">{{$t('m.exchange.confirmTitle')}}</h4>
        <i class="iconfont icon-guanbi" @click="()=>{this.$emit('close')}"></i>
      </div>
      <div class="content">
        <div class="desc">
          {{descText}}
        </div>
        <div class="info">
          <div>
            <p>{{$t('m.exchange.confirmTrading')}}{{info.name}}</p>
            <p>{{priceText}}<span class="num">{{info.price}}</span> {{info.quote_unit}}</p>
            <p>{{$t('m.exchange.confirmMarketPrice')}}<span class="num">{{info.lastPrice}}</span> {{info.quote_unit}}</p>
          </div>
          <div>
            <p>{{$t('m.exchange.confirmCount')}}{{info.count}}</p>
            <p>{{$t('m.exchange.confirmTotal')}}{{info.total}} {{info.quote_unit}}</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <button @click="()=>{this.$emit('close')}">{{$t('m.exchange.cancelBtn')}}</button>
        <button @click="()=>{this.$emit('confirm')}">{{$t('m.exchange.confirmBtn')}}</button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VDialog from '@/components/dialog'

export default {
  components: {
    VDialog,
  },
  props: ['visible', 'type', 'info', 'orderType'],
  computed: {
    descText() {
      if (this.type === 'low') {
        return this.$t('m.exchange.confirmLowDesc')
      } else {
        return this.$t('m.exchange.confirmHighDesc')
      }
    },
    priceText() {
      if (this.orderType === 'buy') {
        return this.$t('m.exchange.confirmOrderBuyPrice')
      } else {
        return this.$t('m.exchange.confirmOrderSellPrice')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.order-confirm-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 5px;
  // padding: 20px 40px;
  .header {
    background-color: #fff;
    border-bottom: 1px solid #d8d8d8;
    border-radius: 5px 5px 0 0;
    height: 70px;
    line-height: 70px;
    text-align: center;
    position: relative;
    h4 {
      display: inline-block;
      font-size: 24px;
      color: #333333;
      font-weight: 400;
      text-align: center;
    }
    i {
      font-size: 20px;
      float: right;
      line-height: 36px;
      color: #333333;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 17px;
    }
  }
  .content {
    padding: 0 40px;
    .desc {
      color: #333333;
      font-size: 15px;
      line-height: 26px;
      margin: 28px 0 24px 0;
    }
    .info {
      display: flex;
      div {
        flex: 1;
        font-size: 13px;
        line-height: 18px;
        color: #333333;
        .num {
          color: #ee4343;
        }
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
  .footer {
    height: 50px;
    margin: 35px 0;
    padding: 2px 40px;
    display: flex;
    justify-content: space-between;
    button {
      display: inline-block;
      width: 180px;
      height: 46px;
      line-height: 46px;
      border: none;
      color: #333333;
      font-size: 18px;
      border-radius: 3px;
      text-align: center;
      cursor: pointer;
      &:nth-child(1) {
        border: 1px solid #bdc7d1;
        color: #97a5b3;
      }
      &:nth-child(2) {
        background-color: #07e9b2;
      }
    }
  }
}
</style>
