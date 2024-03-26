<template>
  <footer class="page-footer"
          v-if="show">
    <div class="footer-wrap">
      <div class="footer-link footer-logo">
        <div class="footer-logo-box">
          <a href="/">
            <!-- <i class="iconfont icon-logo"></i> -->
            <img src="../../assets/images/riostox.png"
                 height="40">
          </a>
          <p>
            <span>
              The Next Frontier
            </span>
            <span>
              of Investement
            </span>
          </p>
        </div>
        <div class="contact">
          <a href="https://0.plus/riostox_cn"
             v-if="$fifth.isCn"
             target="_blank">
            <img src="../../assets/newImg/images/footer/facebook.png" />
          </a>
          <a href="https://www.facebook.com/Riostox-Exchange-558472047871367/"
             target="_blank">
            <img src="../../assets/newImg/images/footer/linkedIn.png" />
          </a>
          <a href="https://www.facebook.com/Riostox-Exchange-558472047871367/"
             target="_blank">
            <img src="../../assets/newImg/images/footer/medium.png" />
          </a>
          <a href="https://www.facebook.com/Riostox-Exchange-558472047871367/"
             target="_blank">
            <img src="../../assets/newImg/images/footer/twitter.png" />
          </a>
          <a href="https://www.facebook.com/Riostox-Exchange-558472047871367/"
             target="_blank">
            <img src="../../assets/newImg/images/footer/youTube.png" />
          </a>
        </div>

      </div>
      <div class="footer-link"
           :class="key===1 ? 'active':''"
           @click="changeKey(1)">
        <span class="show">+</span>
        <ul>
          <li>
            <router-link :to="$i18nRoute({path:'/pro/markets/btcusdt'})">Exchange</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/markets-list'})">Market Center</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/products'})">Products</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/about'})">About</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-link"
           :class="key===2 ? 'active':''"
           @click="changeKey(2)">
        <span class="show">+</span>
        <ul>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004288496">FAQ</a>
          </li>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004038275">Customer service</a>
          </li>
        </ul>
      </div>
      <div class="footer-link"
           :class="key===2 ? 'active':''"
           @click="changeKey(2)">
        <span class="show">+</span>
        <ul>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/categories/360000727035-FAQ-">Privacy policy</a>
          </li>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004336956">Terms of Use</a>
          </li>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004336956">Disclaimer</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footerTopRightTitle">
      <p>
        {{$t('m.newHome.malaysia')}}
      </p>
      <div></div>
      <p>
        {{$t('m.newHome.reserved')}}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: true },
  },
  data() {
    return {
      key: 0,
    }
  },
  computed: {
    year() {
      let year = new Date().getFullYear()
      if (year !== 2018) {
        year = '2018-' + year
      }
      return year
    },
  },
  methods: {
    changeKey(key) {
      if (this.key === key) {
        this.key = 0
      } else {
        this.key = key
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-footer {
  width: 100%;
  color: #999999;
  // background: #222222;
  position: relative;
  // z-index: $zindex-fixed;

  position: relative;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  background: url('../../assets/images/footer-bg.jpg');
  background-position: center;
  background-size: cover;
  flex: 0 0 auto;

  .footer-logo {
    i {
      color: #adadad;
      display: block;
      width: 42px;
      margin-bottom: 24px;
      font-size: 27px;
      overflow: hidden;
      &:hover {
        color: #ffffff;
      }
    }
    .contact {
      margin-top: 22px;
      i.iconfont {
        font-size: 46px;
        display: inline-block;
        margin-bottom: 5px;
        margin-right: 5px;
        color: #fff;
      }
      a {
        margin-right: 20px;
      }
    }
    p {
      padding: 20px 0px;
      font-size: 14px;
      a {
        font-size: 20px;
        color: #fff;
      }
    }
    span {
      font-size: 11px;
    }
  }
  .footer-wrap {
    max-width: 1440px;
    margin: 0 auto;
    padding: 60px 0px;
    display: flex;
    justify-content: space-around;
    .footer-logo-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      p {
        padding: 0px;
        margin-left: 17px;
        border-left: 1px solid #fff;
        padding-left: 17px;
      }
      span {
        display: block;
        font-size: 16px;
      }
    }
  }
  .footer-link {
    position: relative;
    .show {
      display: none;
    }
    h4 {
      font-weight: normal;
      color: #ffffff;
      font-size: 24px;
      line-height: 30px;
    }
    ul {
      li {
        list-style: none;
        padding: 14px 0;
        position: relative;
        font-size: 14px;
        color: $color-9;
        img {
          display: none;
          width: 150px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: $zindex-fixed;
        }
        &:hover {
          img {
            display: block;
          }
        }
      }
    }
    a {
      color: #fff;
      font-size: 18px;
      position: relative;
    }
  }
}

@include screen-h5-new() {
  .page-footer {
    .footer-wrap {
      flex-direction: column;
      padding: 15px 30px 30px;
    }
    .footer-link {
      .show {
        display: block;
        position: absolute;
        right: 0;
        top: 17px;
        font-size: 18px;
        line-height: 1;
      }
      ul {
        display: none;
        margin-bottom: 10px;
        li {
          padding-left: 10px;
        }
        li:hover {
          background-color: rgba($color: #d8d8d8, $alpha: 0.08);
        }
        li:active {
          background-color: rgba($color: #d8d8d8, $alpha: 0.08);
        }
      }
      h4 {
        line-height: 50px;
      }
    }
    .active {
      .show {
        transform: rotate(45deg);
        transition: 0.3s;
      }
      ul {
        display: block;
      }
    }
    .footer-link + div {
      border-bottom: 1px solid rgba($color: #d8d8d8, $alpha: 0.2);
    }
    .footer-logo {
      order: 1;
      margin-top: 20px;
      .contact {
        display: none;
        i.iconfont {
          margin-right: 18px;
        }
      }
    }
  }
}
.footerTopRightTitle {
  max-width: 1440px;
  margin: auto;
  text-align: left;
  margin-bottom: 60px;
  text-indent: 50px;
  div {
    height: 1px;
    width: 100%;
    background-color: #fff;
  }
  p {
    margin: 30px 0px;
    font-size: 16px;
  }
}
</style>
