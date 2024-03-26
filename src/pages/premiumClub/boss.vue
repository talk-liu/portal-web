<template>
  <div class="at-privilege-program">
    <div class="content">
      <div class="fearture-sencond">
        <div class="des-img">
          <div class="at-feature-illustration"></div>
        </div>
        <div class="description">
          <p>
            Riostox is a well-managed crypto exchange that comes with a host of technology
            that no one is aware of. Riostox comes not just with a great brand name but being
            in Singapore makes it perfect with upcoming PSA licenses which will provide
            confidence to traders and investors globally. Investors want to trade on exchanges
            that are licensed in reputable countries that take regulation seriously.
          </p>
          <h6>
            Calvin Ng - Riostox President
          </h6>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
@mixin title {
  font-size: 30px;
  font-weight: bold;
  color: rgba(9, 8, 80, 1);
  text-align: center;
}

.at-privilege-program {
  margin-top: 30px;
  h5 {
    @include title;
  }
  .content {
    margin-top: 20px;
    h6 {
      height: 28px;
      font-size: 26px;
      font-weight: bold;
      color: rgba(9, 8, 80, 1);
    }
    p {
      font-size: 18px;
      font-weight: 400;
      color: rgba(9, 8, 80, 1);
      line-height: 36px;
      margin-top: 27px;
    }
    .at-feature-illustration {
      background-size: cover;
      margin: 0 auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .fearture-sencond {
      display: flex;
      margin-top: 50px;
      .description {
        flex: 1;
        p {
          margin-top: 60px;
          margin-left: 1px;
          min-width: 500px;
          max-width: 800px;
        }
        h6 {
          margin-top: 60px;
          margin-left: 1px;
          text-align: right;
          min-width: 500px;
          max-width: 800px;
        }
      }
      .des-img {
        flex: 1;
        .at-feature-illustration {
          background: url("../../assets/images/boss.png");
          width: 476px;
          height: 467px;
          margin-right: 100px;
          float: right;
        }
      }
    }
  }
}

</style>

