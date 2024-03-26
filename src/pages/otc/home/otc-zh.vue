<template>
  <div class="page-wrap">
    <!-- <img src="https://i.riostox.com/i/48/48ee92dbb3192f353fe7e30407e716e3.png" class="not-found">
    <p class="text">暂不支持该服务</p> -->
    <div class='banner-wrap'>
      <buy-button class='buy-button' />
    </div>
    <div class='section-wrap'>
      <h3>交易流程</h3>
      <div class='step-wrap'>
        <div v-for='(v,i) in stepList' :key='i' class='step-item-wrap'>
          <img class='step-item-img' :src="v.stepImg" alt="">
          <div class="hide-h5">
            <img class='step-item-text ' :src="v.stepTextImg" alt="">
            <p>{{v.text}}</p>
          </div>
          <div class='text-p-wrap show-h5'>
            <img class='step-item-text' :src="v.stepTextImgH5" alt="">
            <p>{{v.text}}</p>
          </div>
        </div>
      </div>
      <div class="more">
        <span class='fb'>更多帮助</span>
        <a target='_blank' href='https://help.riostox.com/hc/zh-cn/articles/360004897392-新用户如何投资数字货币'>新用户如何投资数字货币？</a>
        <a class='last-a' target='_blank' href='https://help.riostox.com/hc/zh-cn/articles/360004992211-如何购买USDT'>如何购买USDT？</a>
        <span class="desc">实时汇率，实际结算汇率以充值结算时汇率为准</span>
      </div>
    </div>
    <div class="section-wrap">
      <div class='bottom-wrap'>
        <div v-for='(v,i) in bottomList' :key='i' class="bottom-item">
          <div class="hide-h5">
            <img :src="v.img" alt="">
            <p class='fb'>{{v.text}}</p>
          </div>
          <div class='bottom-item-wrap show-h5'>
            <img :src="v.img" alt="">
            <p class='fb'>{{v.text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import buyButton from '../components/buy-button'
export default {
  data() {
    return {
      isCN: this.$fifth.lang == 'zh-CN',
      stepList: [{
        stepImg: 'https://i.riostox.com/i/ca/cad664889b1f64986df5845a8af1f60c.png',
        stepTextImg: 'https://i.riostox.com/i/53/53bf42aa2daeac8d2fbfc775869d782e.png',
        stepTextImgH5: 'https://i.riostox.com/i/74/743e5a790c63c52a7982f130e8773da6.png',
        text: '请提供您在Riostox的注册账号（Email）和希望购买的USDT金额，认证商家会提供当前USDT的汇率，在您确认后可以进行汇款。'
      },
      {
        stepImg: 'https://i.riostox.com/i/4f/4f482c220cf6ab080a61358ee86862b9.png',
        stepTextImg: 'https://i.riostox.com/i/bb/bbc82de2206a82be8a82c28b05309650.png',
        stepTextImgH5: 'https://i.riostox.com/i/09/09625d78e47a4bb69724465b41f1ee41.png',
        text: '可以通过银行卡进行转账，转账请备注您在Riostox的注册账户（Email），完成后请发送转账截图给认证商户。'
      },
      {
        stepImg: 'https://i.riostox.com/i/a4/a4940b85da89e1488b62078d47901a92.png',
        stepTextImg: 'https://i.riostox.com/i/78/7892f25654e82be1d4471dce82d92bce.png',
        stepTextImgH5: 'https://i.riostox.com/i/da/dad8416136f54b2a532f53092f0d6711.png',
        text: '认证商家在收到汇款后，会直接将USDT划转到您的Riostox账户里。（一般15分钟内到账）'
      }
      ],
      bottomList: [{
        img: 'https://i.riostox.com/i/40/40b7f701f2cb3b068ac2baa45a495f6c.png',
        text: '市场一口价'
      },
      {
        img: 'https://i.riostox.com/i/47/4731c2b95c9c1eb5f9106db8e4bf9380.png',
        text: '完全免手续费'
      },
      {
        img: 'https://i.riostox.com/i/7d/7d73741ca3a063d46fa6dd4e218fd3b6.png',
        text: '即时成交'
      },
      {
        img: 'https://i.riostox.com/i/73/7336600f9428bbd85e95212e5953e6ab.png',
        text: '平台担保'
      },
      ]
    }
  },
  components: {
    buyButton,
  },
  created() {
    this.getOtc()
  },
  methods: {
    ...mapActions('otc', ['getOtc']),
  }
}
</script>

<style lang="scss" scoped>

.not-found {
  display: block;
  margin: 150px auto 50px;
  width: 452px;
  height: 329px;
}

.text {
  margin-bottom: 100px;
  text-align: center;
  font-size: 18px;
  color: #999999;
}

.hide-h5 {
  display: block;
}

.show-h5 {
  display: none;
}

.page-wrap {
  background: #f6f6f6;
  overflow: hidden;
  padding-bottom: 70px;
  .banner-wrap {
    background: url('https://i.riostox.com/i/be/be3b24366fff696eca0359c71932c8c3.png') no-repeat;
    background-size: 100%;
    margin: 20px auto 0;
    width: 1200px;
    height: 242px;
    padding-top: 144px;
    .banner {
      width: 100%;
    }
  }
  .section-wrap {
    width: 1200px;
    margin: 20px auto 0;
    border: 1px solid #eaedf5;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);
    background-color: #ffffff;
    border-radius: 4px;
  }
  h3 {
    text-align: center;
    margin-top: 25px;
    font-size: 16px;
    color: #333333;
  }
  .step-wrap {
    display: flex;
    justify-content: space-between;
    margin: 0 60px;
    .step-item-wrap {
      width: 252px;
      .step-item-img {
        width: 120px;
        display: block;
        margin: 40px auto 20px;
      }
      .step-item-text {
        width: 252px;
      }
      p {
        font-size: 13px;
        margin-top: 25px;
        // font-family: 'PingFang SC';
        color: #666666;
        line-height: 18px;
      }
    }
    .step-item-wrap:nth-last-of-type(1) .step-item-text {
      width: 90px;
    }
  }
  .more {
    margin: 60px 0 40px 70px;
    position: relative;
    span {
      color: #333333;
      font-size: 14px;
      margin-right: 20px;
    }
    a {
      color: #8ba3bb;
      font-size: 14px;
    }
    .last-a,
    .desc {
      margin-left: 32px;
      position: relative;
    }
    .desc {
      color: #666666;
    }
    .last-a:before,
    .desc:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 8px;
      background-color: #8ba3bb;
      position: absolute;
      left: -20px;
      top: 7px;
    }
  }
  .bottom-wrap {
    .bottom-item {
      position: relative;
      margin: 40px 0;
      display: inline-block;
      text-align: center;
      width: 25%;
      img {
        height: 50px;
      }
      p {
        margin-top: 20px;
        font-size: 18px;
        color: #333333;
      }
    }
    .bottom-item:nth-of-type(1):before {
      content: none;
    }
    .bottom-item:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 80px;
      background-color: #efefef;
      position: absolute;
      left: 0;
      top: 10px;
    }
  }
}

@include screen-h5-new() {
  .hide-h5 {
    display: none;
  }
  .show-h5 {
    display: block;
  }
  .page-wrap {
    background: #ffffff;
    .banner-wrap {
      background: url('https://i.riostox.com/i/d3/d37744fc88f9ecdbbbbeacb972588551.png') center center no-repeat;
      background-size: auto 100%;
      margin: 0;
      width: 100%;
      height: 220px;
    }
    .section-wrap {
      width: unset;
      overflow: hidden;
      margin: 0;
      border: 0;
      box-shadow: none;
      border-radius: 0;
    }
    h3 {
      color: #666666;
      text-align: left;
      font-weight: 400;
      font-size: 16px;
      margin: 20px 25px 25px;
    }
    .step-wrap {
      display: block;
      // justify-content: space-between;
      margin: 0;
      .step-item-wrap {
        width: 290px;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .step-item-img {
          width: 60px;
          height: 60px;
          margin: 0;
          margin-right: 30px;
          margin-top: -20px;
          display: block;
        }
        .text-p-wrap {
          .step-item-text {
            width: auto;
            height: 18px;
          }
          p {
            margin: 0;
            margin-top: 5px;
            color: #666666;
            font-size: 12px;
            font-family: regular;
          }
        }
      }
      .step-item-wrap:nth-last-of-type(1) .step-item-text {
        width: auto;
      }
    }
    .more {
      margin: 20px 20px 0 20px;
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;
      padding: 14px 0;
      span {
        color: #000000;
        font-size: 12px;
        margin-right: 10px;
        line-height: 20px;
      }
      a {
        display: block;
        color: #8ba3bb;
        font-size: 12px;
        line-height: 20px;
      }
      .last-a,
      .desc {
        margin-left: 0;
        position: relative;
      }
      .desc {
        display: none;
      }
      .last-a:before,
      .desc:before {
        content: '';
        display: none;
      }
    }
    .bottom-wrap {
      margin: 15px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .bottom-item {
        background: #f9f8fb;
        width: 160px;
        height: 100px;
        margin-top: 0;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        .bottom-item-wrap {
          display: inline-block;
          text-align: center;
          img {
            display: inline-block;
            height: 38px;
          }
          p {
            color: #6e679a;
            margin-top: 13px;
            font-size: 14px;
          }
        }
      }
      .bottom-item:nth-of-type(1):before {
        content: none;
      }
      .bottom-item:before {
        content: '';
        display: none;
      }
    }
  }
}
</style>
