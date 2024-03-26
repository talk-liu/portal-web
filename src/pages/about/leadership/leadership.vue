<template>
  <div class="wrapper">
    <h1>RioStox Board Members</h1>
    <p>
      RioStox leadership brings decades of combined experience in financial markets, venture capital and blockchain
      technology.
    </p>
    <p>
      Together they oversee the governance of the exchange and ensure that the business and activities hosted on the
      platform are demonstrative of its values.
    </p>
    <ul class="leadership" v-if="boll">
      <li class="leaderItem" v-for="(val, key) in leaderItem" :key="key" @click="leadershipEve(key)">
        <div class="photo">
          <img :src="val.image" />
        </div>
        <h3>{{ val.title }}</h3>
        <h4>{{ val.value }}</h4>
      </li>
    </ul>

    <div v-else>
      <div class="innerWrapper">
        <div class="photoWrap">
          <div class="photo">
            <img :src="leaderItem[num].image" />
          </div>
          <h2>{{ leaderItem[num].title }}</h2>
          <h3>{{ leaderItem[num].value }}</h3>
        </div>
        <div class="mainContent">
          <h2>{{ leaderItem[num].title }}</h2>
          <h3>{{ leaderItem[num].value }}</h3>
          <p>
            {{ leaderItem[num].introduce }}
          </p>
        </div>
      </div>
      <a href="javascript:;" @click="boll=!boll">Back</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boll: true,
      num: 0,
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
  components: {},
  mounted() {},
  methods: {
    leadershipEve(key) {
      this.num = key
      this.boll = false
    },
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.wrapper {
  a{
    display: block;
    background: #002060;
    border-radius: 10px;
    font-weight: 400;
    font-size: 34px;
    line-height: 36px;
    padding: 7px 63px;
    color: #fff;
    margin: 0 auto;
    text-align: center;
    width: 200px;
  }
  max-width: 1440px;
  margin: 130px auto;
  padding: 0 30px;
  h1 {
    color: #002060;
    font-size: 60px;
    line-height: 120%;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  p {
    font-size: 28px;
    line-height: 110%;
    font-weight: 400;
    color: #333;
    margin: 16px 0;
  }
  .leadership {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    overflow: hidden;
    height: 362px;
    justify-content: space-between;
    grid-gap: 10px;
    gap: 10px;
    height: 100%;
    justify-content: space-between;
    .leaderItem {
      cursor: pointer;
      display: block;
      -webkit-transition-duration: 0ms;
      transition-duration: 0ms;
      z-index: 0;
      opacity: 1;
      width: 100%;
      .photo {
        display: block;
        width: 335px;
        border-radius: 5px;
        background: #c4c4c4;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      h3 {
        color: #002060;
        font-weight: 700;
        margin: 5px 0;
        font-size: 32px;
        line-height: 120%;
      }
      h4 {
        color: #000;
        font-weight: 400;
        margin: 5px 0;
        font-size: 32px;
      }
    }
  }
  .innerWrapper {
    display: flex;
    .photoWrap {
      .photo {
        display: block;
        width: 335px;
        border-radius: 5px;
        background: #c4c4c4;
        z-index: 1;
        img {
          width: 100%;
        }
      }
    }
    .mainContent {
      p {
        margin-top: 30px;
        color: #333;
        font-size: 28px;
        line-height: 110%;
        font-weight: 400;
      }
    }
    h2,
    h3 {
      margin: 5px 0;
      font-size: 60px;
      line-height: 120%;
      font-weight: 700;
    }
    h3 {
      color: #4e87f7;
    }
  }
}
</style>
