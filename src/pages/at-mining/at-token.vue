<template>
  <div class='wrap'>
    <v-chart></v-chart>
    <main class="main">
      <section>
        <div class="title europaBold">
          {{$t('m.aboutAt.whatAt')}}
        </div>
        <p>
          {{$t('m.aboutAt.whatAtDesc')}}
        </p>
      </section>
      <section>
        <div class="title europaBold">
          {{$t('m.aboutAt.atBenefits')}}
        </div>
        <p>
          {{$t('m.aboutAt.atBenefitsDesc')}}
        </p>
        <div class="desc">
          <div>
            {{$t('m.aboutAt.benefitsOne')}}
          </div>
          <div>
            {{$t('m.aboutAt.benefitsTwo')}}
          </div>
          <div>
            {{$t('m.aboutAt.benefitsThree')}}
          </div>
        </div>
      </section>
      <section>
        <div class="title europaBold">
          {{$t('m.aboutAt.atAllocation')}}
        </div>
        <div class="chart">
          <img :src="chartImg" alt="atchart" width="100%">
        </div>
        <div class="text">
          <p>{{$t('m.aboutAt.atAllocationOne')}}</p>
          <p>{{$t('m.aboutAt.atAllocationTwo')}}</p>
          <p>{{$t('m.aboutAt.atAllocationThree')}}</p>
        </div>
      </section>
      <section>
        <div class="title subDiv europaBold">
          <i class="ball"></i>{{$t('m.aboutAt.tom')}}
        </div>
        <p class="europaRegilar">
          {{$t('m.aboutAt.tomDesc')}}
        </p>
        <p class="europaRegilar">{{$t('m.aboutAt.tomSubDesc')}}</p>
        <div class="subtitle">
          {{$t('m.aboutAt.release')}}
        </div>
        <p>{{$t('m.aboutAt.releaseDesc')}}</p>
        <table>
          <thead>
            <tr>
              <th>{{$t('m.aboutAt.period')}}</th>
              <th>{{$t('m.aboutAt.dates')}}</th>
              <th>{{$t('m.aboutAt.atAmount')}}</th>
              <th>{{$t('m.aboutAt.totalPercent')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{{$t('m.aboutAt.datesRow1')}}</td>
              <td>{{$t('m.aboutAt.amountRow1')}}</td>
              <td>20%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>{{$t('m.aboutAt.datesRow2')}}</td>
              <td>{{$t('m.aboutAt.amountRow2')}}</td>
              <td>10%</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{{$t('m.aboutAt.datesRow3')}}</td>
              <td>{{$t('m.aboutAt.amountRow3')}}</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>4</td>
              <td>{{$t('m.aboutAt.datesRow4')}}</td>
              <td>{{$t('m.aboutAt.amountRow4')}}</td>
              <td>2.5%</td>
            </tr>
            <tr>
              <td>5</td>
              <td>{{$t('m.aboutAt.datesRow5')}}</td>
              <td>{{$t('m.aboutAt.amountRow5')}}</td>
              <td>1.25%</td>
            </tr>
            <tr>
              <td>6</td>
              <td>{{$t('m.aboutAt.datesRow6')}}</td>
              <td>{{$t('m.aboutAt.amountRow6')}}</td>
              <td>1.25%</td>
            </tr>
            <tr class="total">
              <td></td>
              <td>{{$t('m.aboutAt.datesRow7')}}</td>
              <td>{{$t('m.aboutAt.amountRow7')}}</td>
              <td>40%</td>
            </tr>
          </tbody>
        </table>
        <p class="europaRegilar">{{$t('m.aboutAt.releaseRule')}}</p>
        <p class="small">{{$t('m.aboutAt.releaseRuleDesc')}}</p>
        <template v-if="!isCN">
          <p class="small">{{$t('m.aboutAt.releaseRuleDesc2')}}</p>
          <p class="small">{{$t('m.aboutAt.releaseRuleDesc3')}}</p>
          <p class="small">{{$t('m.aboutAt.releaseRuleDesc4')}}</p>
          <p class="small">{{$t('m.aboutAt.releaseRuleDesc5')}}</p>
        </template>
        <div class="subtitle europaBold">
          {{$t('m.aboutAt.distribution')}}
        </div>
        <p class="europaRegilar">{{$t('m.aboutAt.distributionDescOne')}} </p>
        <p class="text-after">{{$t('m.aboutAt.distributionDescTwo')}}</p>
      </section>
      <section>
        <div class="title subDiv europaBold">
          <i class="ball"></i>{{$t('m.aboutAt.reward')}}
        </div>
        <p class="more">{{$t('m.aboutAt.rewardDesc')}}
        </p>
      </section>
      <section>
        <div class="title subDiv europaBold">
          <i class="ball"></i>{{$t('m.aboutAt.simultaneousReleaseTitle')}}
        </div>
        <p class="more">{{$t('m.aboutAt.simultaneousReleaseDesc1')}}
        </p>
        <p class="more">{{$t('m.aboutAt.simultaneousReleaseDesc2')}}
        </p>
      </section>
      <section>
        <div class="title subDiv europaBold">
          <i class="ball"></i>{{$t('m.aboutAt.investors')}}
        </div>
        <p class="more">{{$t('m.aboutAt.investorsDesc')}}
        </p>
        <p class="lock-address">
          <a :href="isCN?'https://help.riostox.com/hc/zh-cn/articles/360013426712?flash_digest=81d671f178ee3b83b41cc46c74504652e602f70c':'https://help.riostox.com/hc/en-us/articles/360013426712-AT-Smart-Contract-Address-and-AT-Lock-up-Address-for-Investors-and-the-Team?flash_digest=81d671f178ee3b83b41cc46c74504652e602f70c'" target="_blank">{{$t('m.aboutAt.atLockAddress')}}</a>
        </p>
      </section>
    </main>
  </div>
</template>

<script>

import VChart from './chart'
import chartCN from '../../assets/images/at-chart-zn.png'
import chartEN from '../../assets/images/at-chart-en.png'

export default {
  components:{
    VChart
  },
  computed: {
    isCN() {
      return this.$fifth.isCn
    },
    chartImg() {
      return this.isCN ? chartCN : chartEN
    },
  },
}
</script>

<style lang='scss' scoped>
.wrap {
  background-color: #fafafa;
  .main {
    position: relative;
    z-index: $zindex-newspace;
    background-color: #fafafa;
    border-radius: 4px;
    color: #0f0f1d;
    width: 1040px;
    margin: 0 auto;
    padding: 60px 0;
    section {
      margin-bottom: 50px;
      .title {
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        margin-bottom: 10px;
        color: #5750be;
      }
      .subDiv {
        color: #0f0f1d;
        .ball {
          display: block;
          width: 26px;
          height: 26px;
          float: left;
          border-radius: 50%;
          background-color: #5750be;
          margin-top: 3px;
          margin-right: 20px;
          background-image: url(../../assets/images/at-ball.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .subtitle {
        font-size: 18px;
        line-height: 25px;
        font-weight: 500;
        margin: 30px 0 10px;
      }
      p {
        font-size: 15px;
        line-height: 20px;
      }
      .chart {
        margin: 25px 0;
      }
      .desc {
        margin: 39px 0 50px;
        display: flex;
        justify-content: space-between;
        div {
          width: 260px;
          // height: 140px;
          background-color: #edf0f8;
          border-radius: 4px;
          padding: 24px;
          font-size: 13px;
          line-height: 17px;
        }
      }
      .more {
        line-height: 26px;
      }
      .text {
        p {
          display: block;
          margin-bottom: 7px;
        }
      }
      .small {
        font-size: 12px;
        line-height: 17px;
        color: #666666;
        display: block;
        margin-top: 7px;
      }
      .text-after {
        display: inline-block;
        margin-top: 7px;
      }
      table {
        margin: 23px 0 29px;
        border-collapse: collapse;
        width: 100%;
        tr {
          width: 100%;
          height: 60px;
        }
        thead {
          tr {
            background-color: #f5f6fa;
            font-size: 18px;
            // line-height: 60px;
          }
          th {
            text-align: center;
          }
        }
        tbody {
          tr {
            border: 1px solid #f5f6fa;
            border-top: none;
            font-size: 16px;
            line-height: 60px;
          }
          td {
            text-align: center;
          }
          .total {
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
      .lock-address {
        margin-top: 10px;
        a {
          color: #88a0b8;
        }
      }
    }
  }
}

// @include screen-xs() {
//   .main {
//     width: 100%;
//     padding: 10px 30px;
//     section {
//       margin-bottom: 20px !important;
//       .title {
//         font-size: 14px !important;
//       }
//       p {
//         font-size: 12px !important;
//       }
//       .chart {
//         margin: 10px 0 !important;
//       }
//       .subDiv {
//         .ball {
//           margin-top: 9px !important;
//           margin-right: 8px !important;
//           width: 14px !important;
//           height: 14px !important;
//         }
//       }
//       .subtitle {
//         font-size: 12px !important;
//         margin: 20px 0 10px !important;
//       }
//       table {
//         thead {
//           tr {
//             font-size: 12px !important;
//           }
//         }
//         tbody {
//           tr {
//             font-size: 12px !important;
//             height: 30px !important;
//             line-height: 30px !important;
//           }
//         }
//       }
//     }
//     .desc {
//       margin: 10px 0 10px !important;
//       display: block !important;
//       div {
//         width: 100% !important;
//         background-color: #edf0f8;
//         border-radius: 4px;
//         padding: 24px;
//         font-size: 13px;
//         line-height: 17px;
//         margin-bottom: 10px;
//       }
//     }
//   }
// }

// @include screen-sm() {
//   .main {
//     width: 100%;
//     padding: 90px 140px;
//     .desc {
//       margin: 39px 0 50px;
//       display: block !important;
//       div {
//         width: 100% !important;
//         background-color: #edf0f8;
//         border-radius: 4px;
//         padding: 24px;
//         font-size: 13px;
//         line-height: 17px;
//         margin-bottom: 10px;
//       }
//     }
//   }
// }

// @include screen-md() {
//   .main {
//     width: 100%;
//     padding: 60px 0;
//   }
// }

// @include screen-lg() {
//   .main {
//     width: 1100px;
//     margin: 0 auto;
//     padding: 60px 0;
//   }
// }
</style>
