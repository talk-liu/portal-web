<template>
  <div class="aboutus-page">
    <div class="content-section">
      <div class="aboutus-wrap">
        <div class="title fm">{{$t('m.aboutus.title')}}</div>
        <div class="about-icon_box" :class="{en: $fifth.lang !== 'zh-CN'}">
          <div class="icon-item" :class="{'icon-item2': $fifth.lang !== 'zh-CN'}">
            <img class="img-1" src="../../assets/images/aboutus-1.png">
            <h4>{{$t('m.aboutus.itemTwoTitle')}}</h4>
            <div class="xs-hide">{{$t('m.aboutus.itemTwoText')}}</div>
          </div>
          <div class="icon-item" :class="{'icon-item3': $fifth.lang !== 'zh-CN'}">
            <img class="img-2" src="../../assets/images/aboutus-2.png">
            <h4>{{$t('m.aboutus.itemThreeTitle')}}</h4>
            <div class="xs-hide">{{$t('m.aboutus.itemThreeText')}}</div>
          </div>
          <div class="icon-item">
            <img class="img-3" src="../../assets/images/aboutus-3.png">
            <h4>{{$t('m.aboutus.itemFourTitle')}}</h4>
            <div class="xs-hide">{{$t('m.aboutus.itemFourText')}}</div>
          </div>
        </div>
        <div class="desc-wrap">
          <div class="desc-item">
            <h4>About Riostox</h4>
            <div class="desc-text">
              Riostox is a world-class Digital Аssеts  exchange. We aim to provide a frictionless, user-centric trading experience.
            </div>
          </div>
          <div class="desc-item">
            <h4>{{$t('m.aboutus.descTitleTwo')}}</h4>
            <div class="desc-text">We embrace the philosophy of Dеcentralized Technology —open, frictionless and participatory. Riostox focuses on helping investors identify valuable Dеcentralized Technology assets, offering a secure online trading platform and providing professional trading services.</div>
          </div>
          <div class="desc-item">
            <h4>{{$t('m.aboutus.descTitleThree')}}</h4>
            <div class="desc-text">Riostox Exchange was founded by Calvin Cheng, a technology and media magnate, and other co-founders with a broad range of experience and track record at some of the most successful Internet, financial services and management consulting firms.</div>
          </div>
        </div>
        <!--        <div class="clearfix investor-advisor">-->
        <!--          <investor></investor>-->
        <!--        </div>-->

        <!--        <div class="clearfix investor-org-box">-->
        <!--          <div class="intro-title">-->
        <!--            {{$t('m.home.investorTitle')}}-->
        <!--          </div>-->
        <!--          <investor-org></investor-org>-->
        <!--        </div>-->
      </div>

    </div>
  </div>
</template>

<script>
import Investor from './investor-item'
import InvestorOrg from './investor-org'

export default {
  components: {
    InvestorOrg,
    Investor,
  },
}
</script>

<style lang="scss" scoped>
.content-section {
  margin: 20px auto 50px;
  padding: 10px 40px 15px;
  width: 1200px;
  min-height: 700px;
  background-color: #ffffff;
  border: 1px solid #eaedf5;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px 0;
}

.aboutus-page {
  background: #f6f6f6;
  overflow: hidden;
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
  .investor-advisor {
    //margin-left: 20px;
  }

  .intro-title {
    //padding-left: 25px;
    font-size: 20px;
    color: $color-text;
    font-weight: bold;
  }
  .investor-org-box {
    margin: 0 15px;
    padding-top: 50px;
    padding-bottom: 100px;
    border-top: 1px dashed $color-line;

    .intro-title {
      margin-bottom: 30px;
    }
  }

  .aboutus-wrap {
    .title {
      font-size: 24px;
      border-bottom: 1px solid $color-line;
      padding-bottom: 15px;
    }

    .about-icon_box {
      display: flex;
      justify-content: space-around;
      margin-top: 110px;
      padding-bottom: 100px;

      &.en {
        .icon-item {
          padding: 0 35px;
          &:last-of-type {
            width: 300px;
          }
        }
      }

      .icon-item {
        padding: 0 80px;
        text-align: center;

        &:not(:last-of-type) {
          border-right: 1px solid $color-line;
        }

        img {
          display: block;
          margin: 0 auto;
        }

        .img-0 {
          width: 65px;
          height: 66px;
        }

        .img-1 {
          width: 57px;
          height: 70px;
        }

        .img-2 {
          width: 63px;
          height: 74px;
        }

        .img-3 {
          width: 57px;
          height: 70px;
        }

        h4 {
          margin: 20px 0 10px;
          font-size: 26px;
          color: $color-text;
          font-weight: 500;
        }

        div {
          font-size: 13px;
          color: $color-assist2;
          line-height: 1.7;
        }
      }
    }

    .desc-wrap {
      margin: 0 20px 50px;
      padding: 50px 0;
      border-bottom: 1px solid $color-line;
      border-top: 1px solid $color-line;

      .desc-item {
        margin-bottom: 30px;
        padding-bottom: 20px;

        &:not(:last-of-type) {
          border-bottom: 1px dashed $color-line;
        }

        h4 {
          font-size: 20px;
          color: $color-text;
        }

        .desc-text {
          margin-top: 10px;
          font-size: 14px;
          line-height: 20px;
          color: $color-assist1;
        }
      }
    }
  }
}

@include screen-h5-new() {
  .content-section {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 700px;
    background-color: #ffffff;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
  .aboutus-page {
    .investor-advisor {
      margin-bottom: 50px;
    }
    .intro-title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    .investor-org-box {
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
      border-top: none;
      .intro-title {
        margin-bottom: 15px;
      }
    }
    .aboutus-wrap {
      padding: 18px;
      .title {
        // display: none;
        margin-bottom: 10px;
        text-align: center;
        border: none;
      }
      .about-icon_box {
        // display: flex;
        justify-content: start;
        flex-wrap: wrap;
        margin-top: 0;
        padding-bottom: 0;
        .xs-hide {
          display: none;
        }
        .icon-item {
          width: 49%;
          height: 120px;
          padding: 0;
          padding-right: 0;
          padding-bottom: 0;
          margin-right: 2%;
          margin-bottom: 10px;
          text-align: center;
          background: #f6f6f6;
          border-radius: 8px;
          display: inline-block;
          &:not(:last-of-type) {
            border-right: none;
          }
          &:nth-child(2n) {
            margin-right: 0;
          }
          img {
            display: block;
            margin: 20px auto 0;
          }
          .img-0,
          .img-1,
          .img-2,
          .img-3 {
            width: 43px;
            height: 53px;
          }
          h4 {
            margin: 8px 0 0;
            font-size: 15px;
          }
          div {
            font-size: 13px;
            color: $color-assist2;
            line-height: 1.7;
          }
        }
        &.en {
          .icon-item {
            padding: 0;
            &:last-of-type {
              width: 49%;
            }
            h4 {
              font-size: 12px;
            }
          }
        }
      }
      .desc-wrap {
        margin: 0;
        margin-top: 30px;
        padding: 0;
        border: none;
        .desc-item {
          margin-bottom: 17px;
          padding-bottom: 0;
          &:not(:last-of-type) {
            border-bottom: none;
          }
          h4 {
            font-size: 15px;
            color: $color-text;
          }
          .desc-text {
            margin-top: 10px;
            font-size: 12px;
            line-height: 20px;
            color: $color-assist1;
          }
        }
      }
    }
  }
}
</style>
