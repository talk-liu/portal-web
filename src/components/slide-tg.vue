<template>
  <div class="slide-tg_wrap">
    <a href="javascript:;" target="_blank" @click="goTg">
      <i class="iconfont icon-telegram"></i>
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    teleHref() {
      return {
        'zh-CN': 'https://t.me/riostox_cn',
        en: 'https://t.me/riostox_en',
        ru: 'https://t.me/riostox_ru',
        ko: 'https://t.me/riostox_Korean',
        jp: 'https://t.me/riostox_jp',
        vi: 'https://t.me/riostox_vn',
      }
    },
  },
  methods: {
    goTg() {
      window.gtag &&
        window.gtag('event', 'tg-click', {
          event_category: 'click',
          event_label: 'tg-click',
        })
      const local = this.teleHref[window.gon.local] ? window.gon.local : 'en'
      window.open(this.teleHref[local])
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.slide-tg_wrap {
  position: fixed;
  //padding: 10px;
  //right: 20px;
  left: 50%;
  margin-left: 620px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  background-color: $color-primary;
  border-radius: 8px;
  box-shadow: rgba(255, 210, 0, 0.33) 0 2px 4px 0;
  z-index: 999;

  a {
    display: block;
    padding: 10px;
    width: 100%;
    height: 100%;
    color: $color-text;

    i {
      margin-left: -3px;
      font-size: 28px;
    }
  }
}

@media only screen and (max-width: 1400px) {
  .slide-tg_wrap {
    left: inherit;
    right: 20px;
    margin-left: 0;
  }
}
</style>
