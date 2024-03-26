<template>
  <div class="team">
    <div class="members">
      <h2>Board Members</h2>
      <p>
        RioStox leadership brings decades of combined experience in financial markets, venture capital and blockchain
        technology.
      </p>
      <p>
        Together they oversee the governance of the exchange and ensure that the business and activities hosted on the
        platform are demonstrative of its values.
      </p>
    </div>
    <ul>
      <li v-for="item in leaderItem"
          :key="item">
        <img :src="item.image" />
        <h3>
          <strong>
            {{ item.title }}

            <span> {{ item.value }} </span>
          </strong>
        </h3>
      </li>
    </ul>
    <el-dialog title="提示"
               width="30%"
               v-model="dialogVisible"
               :before-close="handleClose">111
    </el-dialog>
    <div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Dialog } from 'element-ui'
Vue.use(Dialog)
export default {
  data() {
    return {
      dialogVisible: true,
      leaderItem: [
        {
          title: 'Nick Cowan',
          value: 'Director/Chief Executive Officer',
          image: 'https://i.riostox.com/i/6b/6b5b30af41fba8eee0fda9f67504d2c1.png',
          introduce:
            'Nick Cowan has over 30 years investment industry experience in Developed and Emerging Markets including five years as the Global Head of Equitiesfor ING Barings serving as a Member of Executive Committee.Responsible for 2,500 employees in 43 countries, including 40 stockexchange memberships as well as numerous restructurings, turnarounds,acquisitions and divestments. He is currently the founder and ManagingDirector of The Gibraltar Stock Exchange.',
        },
        {
          title: 'Calvin Ng',
          value: 'Director/President',
          image: 'https://i.riostox.com/i/4e/4ed68145dd289d4a1e44bb2c61857dfd.png',
          introduce:
            'A highly experienced venture capital and entrepreneur, Calvin was part of the World of Warcraft teamthat partnered with THE9 (*IPO 2004)*NCTY, designed the entire WARCRAFT & COUNTER-STRIKE merchandise lines,and innovated China 1st 3G mobile voice comics Co. He joined CITIC PACIFIC *HKE267 and CITIC 1616 (IPO 2009) *HKE1883 as Vice President.Following his successful career in the gaming industry Calvin decided to join the Blockchain landscape in 2016.In addition to his involvement in RioStox, Calvin is also managing Director at PlutusVC,a $200 Million fund focused on internet companies.',
        },
        {
          title: 'James Anderson',
          value: 'Director/Chairman',
          image: 'https://i.riostox.com/i/d5/d5c3bfba5fcaaf125f6d4269f58342b3.png',
          introduce:
            'James Anderson is a Blockchain advocate and serial entrepreneur whose involvement in Blockchain goes back to early 2013.James got into blockchains through his interest in economics and his research of gold, silver, and alternative currenciesafter the financial crisis of 2008. It was in 2012 that he really started looking into Bitcoin.One year later he met Vitalik Buterin and Erik Voorhees at a conference called Porcfest in New Hampshire, USA. Upon contributing to the Ethereum ICO, James embarked on a journey into social entrepreneurship.Most notably, James co-founded Social Evolution, a non-profit organization whose aim is to raise awareness about the potentialof digital currencies and the benefits of decentralized finance.',
        },
        {
          title: 'Stephane Laurent Villedieu',
          value: 'Director/Chief Marketing Officer',
          image: 'https://i.riostox.com/i/1c/1ce688c381c6391b5ed1ee6944cd3a88.png',
          introduce:
            'Stephane is a full-stack marketer whose career spans 12 years and a broad array of corporations, agencies and startups.His expertise lies in Corporate Strategy, Branding, Digital Marketing and Community Building.A long-term mentor for startups, he is also a regular public speaker on diverse topics including emergent technology,business modeling, design thinking and corporate social responsibility. An expert of China’s digital landscape,Stephane has helped dozens of Blockchain projects set foot in Asia, assisting them with fundraising,content creation and community building.Stephane holds an MBA from Abertay University and a BA (Hons) in Law and Political Science from Jean Moulin University.',
        },
      ],
    }
  },
  methods: {
    handleClose() {},
  },
}
</script>

<style lang="scss" scoped>
.team {
  .members {
    h2 {
      font-size: 48px;
      color: #002060;
      margin-top: 121px;
      text-align: center;
    }
    p {
      font-size: 16px;
      color: #111111;
      margin: auto;
      margin-top: 40px;
      width: 795px;
    }
  }
  ul {
    max-width: 1440px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 40px auto 120px auto;
    li {
      position: relative;
      cursor: pointer;
      img {
        width: 300px;
      }
      h3 {
        position: absolute;
        bottom: 0px;
        z-index: 1;
        color: #fff;
        background: #000;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        strong {
          font-size: 23px;
          margin-left: 10px;
          margin-bottom: 20px;
          display: block;
          padding-top: 10px;
        }
        span {
          font-size: 16px;
          display: block;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>