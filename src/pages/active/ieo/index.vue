<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="menaPay" v-if="current_ieo">
    <div class="top" >
      <div class="ieo-banner" v-bind:style="{backgroundImage:'url(' + poster_img_url + ')'}">
        <div class="content">
          <div class="title">
            <p class="ieo-icon">
              <img :src="ieo_active.active_img_url"/>
            </p>
            <p class="ieo-title">{{active_title}}</p>
            <span class="soldout" :style="{backgroundImage: 'url(' + soldOutIcon + ')'}" v-if="soldOut"></span>
          </div>
          <div class="desc-text" v-html="first_ico_excitation"></div>
          <div class="ieo-support">
            <div class="cur-support">
              {{langText.curSupportText}}
              <span
                class="fs20"
              >{{ ieoRspVo.amount | formateNumber }}</span>
              <span>{{ieo_active.currency}}</span>
            </div>
            <div class="cur-total-finish">
              <p
                class="cur-total-support"
              >{{ ieoRspVo.saleNum | formateNumber }} / {{ ieoRspVo.amount | formateNumber }} {{ieo_active.currency}}</p>
              <p class="cur-finish">
                <span class="fs16">{{sale_rate}}%</span>
                {{langText.sold}}
              </p>
            </div>
            <div class="support-process">
              <div class="percent-process" :style="{width: `${sale_rate}%`}">
                <p class="total-process"></p>
              </div>
            </div>
            <div class="support-people">
              <p v-show="false">{{ ieoRspVo.manNum | formateNumber }} {{langText.participants}}</p>
              <p class="smallCountDown">{{langText.surplus}} {{day}} {{langText.day}} {{hour}} {{langText.hour}} {{min}} {{langText.min}}
                {{sec}} {{langText.sec}} （UTC+8）</p>
            </div>
          </div>
          <!--          <a href="javascript:;" class="support-btn" :class="{'active': canClick}" @click="toSupport">{{soldOut ? langText.soldOut : langText.toSupport(ieo_active.active_token)}}</a>-->
        </div>
      </div>
      <ieoform class="ieo-form" :isStart="isStart" :isEnd="isEnd" :langText="langText"></ieoform>
    </div>

    <div class="ieo-instruction">
      <ul class="content">
        <li>
          <p class="list-title">{{langText.information}}</p>
          <p class="list-desc" v-html="active_intro"></p>
          <p class="ieo-link">
            <a :href="ieo_active.website" target="_blank">{{langText.website}}</a>
            <a
              :href="ieo_active.white_paper"
              target="_blank"
            >{{langText.whitePaper}}</a>
          </p>
        </li>
        <li>
          <p class="list-title">{{langText.baseInfo}}</p>
          <dl class="ieo-info">
            <dd>
              <p class="ddl">{{langText.fahangTime}}</p>
              <p class="ddr">{{fahang_time}}</p>
            </dd>
            <dd>
              <p class="ddl">{{langText.fahangTotal}}</p>
              <p class="ddr">{{fahang_total}}</p>
            </dd>
            <dd>
              <p class="ddl">{{langText.fahangPrice}}</p>
              <p class="ddr" v-html="fahang_price">
              </p>
            </dd>
            <dd>
              <p class="ddl">{{langText.social}}</p>
              <div class="ddr">
                <template v-for="(item, index) in ieo_active.links">
                  <a class="color3" :href="item" target="_blank" :key="index" v-if="item">
                    <i class="iconfont " :class="'icon-' + index"></i>
                  </a>
                </template>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>

    <v-dialog :visible="maskshow">
      <div class="suport-box">
        <div class="title color3">
          <span class="close" @click="maskshow = false">
            <i class="iconfont icon-guanbi"></i>
          </span>
          <span>{{langText.toSupport(ieo_active.active_token)}}</span>
        </div>
        <div class="content">
          <p class="color3 bold">{{langText.myInfo}}</p>
          <p class="color6">{{langText.account}}：{{currentUser && currentUser.email}}</p>
          <p class="color3 bold mgt20">{{langText.bonus}}</p>
          <p class="color3 bold" v-html="first_ico_excitation"></p>
          <p class="color3 bold mgt20">{{langText.depositAddress((ieo_active.recharge_currency))}}</p>
          <p class="color3 bold">{{ieo_active.pay_site_address}}</p>
          <p class="color6" v-html="remark"></p>
        </div>
        <div class="btn-box">
          <a
            class="copySite"
            href="javascript:;"
            v-clipboard:copy="ieo_active.pay_site_address"
            v-clipboard:success="onCopy"
          >{{langText.copyBtn(ieo_active.currency)}}</a>
          <a class="cancel" href="javascript:;" @click="maskshow = false">{{langText.cancelBtn}}</a>
        </div>
      </div>
    </v-dialog>
    <piechart class="piechart" :token_allocation_chart='token_allocation_chart'/>
    <div class="down-time">
      <div class="countdown">
        {{langText.endTime}}&nbsp;&nbsp;
        <span class="date-num">{{day}}</span>
        <span class="date-desc">{{langText.day}}</span>
        <span class="date-num">{{hour}}</span>
        <span class="date-desc">{{langText.hour}}</span>
        <span class="date-num">{{min}}</span>
        <span class="date-desc">{{langText.min}}</span>
        <span class="date-num">{{sec}}</span>
        <span class="date-desc">{{langText.sec}}</span>
        （UTC+8）
      </div>
      <div class="ieo-time">{{langText.activePeriod(activePeriod)}}</div>
    </div>
    <!--    <div class="note">-->
    <!--      <p>-->
    <!--        <strong>{{ langText.important_notes }}</strong>-->
    <!--      </p>-->
    <!--      <ul>-->
    <!--        <li v-for="item in important_notes" :key="item.name">-->
    <!--          <span class="circle"></span>-->
    <!--          <span class="notetip">{{ item.name }}</span>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </div>-->

  </div>
</template>

<script>
import enLang from './lang/en.js'
import zhLang from './lang/zh-CN.js'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
import find from 'lodash/find'
import Message from '@/utils/message'

import { mapState, mapActions } from 'vuex'
import cuontdown from '../mixins/countdown'
import VDialog from '@/components/dialog'
import piechart from '@/components/piechart'
import ieoform from '../buyieo/ieo-form'
import { BigNumber } from 'bignumber.js'

export default {
  mixins: [cuontdown],
  data() {
    let ieo_active = {}
    let ieo_item = {}
    let current_ieo = null
    let currency = this.$route.params.currency
    if (window.gon && window.gon.ieo_active) {
      ieo_item = window.gon.ieo_active
    } else {
      ieo_item = {
        'list': [
          {
            'start_date': '2019-10-20T04:00:00.000Z',
            'end_date': '2019-12-29T04:17:00.000Z',
            'currency': 'TSK',
            'active_token': 'TSK',
            'active_img_url': 'https://i.riostox.com/i/9d/9d0a9dacebc44ffce9e36cedf80bdc6a.jpeg',
            'active_intro_zh': '【独家首发】AIVIA是一个全球特许资产市场，它使各地的投资者能够通过分布式分类帐技术进行投资，实时评估投资资金和统计盈利能力数据，以提高信任水平。\n通过该平台，投资者将能够为项目融资，创建投资基金，投资组合投资，项目之间进行资产转移。 平台也链接多个中心化与去中心化交易所和支持智能订单，自动交易并确保交易策略基于历史数据。\nAIVIA平台是一个完整的兼容金融组织生态系统满足世界各地投资项目和投资者基本需求的服务。',
            'active_intro_en': 'AIVIA is a Global Marketplace for Tokenized Assets that empower investors from everywhere to invest via Distributed Ledger Technology with real time rating of investments funds and statistical profitability data to improve trust level.\nThrough the platform, investors will be able to finance projects, create investment funds, portfolio investment, transfer of assets between projects and benefit from multi exchange cryptocurrency trading through their Trader Terminal which supports placing smart orders, advanced automated trading and ensure trading strategies based on historical data.\nThe AIVIA platform is a complete ecosystem of compatible financial organizations and services that address the fundamental needs of investment projects and investors from anywhere around the world.',
            'active_title_zh': 'AIVIA 全球 IEO 首发（第二期）',
            'active_title_en': ' AIVIA Global IEO Launch',
            'total_support': 80000000,
            'cur_support': 8000000,
            'supported_people': 238,
            'pay_site_address': '0xA5924EF1D8C0d546df9a26ED86212817253C41ba',
            'links': {
              'facebook': 'https://www.facebook.com/aivia.io/',
              'tele': 'https://t.me/AIVIAeng',
              'twitter': 'https://twitter.com/aivia_io',
              'medium': 'https://medium.com/@aivia',
            },
            'website': 'https://aivia.io',
            'white_paper': 'https://aivia.io/docs/aivia-whitepaper-1.0.pdf',
            'first_ico_excitation_zh': '第一期已结束，第二期AIV将于4月20日 12:00（UTC+8）开始抢购',
            'first_ico_excitation_en': 'The second batch of aivs will be available at April 20th，12:00 (UTC+8) ',
            'fahang_time_zh': '2019年10月19日 12:00（UTC+8）',
            'fahang_time_en': '19th April 2019, 12:00 (UTC+ 8)',
            'fahang_total_zh': '8000万 AIV',
            'fahang_total_en': '80,000,000 AIV',
            'fahang_price_zh': '1000 AT = 7000 AIV（第一期）\n1000 AT = 6300 AIV（第二期）',
            'fahang_price_en': '1000 AT = 7000 AIV（The first phase）\n1000 AT = 6300 AIV（The second phase）',
            'activePeriod_zh': '2019年4月20日 12:00 至 4月21日 11:59（UTC+8）',
            'activePeriod_en': 'from 20th April 2019, 12:00 to 21th April 2019, 11:59（UTC+8）',
            'remark_zh': '1）把AT提到以上的AT地址参与AIV活动。\n2）额外添加 11 AT 至提现数量以用于手续费抵扣\n3）请勿把其他币种充到以上的地址\n4）仅限Riostox交易所内转出才能参与抢购',
            'remark_en': '1）Withdraw your AT to the above address to participate in AIV token sale. \n2）Add 11 AT to withdrawal amount for the fee.\n3）Do not send any other token. Only AT will be accepted\n4）Only transfer out of Riostox exchange can participate in the panic buying.',
            'recharge_currency': 'AT',
            'poster_img_url': 'https://i.riostox.com/i/9d/9d0a9dacebc44ffce9e36cedf80bdc6a.jpeg',
            // 'important_notes_en': [
            //   { 'name':'Users from USA are strictly not allowed to participate.' },
            //   { 'name':'Riostox is protected from unfair use of scripts to ensure fairness of IEO on Riostox HIVE for our users.' },
            //   { 'name':'You should be aware that cryptocurrencies are subject to high price-volatilities. You are solely responsible for determining whether any investment, investment strategy or related transaction is appropriate for you based on your investment objectives, financial circumstances and risk tolerance. Riostox reserves the right to rescind and terminate our services to users in countries and jurisdictions where relevant laws and regulations apply.' }
            // ],
            // 'important_notes_zh': [
            //   { 'name':'Users from USA are strictly not allowed to participate.' },
            //   { 'name':'Riostox is protected from unfair use of scripts to ensure fairness of IEO on Riostox HIVE for our users.' },
            //   { 'name':'You should be aware that cryptocurrencies are subject to high price-volatilities. You are solely responsible for determining whether any investment, investment strategy or related transaction is appropriate for you based on your investment objectives, financial circumstances and risk tolerance. Riostox reserves the right to rescind and terminate our services to users in countries and jurisdictions where relevant laws and regulations apply.' }
            // ],
            'token_allocation_chart_zh': '[{ "name": "自己发行", "value": "20" }, { "name": "机构发行", "value": "10" }, { "name": "riostox发行", "value": "30" }, { "name": "小机构发行", "value": "10" }, { "name": "其他发行", "value": "30" }]',
            'token_allocation_chart_en': '[{ "name": "自己发行", "value": "20" }, { "name": "机构发行", "value": "10" }, { "name": "riostox发行", "value": "30" }, { "name": "小机构发行", "value": "10" }, { "name": "其他发行", "value": "30" }]'
          },
          {
            'start_date': '2019-10-22T04:00:00.000Z',
            'end_date': '2019-12-15T16:00:00.000Z',
            'currency': 'MPAY',
            'active_token': 'mpay',
            'active_img_url': 'https://i.riostox.com/i/dd/dd76c60029bc507a575d1eee0f563df5.jpeg',
            'active_intro_zh': 'MenaPay是第一个基于区块链的非银行体系的数字货币支付途径。\n它植根于中东和北非地区，致力于建立全球最大的无现金社会。其目标市场人口超过4.4亿。其中84%是由于宗教信仰而不使用银行系统，并且迫切希望使用符合伊斯兰教标准的银行替代系统。 \nMenaPay为用户提供了安全高效并且去中心化的日常支付方案。\n通过数字化货币，MenaPay实现了超越传统银行方案的数字化改革。它将在中东和北非地区支持手机和在线支付，取代现金和货到付款系统。同时， MenaPay也将解决网络世界的盈利问题，帮助与MenaPay合作的企业增加收入。\n作为美元100%支持的稳定数字货币，MenaCash可用于日常交易。同时，最大的不同在于其经销商网络。用户可通过类似于珠宝店、货币兑换、书店和加油站一类的经销商充值MenaPay钱包。我们现已在中东和北非区域内超过4万个经销店设有站点，帮助实现货币的数字化改革。',
            'active_intro_en': 'MenaPay is the first blockchain based non-bank digital payment gateway for building one of the biggest cashless societies in the world. It focuses on the MENA region primarily. The target market has over 440 million people whom are 84% unbanked due to religious beliefs and are eager to use a trustable Islamic compliant alternative to the banking system. MenaPay allows users to transfer money within daily life in a secure, fast and decentralised way.\n\nThe are surpassing the banking solutions by creating a digital transformation in the region by digitalising cash. It will enable mobile and online payments in the region, replacing cash and cash-on-delivery systems. Additionally, they are solving the monetisation problem of the online world and helping to boost the revenue of businesses which are integrated with MenaPay.\n\nMenaPay has similar features with AliPay and WeChatPay including payment with QR code, barcode, merchant dashboards and integration APIs. Within MenaPay, \n\nMenaCash is used for the everyday transaction purposes as its stable cryptocurrency which is 100% backed by USD. On the other hand, the major difference comes with the reseller network. Users can top-up their MenaPay wallets through the resellers such as PC Cafes, Jewellery Shops, Exchange offices, book stores and gas stations. We’ve already reached over 40.000 reseller points in the region which will help the digital transformation of cash.',
            'active_title_zh': 'MenaPay 全球 IEO 首发',
            'active_title_en': ' MenaPay Global IEO Launch',
            'total_support': 10000000,
            'cur_support': 0,
            'supported_people': 10,
            'pay_site_address': '33zWeqhs2oNYMePzF789YDyV3hXVGJ6Np4',
            'links': {
              'facebook': 'https://www.facebook.com/menapayio',
              'instagram': 'https://www.instagram.com/menapay/',
              'tele': 'https://t.me/MenaPay',
              'youtube': 'https://www.youtube.com/channel/UC56eU1zaQh2S8k7TB4S2RjA',
              'bitcoin': 'https://bitcointalk.org/index.php?topic=4884588.0',
              'github': 'https://github.com/menapay/',
              'reddit1': 'https://www.reddit.com/r/MenaPay/',
              'twitter': 'https://twitter.com/menapayio',
              'medium': 'https://medium.com/menapay',
            },
            'website': 'www.menapay.io',
            'white_paper': 'https://menapay.docsend.com/view/pwjr8rt',
            'first_ico_excitation_zh': '购入前2,500,000个MPAY，将额外赠送20%个代币\n购入次2,500,000个MPAY，将额外赠送10%个代币',
            'first_ico_excitation_en': '1st 2,500,000 MPAY buyers will receive 20% bonus\nNext  2,500,000 MPAY buyers will receive 10% bonus',
            'fahang_time_zh': '2019年4月22日 12:00（UTC+8）',
            'fahang_time_en': '22th April 2019, 12:00 (UTC+ 8)',
            'fahang_total_zh': '4亿 MPAY',
            'fahang_total_en': '400M MPAY',
            'fahang_price_zh': '165 USDT = 1,000 MPAY（不含提币手续费）\n最低买入：165 USDT',
            'fahang_price_en': '165 USDT = 1,000 MPAY (excluding withdrawal fee)\nMinimum buy-in: 165 USDT',
            'activePeriod_zh': '2019年4月22日 12:00 至 5月15日 23:59（UTC+8）',
            'activePeriod_en': 'from 22th April 2019, 12:00 to 1riostox May 2019, 23:59（UTC+8）',
            'remark_zh': '1）把USDT提到以上的USDT地址参与MPAY活动。\n2）额外添加 5 USDT 至提现数量以用于手续费抵扣\n3）请勿把其他币种充到以上的地址\n4）仅限Riostox交易所内转出才能参与抢购',
            'remark_en': '1）Withdraw your USDT to the above address to participate in MPAY token sale. \n2）Add 5 USDT to withdrawal amount for the fee.\n3）Do not send any other token. Only USDT will be accepted\n4）Only transfer out of Riostox exchange can participate in the panic buying.',
            'recharge_currency': 'USDT',
            'poster_img_url': 'https://i.riostox.com/i/9d/9d0a9dacebc44ffce9e36cedf80bdc6a.jpeg',
          },
        ],
      }
    }
    if (ieo_item) {
      current_ieo = find(ieo_item.list, (data) => {
        return data.active_token.toLowerCase() === currency.toLowerCase()
      })
    }
    if (current_ieo) {
      ieo_active = current_ieo
    } else {
      this.$router.push({
        name: '404',
      })
    }
    return {
      account: '',
      maskshow: false,
      ieo_active,
      fahang_time: '',
      active_title: '',
      activePeriod: '',
      fahang_total: '',
      remark: '',
      active_intro: '',
      current_ieo,
      first_ico_excitation: '',
      isStart: false,
      isEnd: false,
      timer: null,
      poster_img_url: '',
      token_allocation_chart: '',
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapState('ieoInfo', ['ieoRspVo']),
    soldOutIcon() {
      return this.$fifth.lang.indexOf('zh') > -1 ? 'https://i.riostox.com/i/92/920cedc6f325548ead327c7308e28d2f.png' : 'https://i.riostox.com/i/d1/d11d1cc8fe04850ba43493b4de8bde9c.png'
    },
    soldOut() {
      // return this.ieo_active.cur_support >= this.ieo_active.total_support
      return this.ieoRspVo.amount <= this.ieoRspVo.saleNum
    },
    langText() {
      if (this.$fifth.lang.indexOf('zh') > -1) {
        this.active_title = this.ieo_active.active_title_zh
        this.fahang_time = this.ieo_active.fahang_time_zh
        this.activePeriod = this.ieo_active.activePeriod_zh
        this.fahang_total = this.ieo_active.fahang_total_zh
        this.fahang_price = this.ieo_active.fahang_price_zh && this.ieo_active.fahang_price_zh.replace(/\n/g, '<br/>')
        this.first_ico_excitation = this.ieo_active.first_ico_excitation_zh && this.ieo_active.first_ico_excitation_zh.replace(/\n/g, '<br/>')
        this.active_intro = this.ieo_active.active_intro_zh && this.ieo_active.active_intro_zh.replace(/\n/g, '<br/>')
        this.remark = this.ieo_active.remark_zh && this.ieo_active.remark_zh.replace(/\n/g, '<br/>')
        this.poster_img_url = this.ieo_active.poster_img_url
        // this.important_notes = this.ieo_active.important_notes_zh
        this.token_allocation_chart = this.ieo_active.token_allocation_chart_zh
        return zhLang
      } else {
        this.active_title = this.ieo_active.active_title_en
        this.fahang_time = this.ieo_active.fahang_time_en
        this.activePeriod = this.ieo_active.activePeriod_en
        this.fahang_total = this.ieo_active.fahang_total_en
        this.fahang_price = this.ieo_active.fahang_price_en && this.ieo_active.fahang_price_en.replace(/\n/g, '<br/>')
        this.first_ico_excitation = this.ieo_active.first_ico_excitation_en && this.ieo_active.first_ico_excitation_en.replace(/\n/g, '<br/>')
        this.active_intro = this.ieo_active.active_intro_en && this.ieo_active.active_intro_en.replace(/\n/g, '<br/>')
        this.remark = this.ieo_active.remark_en && this.ieo_active.remark_en.replace(/\n/g, '<br/>')
        this.poster_img_url = this.ieo_active.poster_img_url
        // this.important_notes = this.ieo_active.important_notes_en
        this.token_allocation_chart = this.ieo_active.token_allocation_chart_en
        return enLang
      }
    },
    ratio_support() {
      // let n = (this.ieo_active.cur_support / this.ieo_active.total_support) * 100
      let n = BigNumber(this.ieoRspVo.saleNum).multipliedBy(100).dividedBy(this.ieoRspVo.amount).toFixed(2)
      return n.toFixed(2)
    },
    canClick() {
      // return this.isStart && this.ieo_active.total_support > this.ieo_active.cur_support && !this.isEnd
      return true
    },
    sale_rate() {
      if (this.ieoRspVo.amount != 0) {
        let n = BigNumber(this.ieoRspVo.saleNum).multipliedBy(100).dividedBy(this.ieoRspVo.amount).toFixed(5)
        return Math.floor(n * 100) / 100
      } else {
        return 0
      }
    }

  },

  created() {
    this.getIeoInfo({
      ieoCode: this.ieo_active.currency,
    })
  },
  mounted() {
    if (this.ieo_active.end_date) {
      this.countdown(this.ieo_active.end_date.replace('/', '-'), this.ieo_active.start_date)
    }
    this.checkStartTime()
  },
  methods: {
    ...mapActions('ieoInfo', ['getIeoInfo']),
    checkStartTime() {
      this.isStart = new Date().getTime() >= new Date(this.ieo_active.start_date).getTime()
      this.isEnd = new Date().getTime() >= new Date(this.ieo_active.end_date).getTime()
      this.timer = setTimeout(() => {
        this.checkStartTime()
      }, 1000)
    },
    onCopy() {
      Message.success(this.langText.copySuccess)
      setTimeout(() => {
        location.href = `https://riostox.com/${this.$fifth.lang}/funds/withdraw/${this.ieo_active.recharge_currency.toLowerCase()}`
      }, 500)
    },
    toSupport() {
      // if (!this.canClick) {
      //   return
      // }
      // if (this.currentUser) {
      //   this.maskshow = true
      // } else {
      //   this.$router.push(
      //     this.$i18nRoute({
      //       name: 'signin',
      //     }),
      //   )
      // }
      this.$router.push(
        this.$i18nRoute({
          name: 'buyieo',
        }),
      )
    },
  },
  filters: {
    formateNumber(n) {
      if (n) {
        return parseFloat(n).toLocaleString()
      } else {
        return 0
      }
    },
  },
  beforeDestroy() {
    this.clearCountdownTimer()
  },
  components: {
    VDialog,
    piechart,
    ieoform,
  },
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100%;
  max-height: 100%;
}

.color3 {
  color: #333333;
}

.color6 {
  color: #666666;
}

.bold {
  font-weight: bold;
}

.mgt20 {
  margin-top: 20px;
}

.menaPay {
  // min-width: 1200px;
  margin-top: 45px;
  .top {
    display: flex;
    width: 1120px;
    margin: 0 auto;
    .ieo-banner {
      flex: 1;
      min-height: 550px;
      padding-bottom: 40px;
      margin-right: 20px;
      background: url('~@/assets/images/active/menaPay-ieo/ieo-bg.png') center center no-repeat;
      background-size: cover;
      .content {
        width: 550px;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;
        .title {
          height: 64px;
          margin-top: 150px;
          display: flex;
          position: relative;
          .ieo-icon {
            width: 50px;
            height: 50px;
            img {
              width: 50px;
              height: 50px;
            }
          }
          .ieo-title {
            font-size: 30px;
            line-height: 50px;
            margin-left: 40px;
            color: #ffffff;
          }
          .soldout {
            position: absolute;
            right: 0;
            top: 0;
            width: 74px;
            height: 74px;
            background-size: 100% 100%;
          }
        }
        .desc-text {
          font-size: 15px;
          margin-top: 20px;
          line-height: 24px;
          color: #ffffff;
        }
        .ieo-support {
          margin-top: 45px;
          .cur-support {
            font-size: 14px;
            line-height: 15px;
            color: rgba(255, 255, 255, 0.8);
            span {
              color: #ffffff;
            }
            .fs20 {
              font-size: 20px;
            }
          }
          .cur-total-finish {
            margin-top: 6px;
            display: flex;
            justify-content: space-between;
            line-height: 26px;
            font-size: 12px;
            .cur-total-support {
              color: #ffffff;
              margin-top: 10px;
            }
            .cur-finish {
              color: #ffd200;
              .fs16 {
                font-size: 16px;
              }
            }
          }
          .support-process {
            width: 100%;
            height: 6px;
            border-radius: 10px;
            background-color: #2d2e43;
            margin-top: 5px;
            .percent-process {
              width: 76%;
              height: 100%;
              overflow: hidden;
              border-radius: 10px;
              .total-process {
                width: 800px;
                height: 100%;
                background: linear-gradient(to right, #99a0ff, #e2185f);
              }
            }
          }
          .support-people {
            display: flex;
            justify-content: space-between;
            line-height: 32px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            .smallCountDown {
              margin-left: 150px;
            }
          }
        }
        .support-btn {
          width: 200px;
          height: 40px;
          line-height: 40px;
          display: block;
          margin-top: 34px;
          text-align: center;
          background-color: #999999;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
          border-radius: 20px;
          font-size: 14px;
          color: #333333;
          &.active {
            background-color: #ffd200;
          }
        }
      }
    }
    .ieo-form {
      flex: 1;
    }
  }

  .ieo-instruction {
    background: #ffffff;
    .content {
      width: 1120px;
      overflow: hidden;
      margin: 0 auto;
      li {
        margin-top: 60px;
      }
      .list-title {
        height: 26px;
        line-height: 26px;
        padding-left: 13px;
        font-size: 18px;
        color: #333333;
        position: relative;
        &:before {
          content: '';
          width: 3px;
          height: 16px;
          display: inline-block;
          position: absolute;
          left: 0;
          top: 5px;
          background: #ffd200;
        }
      }
      .list-desc {
        margin: 16px 0 20px;
        font-size: 12px;
        line-height: 26px;
        color: #666666;
      }
      .ieo-link {
        a {
          width: 120px;
          height: 30px;
          line-height: 30px;
          display: inline-block;
          background-color: #ffffff;
          border-radius: 3px;
          margin-right: 10px;
          margin-bottom: -4px;
          text-align: center;
          border: solid 1px rgba($color: #333333, $alpha: 0.5);
          color: #333333;
          font-size: 12px;
        }
      }
      .ieo-info {
        dd {
          // height: 70px;
          // line-height: 70px;
          display: flex;
          align-items: center;
          &:not(:last-child) {
            border-bottom: 1px solid #eaedf5;
          }
          .ddl,
          .ddr {
            display: inline-block;
          }
          .ddl {
            width: 214px;
            font-size: 14px;
            color: #666666;
          }
          .ddr {
            font-size: 15px;
            padding: 22px 0;
            color: #333333;
            line-height: 24px;
            a {
              margin-right: 10px;
              .iconfont {
                font-size: 18px;
              }
            }
          }
        }
      }
    }
  }
  .down-time {
    width: 1120px;
    height: 166px;
    margin: 50px auto;
    background-image: linear-gradient(180deg, #fbfbfb 0%, #f6f6f6 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .countdown {
      font-size: 21px;
      color: #333333;
      .date-num {
        font-size: 36px;
        font-weight: bold;
        margin-left: 10px;
      }
      .date-desc {
        color: rgba($color: #333333, $alpha: 0.8);
      }
    }
    .ieo-time {
      margin-top: 20px;
      font-size: 14px;
      color: rgba($color: #333333, $alpha: 0.8);
    }
  }
  .piechart {
    max-width: 888px;
    height: 308px;
    margin: 0 auto;
  }
  .buyieo {
    z-index: 10;
  }

  /* .note { */

  /*  width: 1120px; */

  /*  margin: 0 auto 20px; */

  /*  p { */

  /*    font-weight: bold; */

  /*  } */

  /*  ul { */

  /*    margin-top: 15px; */

  /*    li { */

  /*      margin-top: 10px; */

  /*    } */

  /*    .circle { */

  /*      display: inline-block; */

  /*      width: 6px; */

  /*      height: 6px; */

  /*      border-radius: 50%; */

  /*      background-color: black; */

  /*    } */

  /*    .notetip { */

  /*      color: #666666; */

  /*      font-size: 12px; */

  /*    } */

  /*  } */

  /* } */
}

.suport-box {
  width: 540px;
  min-height: 450px;
  border-radius: 4px;
  background: #ffffff;
  margin: 108px auto;
  .title {
    position: relative;
    padding: 19px 0;
    font-size: 20px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    background-color: #ffd619;
    text-align: center;
    .close {
      position: absolute;
      display: block;
      top: 23px;
      font-size: 16px;
      right: 20px;
      cursor: pointer;
    }
  }
  .content {
    padding: 40px;
    font-size: 13px;
    line-height: 22px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    // height: 40px;
    padding-bottom: 40px;
    a {
      width: 160px;
      height: 40px;
      display: block;
      background-color: #ffd619;
      border-radius: 3px;
      font-size: 15px;
      color: #333333;
      text-align: center;
      line-height: 40px;
      &.cancel {
        background-color: #f3f4f6;
        margin-left: 28px;
      }
    }
  }
}
</style>
