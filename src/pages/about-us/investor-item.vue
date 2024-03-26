<template>
  <div class="investor">
    <div class="intro-title xs-hide">
      {{$t('m.home.introTitle')}}
    </div>
    <div class="intro-title xs-show">
      {{$t('m.home.investor')}}
    </div>
    <div class="investor-info clearfix xs-show">
      <div class="item">
        <img src="../../assets/images/investor-chen.png" class="avatar">
        <h4>{{$t('m.home.chen')}}</h4>
        <h5>{{$t('m.home.chenTitle')}}</h5>
        <p v-html="$t('m.home.chenDesc')"></p>
      </div>
    </div>
    <div class="intro-title xs-show">
      {{$t('m.home.advisors')}}
    </div>
    <div class="investor-info clearfix">
      <div class="investor-info-list" :class="{en: $fifth.lang !== 'zh-CN'}">
        <div class="item">
          <img src="../../assets/images/doc-mai.png" class="avatar">
          <h4>{{$t('m.home.mai')}}</h4>
          <h5>{{$t('m.home.maiTitle')}}</h5>
          <p v-html="$t('m.home.maiDesc')"></p>
        </div>
        <div class="item">
          <img src="../../assets/images/investor-zhang.png" class="avatar">
          <h4>{{$t('m.home.zhang')}}</h4>
          <h5>{{$t('m.home.zhangTitle')}}</h5>
          <p v-html="$t('m.home.zhangDesc')"></p>
        </div>
        <div class="item">
          <img src="../../assets/images/investor-yu.png" class="avatar">
          <h4>{{$t('m.home.yu')}}</h4>
          <h5>{{$t('m.home.yuTitle')}}</h5>
          <p v-html="$t('m.home.yuDesc')"></p>
        </div>
        <div class="item xs-hide">
          <img src="../../assets/images/investor-chen.png" class="avatar">
          <h4>{{$t('m.home.chen')}}</h4>
          <h5>{{$t('m.home.chenTitle')}}</h5>
          <p v-html="$t('m.home.chenDesc')"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xs-hide {
  display: block;
}

.xs-show {
  display: none;
}

.investor {
  margin: 0 15px;
}

.intro-title {
  font-size: 20px;
  color: $color-text;
  text-align: left;
  font-weight: bold;
  margin: 0;
}

.investor-info {
  margin-top: 30px;
  .investor-info-list {
    display: flex;
    justify-content: space-between;
    &.en {
      p {
        text-align: center;
      }
    }
  }
  .item {
    width: 260px;
    margin-bottom: 30px;
    vertical-align: top;
    padding: 30px 19px;
    background: #f9f9f9;
    border-radius: 4px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    margin: 0 auto;
    display: block;
    border: none;
  }
  h4 {
    margin-top: 20px;
    font-size: 18px;
    color: $color-text;
    text-align: center;
  }

  h5 {
    text-align: center;
    font-size: 13px;
    color: $color-assist2;
    margin-top: 5px;
    line-height: 1.7;
    font-weight: normal;
  }

  p {
    margin-top: 20px;
    font-size: 12px;
    color: $color-assist1;
    text-align: left;
    line-height: 1.7;
  }
}

@include screen-xs() {
  .xs-hide {
    display: none;
  }
  .xs-show {
    display: block;
  }
  .investor {
    margin: 0;
  }
  .intro-title {
    font-size: 16px;
    color: $color-text;
    text-align: center;
    font-weight: bold;
    margin: 40px 0 15px;
  }
  .investor-info {
    margin-top: 0;
    .investor-info-list {
      display: block;
      &.en {
        p {
          text-align: left;
        }
      }
    }
    .item {
      margin: 0 auto 20px;
      padding: 30px 30px 70px;
      width: 100%;
      background: #f9f9f9;
      border-radius: 4px;
    }
  }
}
</style>
