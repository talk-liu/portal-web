<template>
  <div class="banner_wrap">
    <div class="content" :class="{small: list.length<4}">
      <div class="header">
        <span>{{bannerConfig.title}}</span>
        <a class="pull-right" :href="bannerConfig.linkText.href">{{bannerConfig.linkText.name}}</a>
      </div>
      <div class="banner-box">
        <div v-for="(item,index) in list" :key="index" class="banner-item" :class='{disabled:item.disabled}'>
          <img :src="item.icon">
          <div class="shadow"></div>
          <h3>{{item.title}}</h3>
          <p>{{item.desc}}</p>
          <h4>{{item.profit}} </h4>
          <!-- todo: 做成单页后改跳转方式-->
          <a v-if='item.notice' :href="item.notice.href">{{item.notice.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: Function,
    },
    bannerConfig: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
  .banner-item.disabled {
    h4 {
      color: #777777;
    }
  }

  .banner_wrap {
    padding: 20px 0;
    background-color: #fafafa;
    text-align: center;
    color: #333333;
    .content {
      padding: 0 15px;
      margin: 0 auto;
      max-width: 1200px;
      &.small {
        max-width: 900px;
      }
    }
    .header {
      margin-bottom: 20px;
      span {
        margin-left: 40px;
        font-size: 15px;
      }
      a {
        color: #4c84ff;
        font-size: 13px;
      }
    }
    .banner-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .banner-item {
      margin-bottom: 10px;
      padding: 0 10px;
      height: 300px;
      width: 260px;
      background-color: #ffffff;
      font-size: 12px;
      &:nth-last-of-type(1) {
        margin-right: 0;
      }
      img {
        display: block;
        margin: 50px auto 10px;
        width: 59px;
        height: 59px;
      }
      .shadow {
        margin: 0 auto 35px;
        width: 34px;
        height: 2px;
        background-color: #d8d8d8;
        border-radius: 100%;
        box-shadow: #d8d8d8 0 0 10px;
      }
      h3 {
        font-size: 18px;
      }
      p {
        margin: 5px 0 10px;
        color: #777777;
        font-weight: 300;
      }
      h4 {
        margin-bottom: 16px;
        font-size: 13px;
      }
      a {
        color: #4c84ff;
      }
    }

    // @media (max-width: 850px) {
    //   .content {
    //     max-width: 650px;
    //   }
    //   .banner-box {
    //     max-width: 600px;
    //     margin: 0 auto;
    //   }
    //   .banner-item {
    //     margin-right: 0;
    //   }
    // }

    // @media (max-width: 550px) {
    //   .banner-item {
    //     width: 48%;
    //     height: 226px;
    //     h3 {
    //       margin-bottom: 10px;
    //       font-size: 16px;
    //     }
    //     img {
    //       margin: 35px auto;
    //       width: 48px;
    //       height: 48px;
    //     }
    //     p,
    //     h4 {
    //       display: none;
    //     }
    //   }
    // }
  }
</style>
