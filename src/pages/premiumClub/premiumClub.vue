<template>
  <div class="main">
    <banner/>
    <inverstor/>
    <server/>
    <boss/>
    <partner/>
    <featured/>
  </div>
</template>

<script>
import inverstor from './inverstor'
import banner from './banner'
import server from './server'
import boss from './boss'
import partner from './partner'
import featured from './featured'

export default {
  name: 'premiumClub',
  components: {
    inverstor,
    banner,
    boss,
    server,
    partner,
    featured
  }
}
</script>

<style lang="scss" scoped>
  @mixin title {
    font-size: 30px;
    font-weight: bold;
    color: rgba(9, 8, 80, 1);
    text-align: center;
  }

  .main {
    font-family: $font-family-base;
    background: url("../../assets/images/at-big-bg.png");
    background-size: 100% 100%;
    .introduction {
      margin-top: 20px;
      margin-bottom: 10px;
      h5 {
        @include title;
      }
      .content {
        display: flex;
        margin-top: 35px;
        .left {
          flex: 1;
          .at-introduction-illustration {
            width: 426px;
            height: 335px;
            background: url("../../assets/images/AT解说插图.png");
            background-size: cover;
            margin-left: 280px;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .right {
          flex: 1;
          p {
            margin-right: 215px;
            font-size: 18px;
            line-height: 36px;
            color: #090850;
            font-weight: bold;
            &:nth-child(2) {
              margin-top: 25px;
            }
            &:nth-child(3) {
              margin-top: 25px;
            }
          }
        }
      }
    }
    .middle-banner {
      width: 100%;
      height: 365px;
      background: url("../../assets/images/middle-banenr-AT.png");
      background-size: cover;
    }
    .at-data {
      margin-top: -200px;
      h5 {
        @include title;
      }
      .content {
        margin: 80px auto 0;
        min-width: 1000px;
        img {
          display: block;
          margin: 0 auto;
        }
        .left {
          background: url("../../assets/images/at-privilege-chart-en.jpg");
          width: 500px;
          height: 275px;
          background-size: cover;
          margin-left: 440px;
          margin-top: 100px;
        }
        .right {
          width: 300px;
          height: 380px;
          background: linear-gradient(35deg, rgba(46, 57, 179, 1) 0%, rgba(95, 27, 179, 1) 100%);
          border-radius: 6px;
          margin-top: 50px;
          .des-content {
            margin: 15px 15px 40px 15px;
            background-color: #ffffff;
            height: 325px;
          }
        }
      }
    }
    .bottom {
      margin-top: 50px;
      background: url("../../assets/images/bottom-bg.png");
      background-size: cover;
      width: 100%;
      height: 357px;
      // 购买at按钮
      .purchase-at {
        width: 200px;
        height: 60px;
        line-height: 60px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px;
        font-size: 24px;
        font-weight: bold;
        color: #2630a4;
        text-align: center;
        margin: 0 auto;
        &:hover {
          cursor: pointer;
        }

        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
