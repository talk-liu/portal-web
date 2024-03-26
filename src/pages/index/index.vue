<template>
  <div class="sliderWrapperBox">
    <div class="wrapperBg"
         :style="{ 'background-image': 'url(' + wrapperBgImg + ')' }"></div>

    <div class="sliderWrapper"
         v-for="(items, isx) in homeContentSlides"
         :key="isx"
         v-show="items.boll">
      <div class="sliderTop">
        <div>
          <p>{{items.name}}</p>
          <h4>{{items.value}}</h4>
          <router-link :to="$i18nRoute({path:'/signup'})">Register now</router-link>
        </div>
        <img class="sliderTopImage"
             :src="items.image.src" />
      </div>
      <div class="sliderBottom">
        <div v-for="(item, isx) in sliderBottom"
             :key="isx"
             @mouseenter="enter(item, isx)"
             @mouseleave="leave(isx)">
          <div class="sliderBottomWrap"
               :class="item.boll ? 'active' : ''">
            <h5>{{ item.title }}</h5>
            <div>
              <span v-show="item.boll"
                    :style="{ width: wrapperBgNum + '%' }"></span>
            </div>
            <p>{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <ul class="newsWrapper">
        <li class="newsSection">
          <div class="news">
            <img src="../../assets/newImg/images/home/7-h.png" />
            <div class="newsText describe">
              <h3>Beta simulated trading competition</h3>
            </div>
          </div>
        </li>
        <li class="newsSection">
          <div class="news">
            <img src="../../assets/newImg/images/home/10-h.png" />
            <div class="newsText texts">
              <h2>
                What is RioStox?
              </h2>
              <h3>
                James Anderson
                CEO of RioDeFi
              </h3>
            </div>
          </div>
        </li>
        <li class="newsSection">
          <div class="news">
            <img src="../../assets/newImg/images/home/8-h.png" />
            <div class="newsText describe">
              <h3>RioStox 2022 roadmap</h3>
              <p>
                What the future brings!
              </p>
            </div>
          </div>
        </li>
        <li class="newsSection">
          <div class="news">
            <img src="../../assets/newImg/images/home/9-h.png" />
            <div class="newsText texts">
              <h3>
                The importance of crypto exchange regulation
              </h3>
              <p>
                What the future brings!
              </p>
              <br />
              <br />
              <h3>
                Nick Cowan
              </h3>
              <h3>
                CEO and founder of GSX
              </h3>
            </div>
          </div>
        </li>
        <li class="newsSection">
          <div class="news">
            <img src="../../assets/newImg/images/home/6-h.png" />
            <div class="newsText describe">
              <h3>Platform features</h3>
              <p>
                What makes RioStox stand out from competition.
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="registerWrapper"
         v-show="!currentUser">
      <h3>Join our simulated crypto trading competition today.</h3>
      <router-link :to="$i18nRoute({path:'/signup'})">Join Now</router-link>
    </div>
    <div class="partnersWrapper">
      <div class="content">
        <h3>{{$t('m.newHome.they')}}</h3>
        <p>
          {{$t('m.newHome.works')}}
        </p>
        <div class="newsImages">
          <a target="_blank"
             :href="item.link"
             class="items"
             v-for="(item, idx) in homePartners.partnersImages"
             :key="idx">
            <img :src="item.src" />
          </a>
        </div>
        <!-- <h3>{{$t('m.newHome.the')}}</h3>
        <div class="newsImages">
          <a :href="item.link" class="items" v-for="(item, idx) in homePartners.newsImages" :key="idx">
            <img :src="item.src" />
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      wrapperNum: 0,
      wrapperBgNum: 0,
      wrapperBgImg: require('../../assets/newImg/images/home/bg-1.jpg'),
      homeContentSlides: [
        {
          id: 0,
          title: 'title-bitcoin',
          subTitle: 'subtitle-trade',
          link: '#',
          background: require('../../assets/newImg/images/home/bg-4.jpg'),
          image: {
            src: require('../../assets/newImg/images/home/slide-4.jpg'),
            alt: 'Bitcoin',
          },
          boll: true,
          name: 'Beta simulated trading competition',
          value: 'Challenge your crypto trading skills and win up to 1 million Rfuel.',
        },
        {
          id: 1,
          title: 'title-access',
          subTitle: 'subtitle-explore',
          link: '#',
          background: require('../../assets/newImg/images/home/bg-2.jpg'),
          image: {
            src: require('../../assets/newImg/images/home/slide-2.jpg'),
            alt: 'Notebooks',
          },
          boll: false,
          name: 'Access Global Investment Opportunities',
          value: 'Explore the world’s leading regulated platform for digital assets.',
        },
        {
          id: 2,
          title: 'title-luxury',
          subTitle: 'subtitle-fractional',
          link: '#',
          background: require('../../assets/newImg/images/home/bg-3.jpg'),
          image: {
            src: require('../../assets/newImg/images/home/slide-3.jpg'),
            alt: 'Home',
          },
          boll: false,
          name: 'Crypto Investment Made Easy',
          value: 'Secure and regulated crypto trading.',
        },
      ],
      sliderBottom: [
        {
          title: 'Beta simulated trading competition',
          value: '',
          boll: true,
        },
        {
          title: 'Access Global Investment Opportunities',
          value: '',
          boll: false,
        },
        {
          title: 'Crypto Investment Made Easy',
          value: '',
          boll: false,
        },
      ],
      homePartners: {
        partnersTitle: 'partnersTitle',
        // eslint-disable-next-line max-len
        partnersText: 'partnersText',
        partnersImages: [
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo02.png'),
            alt: 'lloyds',
            link: 'https://aws.amazon.com/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo03.png'),
            alt: 'aws',
            link: 'https://riodefi.com/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo06.png'),
            alt: 'gemini',
            link: 'https://www.gsx.gi/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo07.png'),
            alt: 'gemini',
            link: 'https://bcw.group/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo08.png'),
            alt: 'gemini',
            link: 'https://hextrust.com/',
          },
        ],
        newsTitle: 'inNews',
        newsImages: [
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo09.png'),
            alt: 'bloomberg',
            link: 'https://www.bloomberg.com/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo10.png'),
            alt: 'forbes',
            link: 'https://www.forbes.com/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo11.png'),
            alt: 'cnbc',
            link: 'https://www.cnbc.com/',
          },
          {
            src: require('../../assets/newImg/images/home/partners/new/Logo12.png'),
            alt: 'business_insider',
            link: 'https://www.businessinsider.com/',
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('currentUser', ['currentUser']),
  },
  mounted() {
    const _this = this
    setInterval(() => {
      _this.wrapperBgNum += 1
      if (_this.wrapperBgNum >= 100) {
        _this.wrapperNum += 1
        _this.wrapperBgNum = 0
        if (_this.wrapperNum >= _this.homeContentSlides.length) {
          _this.wrapperNum = 0
        }
        _this.homeContentSlides.forEach((item) => {
          item.boll = false
        })
        _this.sliderBottom.forEach((item) => {
          item.boll = false
        })
        _this.homeContentSlides[_this.wrapperNum].boll = true
        _this.sliderBottom[_this.wrapperNum].boll = true
        _this.wrapperBgImg = _this.homeContentSlides[_this.wrapperNum].background
      }
    }, 100)
  },
  methods: {
    enter(items, isx) {
      this.homeContentSlides.forEach((item) => {
        item.boll = false
      })
      this.sliderBottom.forEach((item) => {
        item.boll = false
      })
      this.homeContentSlides[isx].boll = true
      items.boll = true
      this.wrapperBgImg = this.homeContentSlides[isx].background
      this.wrapperBgNum = 0
      this.wrapperNum = isx
    },
    leave() {},
  },
}
</script>


<style lang="scss" scoped>
.wrapperBg {
  background-image: url('../../assets/images/bg-4.jpg');
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  mix-blend-mode: normal;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.14;
  transition: background 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.sliderWrapperBox {
  position: relative;
  background-color: #002060;
  .sliderWrapper {
    max-width: 1440px;
    padding: 0 30px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    display: block;
    color: #fff;
    padding-bottom: 75px;
    .sliderTop {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 10px;
      padding: 195px 0px 100px;
      p {
        font-family: 'Roboto';
        font-size: 60px;
        line-height: 120%;
        font-weight: 200;
      }
      h4 {
        font-family: 'Roboto';
        font-size: 32px;
        line-height: 120%;
        font-weight: 500;
        letter-spacing: -0.02em;
        margin: 50px 0 25px 0;
      }
      a {
        display: inline-flex;
        color: #002060;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        background: #07e9b2;
        border-radius: 4px;
        padding: 10px 38px;
      }
      .sliderTopImage {
        z-index: 10;
        width: 100%;
        height: 100%;
        max-width: 830px;
        height: 365px;
        border-radius: 5px;
        margin-left: auto;
        object-fit: cover;
      }
    }
    .sliderBottom {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 30px;
      > div {
        cursor: pointer;
      }
      .sliderBottomWrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        align-items: flex-start;
        color: #939caf;
        -webkit-transition: color 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: color 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
        div {
          height: 5px;
          width: 100%;
          background-color: rgb(136, 136, 136);
          border-radius: 10px;
          overflow: hidden;
          margin: 4px 0px;
          span {
            display: block;

            height: 100%;
            background-color: rgb(7, 233, 178);
            text-align: right;
            transition: width 0.3s ease 0s;
            border-radius: 10px;
          }
        }
        h5 {
          font-size: 28px;
          line-height: 110%;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-align: left;
        }
        p {
          font-size: 20px;
          line-height: 110%;
          font-weight: 400;
          text-align: left;
          height: 80px;
        }
      }
      .active {
        color: #fff;
      }
    }
  }
}

.newsWrapper {
  max-width: 1440px;
  padding: 0 30px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: block;
  box-sizing: border-box;
  position: relative;
  display: grid;
  padding-top: 60px;
  padding-bottom: 60px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 300px);
  grid-gap: 20px;
  .newsSection {
    position: relative;
    display: block;
    max-width: 8430px;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
    li {
      position: relative;
      display: block;
      max-width: 8430px;
      height: 300px;
      border-radius: 5px;
      overflow: hidden;
    }

    img {
      border-radius: 5px;
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
      margin: auto;
    }
    .news {
      position: relative;
      display: block;
      max-width: 8430px;
      height: 300px;
      border-radius: 5px;
      overflow: hidden;
      img {
        transition: all 0.6s;
      }
    }
    .news:hover {
      img {
        transform: scale(1.03);
      }
    }
    .blueHover {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 32, 96, 0.75);
    }
    .newsText {
      z-index: 2;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      margin: 0 100px 0 40px;
      display: flex;
      flex-direction: column;
      color: #fff;
      h3 {
        font-size: 32px;
        font-weight: 700;
        text-shadow: 8px 8px 8px #222;
        margin-bottom: 20px;
      }
      p {
        font-size: 20px;
        font-weight: 400;
        text-shadow: 8px 8px 8px #222;
      }
    }
    .describe {
      top: 37px;
      transform: none;
    }
    .texts {
      width: 300px;
      right: 0px;
      margin: 0px;
      color: #002060;
      h2 {
        font-size: 32px;
      }
      h3 {
        font-size: 24px;
        margin-top: 7px;
        text-shadow: none;
        margin-bottom: 0px;
      }
      p {
        text-shadow: none;
        font-size: 16px;
        margin-top: 7px;
      }
    }
    .newsLink {
      z-index: 2;
      display: flex;
      align-items: center;
      position: absolute;
      right: 20px;
      bottom: 20px;
      font-size: 18px;
      line-height: 120%;
      font-weight: 700;
      color: #fff;
    }
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 25px;
    height: 300px;
    .newsBlock {
      background: #fff;
      position: relative;
      border-radius: 5px;
      padding: 30px 50px 30px 30px;
      .newsTexts {
        color: #002060;
        h4 {
          font-size: 20px;
          font-weight: 700;
          padding-bottom: 7px;
        }
        p {
          font-size: 18px;
          line-height: 120%;
          font-weight: 400;
        }
      }
      a {
      }
    }
    .newsLink {
      color: #002060;
    }
  }
}
.registerWrapper {
  background: url('../../assets/newImg/images/home/black_white_nodes.png') no-repeat, #fff;
  max-width: 100%;
  width: 100%;
  position: relative;
  padding-bottom: 137px;
  padding-top: 137px;
  text-align: center;
  h3 {
    font-size: 32px;
    font-weight: 700;
    color: #002060;
  }
  a {
    font-weight: 900;
    font-size: 18px;
    color: #002060;
    background-color: #07e9b2;
    border-radius: 10px;
    margin-top: 20px;
    display: inline-block;
    width: 280px;
    height: 60px;
    line-height: 60px;
  }
}

.partnersWrapper {
  // padding-left: 100px;
  // padding-right: 100px;
  // max-width: 1920px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  padding: 80px 0px;
  // background: rgba(255, 255, 255, 0.5);
  background-color: #3f537a;
  .content {
    max-width: 1440px;
    padding: 0 30px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    display: block;
    h3 {
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 20px;
    }
    p {
      font-size: 24px;
      font-weight: 400;
      color: #fff;
    }
    .newsImages {
      margin-top: 60px;
      // margin-bottom: 60px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 40px;
      grid-row-gap: 60px;
      justify-content: space-evenly;
      justify-items: center;
      align-content: space-evenly;
      align-items: center;
      .items {
        width: 120px;
        img {
          filter: grayscale(100%);
          transition: -webkit-filter 0.3s;
          transition: filter 0.3s;
          transition: filter 0.3s, -webkit-filter 0.3s;
          object-fit: cover;
          max-height: 100%;
        }
      }
    }
  }
}
</style>

