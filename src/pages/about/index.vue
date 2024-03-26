<template>
  <div class="abouts">
    <div class="what">
      <div></div>
      <h2>What is RioStox?</h2>
      <p>
        RioStox is a licensed security exchange regulated by Labuan Financial Services Authority (LFSA) that offers
        issuance, settlement, custody, and secondary trading of digitized securities.
      </p>
      <p>
        RioStox provides investors with access to private markets and alternative assets, such as cryptocurrencies,
        fractionalised real estate and digital assets hedge funds. It is based in Labuan and is open to all non-US
        retail, accredited, and institutionnal investors.
      </p>
    </div>
    <div class="why">
      <h2>Why use Riostox?</h2>
      <ul>
        <li v-for="item in securityList"
            :key="item.back">
          <p class="back">
            <img width="100%"
                 :src="item.back" />
          </p>
          <h4>{{ item.title }}</h4>
          <label>{{ item.value }}</label>
        </li>
      </ul>
    </div>
    <div class="fostering">
      <div></div>
      <h2>Our Value</h2>
      <h3>Fostering Growth and Prosperity for all</h3>
      <p>
        At RioStox, we understand that our responsibilities go beyond our status as a market place. Our issuer, business
        partners and the wider community look to us to lead the way and set an example. Our role in the community, and
        our commitment to being a responsible leader is a critical part of our business strategy and of our future.
      </p>
      <span></span>
      <h5>Calvin Ng</h5>
      <p>RioStox Director/President</p>
    </div>
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
            @click="leaderItemEve(item)"
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
      <div class="layers"
           v-show="dialogVisible">
      </div>
      <div class="layersBox"
           v-show="dialogVisible">
        <div>
          <img @click="dialogVisible=!dialogVisible"
               class="union"
               src="../../assets/newImg/images/about/leaders/Union.png" />
          <div style="clear: both;"></div>
          <h3>{{contentText.title}}</h3>
          <span>{{contentText.value}}</span>
          <img class="leaders"
               :src="contentText.portrait" />
        </div>
        <div class="content">
          <p>{{contentText.introduce}}</p>
          <p>{{contentText.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contentText: {},
      dialogVisible: false,
      leaderItem: [
        {
          title: 'Nick Cowan',
          value: 'Director/Chief Executive Officer',
          image: 'https://i.riostox.com/i/6b/6b5b30af41fba8eee0fda9f67504d2c1.png',
          portrait: require('../../assets/newImg/images/about/leaders/3.png'),
          introduce: `Nick Cowan has over 30 years investment industry experience in
            Developed and Emerging Markets including five years as the Global Head of Equities for ING Barings serving as a Member of Executive Committee.
            `,
          content: `
            Responsible for 2,500 employees in 43 countries, including 40 stock
            exchange memberships as well as numerous restructurings, turnarounds,
            acquisitions and divestments. He is currently the founder and Managing
            Director of The Gibraltar Stock Exchange.`,
        },
        {
          title: 'Calvin Ng',
          value: 'Director/President',
          image: 'https://i.riostox.com/i/4e/4ed68145dd289d4a1e44bb2c61857dfd.png',
          portrait: require('../../assets/newImg/images/about/leaders/2.png'),
          introduce: `A highly experienced venture capital and entrepreneur, Calvin was part of the World of Warcraft team that partnered with THE9 (*IPO 2004)*NCTY, designed the entire WARCRAFT & COUNTER-STRIKE merchandise lines, and innovated China 1st 3G mobile voice comics Co.
`,
          content: `
He joined CITIC PACIFIC *HKE267 and CITIC 1616 (IPO 2009) *HKE1883 as Vice President.
Following his successful career in the gaming industry Calvin decided to join the Blockchain landscape in 2016. In addition to his involvement in RioStox, Calvin is also managing Director at PlutusVC, a $200 Million fund focused on internet companies.`,
        },
        {
          title: 'James Anderson',
          value: 'Director/Chairman',
          image: 'https://i.riostox.com/i/d5/d5c3bfba5fcaaf125f6d4269f58342b3.png',
          portrait: require('../../assets/newImg/images/about/leaders/1.png'),
          introduce: `James Anderson is a Blockchain advocate and serial entrepreneur whose involvement in Blockchain goes back to early 2013.
`,
          content:
            'Upon contributing to the Ethereum ICO, James embarked on a journey into social entrepreneurship. Most notably, James co-founded Social Evolution, a non-profit organization whose aim is to raise awareness about the potential of digital currencies and the benefits of decentralized finance.',
        },
        {
          title: 'Stephane Laurent Villedieu',
          value: 'Director/Chief Marketing Officer',
          image: 'https://i.riostox.com/i/1c/1ce688c381c6391b5ed1ee6944cd3a88.png',
          portrait: require('../../assets/newImg/images/about/leaders/4.png'),
          introduce: `Stephane is a full-stack marketer whose career spans 12 years and a broad array of corporations, agencies and startups. His expertise lies in Corporate Strategy, Branding, Digital Marketing and Community Building. 
          `,
          content: `A  long-term mentor for startups, he is also a regular public speaker on diverse topics including emergent technology, business modeling, design thinking and corporate social responsibility. An expert of China’s digital landscape, Stephane has helped dozens of Blockchain projects set foot in Asia, assisting them with fundraising, content creation and community building.
Stephane holds an MBA from Abertay University and a BA (Hons) in Law and Political Science from Jean Moulin University.`,
        },
      ],
      securityList: [
        {
          title: 'Efficiency',
          value: 'Security tokens contain built in corporate actions such as voting and dividends.',
          back: require('@/assets/newImg/images/member/efficiency_icon.png'),
        },
        {
          title: 'Accessibility',
          value: 'RioStox offers 24/7 market access.',
          back: require('@/assets/newImg/images/member/efficiency_icon1.png'),
        },
        {
          title: 'Transparency',
          value: 'Our immutable blockchain allows our users to access trading activities.',
          back: require('@/assets/newImg/images/member/efficiency_icon2.png'),
        },
        {
          title: 'Liquidity',
          value: 'Fractionalized asset ownership opens up opportunities to small investors.',
          back: require('@/assets/newImg/images/member/efficiency_icon3.png'),
        },
        {
          title: 'Security',
          value: 'Our users funds are held in a licensed trust at all times.',
          back: require('@/assets/newImg/images/member/efficiency_icon4.png'),
        },
      ],
    }
  },
  methods: {
    leaderItemEve(item) {
      this.dialogVisible = true
      this.contentText = item
    },
  },
}
</script>

<style lang="scss" scoped>
.abouts {
  background-color: #002060;
  .what {
    width: 100%;
    height: 600px;
    color: #fff;
    position: relative;
    div {
      background-image: url('../../assets/newImg/images/member/bann3.png');
      background-color: rgba(0, 0, 0, 1);
      background-size: cover;
      width: 100%;
      height: 100%;
      opacity: 0.14;
      position: absolute;
      right: 0;
      top: 0;
    }
    h2 {
      font-size: 48px;
      padding-top: 148px;
      text-align: center;
    }
    p {
      font-size: 16px;
      width: 600px;
      margin: auto;
      margin-top: 40px;
    }
  }
  .why {
    background-color: #fff;
    h2 {
      color: #002060;
      font-size: 48px;
      text-align: center;
      padding-top: 125px;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: baseline;
      margin-top: 53px;
      background-image: url('../../assets/newImg/images/member/bann4.png');
      background-size: 100% 100%;
      padding-bottom: 120px;
      li {
        width: 352px;
        margin: 0px 30px;
        .back {
          background-color: #ffffff;
          width: 100%;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
          padding-top: 30px;
          text-align: center;
          height: 300px;
          // position: relative;
          img {
            width: 230px;
            // position: absolute;
            // top: 65%;
            // left: 50%;
            // transform: translate(-50%, -50%);
          }
        }
        h4 {
          color: #4e87f7;
          font-size: 32px;
          text-align: center;
          margin: 20px 0px;
        }
        label {
          font-size: 16px;
          line-height: 24px;
          color: #111;
        }
      }
    }
  }
  .fostering {
    height: 641px;
    color: #fff;
    text-align: center;
    position: relative;
    div {
      background-image: url('../../assets/newImg/images/member/bann5.png');
      background-color: rgba(0, 0, 0, 1);
      background-size: 100% 100%;
      width: 100%;
      height: 100%;
      opacity: 0.14;
      position: absolute;
      right: 0;
      top: 0;
    }
    h2 {
      padding-top: 148px;
      font-size: 48px;
    }
    h3 {
      color: #4e87f7;
      font-size: 32px;
      margin: 40px 0px;
    }
    p {
      width: 800px;
      margin: auto;
      font-size: 18px;
    }
    span {
      width: 40px;
      height: 1px;
      background: #fff;
      display: block;
      margin: 40px auto 20px auto;
    }
    h5 {
      font-size: 16px;
      margin-bottom: 4px;
    }
  }
}
.team {
  background: #fff;
  padding-top: 121px;
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
  .layers {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 1111;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .layersBox {
    background-color: #fff;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    z-index: 11111;
    transform: translate(-50%, -50%);
    width: 1000px;
    text-align: center;
    padding-bottom: 70px;
    .union {
      float: right;
      margin-right: 70px;
      margin-top: 50px;
      cursor: pointer;
    }
    .leaders {
      border-radius: 50%;
      height: 200px;
      width: 200px;
    }
    h3 {
      font-size: 48px;
      color: #002060;
    }
    span {
      font-size: 24px;
      color: #4e87f7;
      display: block;
      margin: 20px 0px;
    }
    .content {
      text-align: left;
      padding: 0px 120px;
      p {
        font-size: 16px;
        line-height: 24px;
        margin-top: 23px;
      }
    }
  }
}
</style>