<template>
  <footer class="page-footer"
          v-if="show">
    <div class="footer-wrap">
      <div class="footer-link footer-logo">
        <a href="/">
          <!-- <i class="iconfont icon-logo"></i> -->
          <img src="../../assets/images/riostox.png"
               height="65">
        </a>
        <div class="contact">
          <a href="https://0.plus/riostox_cn"
             v-if="$fifth.isCn"
             target="_blank"><i class="iconfont icon-biyong"></i></a>
          <a href="https://www.facebook.com/Riostox-Exchange-558472047871367/"
             target="_blank"><i class="iconfont icon-facebook"></i></a>
          <a href="https://twitter.com/RiostoxExOfficial"
             target="_blank"><i class="iconfont icon-twitter"></i></a>
          <a href="https://t.me/RiostoxExOfficial_en"
             target="_blank"><i class="iconfont icon-tele"></i></a>
          <a href="https://medium.com/riostox-exchange"
             v-if="!$fifth.isCn"
             target="_blank"><i class="iconfont icon-medium"></i></a>
          <!--          <a href="https://www.youtube.com/channel/UCI80n2UiSk0nH1UW7vmnMjQ" v-if="!$fifth.isCn" target="_blank"><i class="iconfont icon-youtube"></i></a>-->
          <a href="https://www.reddit.com/r/Riostox/"
             v-if="!$fifth.isCn"
             target="_blank"><i class="iconfont icon-reddit"></i></a>
          <a href="https://vk.com/riostox_exchange"
             v-if="$fifth.isRu"
             target="_blank"><i class="iconfont icon-vk"></i></a>
        </div>
        <p>
          <a href="mailto:support@riostox.zendesk.com">support@riostox.zendesk.com</a>
        </p>
      </div>
      <div class="footer-link"
           :class="key===1 ? 'active':''"
           @click="changeKey(1)">
        <span class="show">+</span>
        <h4>Riostox</h4>
        <ul>
          <li>
            <router-link :to="$i18nRoute({path:'/about_us'})">{{$t('m.footerMenu.aboutUs')}}</router-link>
          </li>
          <li>
            <a :href="$t('m.footerMenu.noticeCenterHref')"
               target="_blank">{{$t('m.footerMenu.noticeCenter')}}</a>
          </li>
          <li>
            <a :href="$t('m.footerMenu.helpHref')"
               target="_blank">{{$t('m.footerMenu.help')}}</a>
          </li>
          <!--          <li>-->
          <!--            <a href="https://cloud.riostox.com/" target="_blank">Riostox Cloud</a>-->
          <!--          </li>-->
        </ul>
      </div>
      <!-- <div class="footer-link" :class="key===2 ? 'active':''" @click="changeKey(2)">
        <span class="show">+</span>
        <h4>{{$t('m.footerMenu.terms')}}</h4>
        <ul>
          <li>
            <router-link :to="$i18nRoute({path:'/documents/agreement'})">{{$t('m.footerMenu.user')}}</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/documents/privacy'})">{{$t('m.footerMenu.privacy')}}</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/documents/terms'})">{{$t('m.footerMenu.service')}}</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/documents/anti-money'})">Anti-Money Laundering Policy</router-link>
          </li>
          <li>
            <a :href="$t('m.footerMenu.feeHref')">{{$t('m.footerMenu.fee')}}</a>
          </li>
        </ul>
      </div> -->
      <div class="footer-link"
           :class="key===2 ? 'active':''"
           @click="changeKey(2)">
        <span class="show">+</span>
        <h4>Contact US</h4>
        <ul>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004288496">Business</a>
          </li>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004038275">Enquiries</a>
          </li>

          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004917316">Listings</a>
          </li>
        </ul>
      </div>
      <div class="footer-link"
           :class="key===2 ? 'active':''"
           @click="changeKey(2)">
        <span class="show">+</span>
        <h4>Support</h4>
        <ul>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/categories/360000727035-FAQ-">FAQ</a>
          </li>
          <li>
            <a target="_blank"
               href="https://riostox.zendesk.com/hc/en-us/requests/new?ticket_form_id=360004336956">Report An Issue</a>
          </li>
        </ul>
      </div>
      <div class="footer-link"
           :class="key===3 ? 'active':''"
           @click="changeKey(3)">
        <span class="show">+</span>
        <h4>{{$t('m.footerMenu.download')}}</h4>
        <ul>
          <li>
            <router-link :to="$i18nRoute({path:'/app_download'})">iOS</router-link>
          </li>
          <li>
            <router-link :to="$i18nRoute({path:'/app_download'})">Android</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footerTopRightTitle">
      <p>
        {{$t('m.newHome.malaysia')}}
      </p>
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
      font-size: 14px;
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
  text-align: center;
  border-top: 1px solid #fff;
  margin-bottom: 60px;
  p {
    margin: 30px 0px;
  }
}
</style>
