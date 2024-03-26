<template>
  <div class="banner">
    <div class="title">Private Capital Market & Service <br/>For Professional Investor</div>
    <div class="purchaseAt"><a href="https://forms.gle/U6pvYdqTdGkfheVU8" target="_blank">Start Journey</a></div>
    <div class="learnMore"><a href="https://s.riostox.com/pdf/29fed510755770fa55310cefa5782de28fb9d48874b8cd414395e21e6cc538fe.pdf" target="_blank">Learn more</a></div>
  </div>

</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
  .banner {
    background: url("../../assets/images/banner/banner1.png");
    width: 100%;
    background-size: cover;
    height: 460px;
    position: relative;
    .title {
      position: absolute;
      left: 362px;
      bottom: 260px;
      width: 475px;
      height: 87px;
      font-size: 26px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 48px;
    }
    .purchaseAt {
      width: 140px;
      height: 42px;
      line-height: 42px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      position: absolute;
      left: 360px;
      top: 233px;
      color: #2630a4;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
    .learnMore {
      width: 140px;
      height: 42px;
      line-height: 42px;
      background: rgba(36, 30, 101, 1);
      border-radius: 6px;
      border-style: solid;
      border-width: 1px;
      border-color: rgba(98, 100, 199, 1);
      font-size: 16px;
      font-weight: bold;
      position: absolute;
      left: 550px;
      top: 233px;
      color: #ffffff;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
      a {
        color: #ffffff;
      }
    }
  }
</style>

