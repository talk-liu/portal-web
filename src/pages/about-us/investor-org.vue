<template>
  <div class="investor-org_wrap europaRegilar">
    <div class="investor-org_item" :class="{en: $fifth.lang !== 'zh-CN'}">
      <img src="../../assets/images/investor-1.png" class="investor-1">
      <p>{{$t('m.home.investor1')}}</p>
    </div>
    <div class="investor-org_item" :class="{en: $fifth.lang !== 'zh-CN'}">
      <img src="../../assets/images/investor-2.png" class="investor-2">
      <p>{{$t('m.home.investor2')}}</p>
    </div>
    <div class="investor-org_item" :class="{en: $fifth.lang !== 'zh-CN'}">
      <img src="../../assets/images/investor-3.png" class="investor-3">
      <p>{{$t('m.home.investor3')}}</p>
    </div>
  </div>
</template>

<script>
// import Lang from '@/utils/lang'

export default {
  // mixins: [Lang],
}
</script>

<style lang="scss" scoped>

.investor-org_wrap {
  // font-family: euRegular;
  display: flex;
  justify-content: space-between;

  .investor-org_item {
    padding: 0 30px 50px;
    // margin-left: 30px;
    width: 280px;
    border: 1px dashed $color-line;
    text-align: center;
    // float: left;

    .investor-3 {
      margin-top: 25px;
      width: 110px;
      margin-bottom: 35px;
    }

    .investor-2 {
      margin-top: 30px;
      width: 200px;
      height: 80px;
      margin-bottom: 45px;
    }

    .investor-1 {
      margin-top: 55px;
      width: 200px;
      height: 26px;
      margin-bottom: 70px;
    }

    &.en {
      p {
        text-align: center;
      }
    }

    h4 {
      margin-bottom: 15px;
      color: $color-text;
      font-size: 16px;
    }

    p {
      font-size: 12px;
      color: $color-assist1;
      line-height: 1.7;
      text-align: left;
    }
  }
}

@include screen-xs() {

  .investor-org_wrap {
    // font-family: euRegular;
    flex-wrap: wrap;
    .investor-org_item {
      padding: 30px 30px 40px;
      width: 100%;
      border: 1px dashed $color-line;
      text-align: center;
      margin: 0 auto 20px;
      border-radius: 4px;
      height: inherit;
      h4 {
        margin-bottom: 15px;
        color: $color-text;
        font-size: 16px;
      }
      .investor-1 {
        width: 200px;
        display: block;
        margin: 20px auto 44px;
      }
      .investor-2 {
        width: 200px;
        display: block;
        margin: 0 auto 44px;
      }
      .investor-3 {
        width: 110px;
        display: block;
        margin: 0 auto 34px;
      }
      p {
        font-size: 12px;
        color: $color-assist1;
        text-align: left;
        line-height: 1.7;
      }
      &.en {
        p {
          text-align: left;
        }
      }
    }
  }
}
</style>
