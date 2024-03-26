<template>
  <div class="advantage jcc">
    <div class="wrap">
      <div class="adv adv1">
        <img src="//i.riostox.com/i/d5/d582f8d4e14fac36ef49b1600d7e967e.png" alt>
        <div class="title">High Flow</div>
        <p>Fast and efficient transactions and low rates</p>
        <!-- <p>{{$t('m.index.highLiquidityTwoDesc')}}</p> -->
      </div>
      <div class="adv adv2">
        <img src="//i.riostox.com/i/6b/6b624e3fd28a9f7cf20d8c144862ece8.png" alt>
        <div class="title">Reliability</div>
        <p>7X24 hours trading digital currencies</p>
        <!-- <p>{{$t('m.index.reliabilityTwoDesc')}}</p> -->
      </div>
      <div class="adv adv3">
        <img src="//i.riostox.com/i/c4/c4b0145def0470c574ee1cfe2d28130c.png" alt>
        <div class="title">Safety</div>
        <p>Rich experience in digital asset financial services, and professional distributed structure.</p>
        <!-- <p>{{$t('m.index.securityTwoDesc')}}</p> -->
      </div>
      <div class="adv adv4">
        <img src="//i.riostox.com/i/5f/5f0f96381f8334d232a12c8cb86af826.png" alt>
        <div class="title">Diversified Investment</div>
        <p>According to the user’s risk appetite, various investment targets including currency trading & OTC.</p>
        <!-- <p>{{$t('m.index.multipleInvestmentTwoDesc')}}</p> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advantage {
  padding: 80px 0 138px;
  display: flex;
  .wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 1400px;
  }
  img {
    width: 185px;
    height: 185px;
    margin: 0 auto 20px;
  }
  .adv1 {
    width: 180px;
  }
  .adv2 {
    width: 286px;
  }
  .adv3 {
    width: 238px;
  }
  .adv4 {
    width: 256px;
  }
  .title {
    margin-bottom: 10px;
    font-size: 28px;
    color: #111111;
  }
  .adv {
    text-align: center;
    p {
      color: #999999;
      font-size: 15px;
      line-height: 21px;
    }
  }
}

@include screen-md-new() {
  .advantage {
    padding: 80px 0 84px;
    .wrap {
      width: 1082px;
    }
  }
}

@include screen-sm-new() {
  .advantage {
    padding: 40px 0 0;
    .wrap {
      width: 700px;
      .adv {
        margin-bottom: 70px;
      }
    }
  }
}

@include screen-h5-new() {
  .advantage {
    padding: 40px 0 0;
    .wrap {
      width: pxtovw(248px);
      flex-direction: column;
      .adv {
        margin: 0 auto pxtovw(80px);
        width: 100%;
      }
    }
  }
}
</style>

