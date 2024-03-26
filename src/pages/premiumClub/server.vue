<template>
  <div id="server">
    <h1>Products & Services</h1>
    <div class="contain">
      <div class="server-list tac en">
        <li class="fl" v-for="(item, index) in contentText" :key="index" :class="[activeIndex == index ? 'active' : '']" @mouseenter="enterHander(index)" @click="enterHander(index)">
          <div class="bgcontent">
            <p class="icon"><img :src="activeIndex == index ? iconServerActive[index] : iconServer[index]"/></p>
            <p class="name"><span class="zh-name">{{item.name.zhName}}</span></p>
            <dl class="desc">
              <dd v-for="desc in item.desc" :key="desc.d1">
                <p class="d1">{{desc.d1}}</p>
                <p class="d2">{{desc.d2}}</p>
              </dd>
            </dl>
          </div>
        </li>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  name: 'server',
  data() {
    return {
      iconServer: [
        require('@/assets/images/preminumClub/icon-server-1.png'),
        require('@/assets/images/preminumClub/icon-server-2.png'),
        require('@/assets/images/preminumClub/icon-server-3.png'),
        require('@/assets/images/preminumClub/icon-server-4.png'),
        require('@/assets/images/preminumClub/icon-server-5.png'),
      ],
      iconServerActive: [
        require('@/assets/images/preminumClub/icon-server-1-a.png'),
        require('@/assets/images/preminumClub/icon-server-2-a.png'),
        require('@/assets/images/preminumClub/icon-server-3-a.png'),
        require('@/assets/images/preminumClub/icon-server-4-a.png'),
        require('@/assets/images/preminumClub/icon-server-5-a.png'),
      ],
      activeIndex: 0
    }
  },
  methods: {
    enterHander(index) {
      this.activeIndex = index
    }
  },
  computed: {
    contentText() {
      let data = [
        {
          name: {
            enName: 'One-Financial',
            zhName: 'Operating Centre'
          },
          desc: [
            {
              d1: 'Refined Management',
              d2: 'Meticulous management of digital assets, investors and projects.'
            },
            {
              d1: 'Communication Channels',
              d2: 'Dedicated customer service, comprehensive digitalized operating tools and professional technical support.'
            },
            {
              d1: 'Digital Asset Management',
              d2: 'The real-time monitor of the digital asset operation; support of token listing - projects that passed Riostox assessment have the opportunity to be listed. '
            },
            {
              d1: 'Customer System',
              d2: 'Independent customer system; fast and convenient KYC tools based on AI technology.'
            }
          ]
        },
        {
          name: {
            enName: 'One-Data',
            zhName: 'Data Centre'
          },
          desc: [
            {
              d1: 'Customer Data',
              d2: 'Customer portrait based on big data enabled. '
            },
            {
              d1: 'Asset Data',
              d2: 'Abundant main chain docking, multiple layers of encryption and storage technology, stable main chain nodes.'
            },
            {
              d1: 'Trading Stats',
              d2: 'real-time digital asset circulation and trading stats.'
            }
          ]
        },
        {
          name: {
            enName: 'One-Trade',
            zhName: 'Trading Centre'
          },
          desc: [
            {
              d1: 'OTC Trading',
              d2: 'Trading channels for mainstream cryptocurrencies and fiat-trading'
            },
            {
              d1: 'Crypto Trading',
              d2: 'Supports hundreds of currencies available now on Riostox and other currencies to be listed in the future.'
            },
            {
              d1: 'Order Matching',
              d2: 'Matching orders from public cloud exchange and Riostox and enjoying the same market depth. Provided synchronized market stats. '
            }
          ]
        },
        {
          name: {
            enName: 'One-Financial',
            zhName: 'Financial Centre'
          },
          desc: [
            {
              d1: 'Financial System',
              d2: 'Financial data management of platform and daily marketing activities with automated account settling.'
            },
            {
              d1: 'Wallet System',
              d2: 'Rich main chain integration, multiple layers of encryption and storage technology, stable main chain nodes.'
            },
            {
              d1: 'Platform Token Marketing',
              d2: 'Model customization, issuance and marketing & management of platform tokens. '
            }
          ]
        },
        {
          name: {
            enName: 'One-Security',
            zhName: 'Security Centre'
          },
          desc: [
            {
              d1: 'Real-time Monitor',
              d2: 'Large screen for real-time and automatic monitoring with muti-channel responsiveness. '
            },
            {
              d1: 'Security & Risk Control',
              d2: 'AI-based risk management engine which detects and resolves risks incurred during sign-up, sign-in, trading, deposit and withdrawal promptly. Customized risk control strategies supported if required.'
            },
            {
              d1: 'Global Development',
              d2: 'Adopting a cloud service cluster with a global arrangement, services cover 28 countries/regions and 61cities.'
            }
          ]
        }
      ]
      return data
    }
  }
}
</script>
<style lang='scss'>
  @import '@/assets/scss/server.scss';
</style>
