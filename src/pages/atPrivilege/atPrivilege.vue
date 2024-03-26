<template>
  <div class="main">
    <div class="banner">
      <div class="title">Enjoy the AT Privilege & Get AT Today!</div>
      <div class="purchaseAt" @click="toDeposite">Purchase AT</div>
    </div>
    <div class="introduction">
      <h5>What is AT？</h5>
      <div class="content">
        <div class="left">
          <div class="at-introduction-illustration"></div>
        </div>
        <div class="right">
          <p>
            Riostox Token (AT) is the native token of Riostox Exchange (Riostox). As a
            key component of the digital asset ecosystem, AT plays a critical
            role in building consensus and creating shared value in the
            community.
          </p>
          <p>
            Current circulating supply of AT is at 104,343,750 out of a total
            supply of 146,015,625 AT. The team investors are allocated the
            remainder of tokens and are locked up for 3 years.
          </p>
          <p>
            AT holders currently enjoy multiple benefits, such as additional
            rewards from Riostox campaigns, airdrops and a trading fee rebate. More
            benefits are in the pipeline for other stake holders, such as
            Blockchain projects listed on the exchange and institutional
            investors to create an ecosystem for parties.
          </p>
        </div>
      </div>
    </div>
    <div class="middle-banner"></div>
    <div class="at-privilege-program">
      <h5>AT Privilege Program</h5>
      <div class="content">
        <div class="fearture-first">
          <div class="description">
            <h6>
              Reward Multiplier
            </h6>
            <!--            <div class="underline"></div>-->
            <p>
              Receive more rewards for each campaign by being an AT holder. For
              every trading competition AT holders participate in, they receive
              more rewards than a normal user.
            </p>
            <p>
              Bonus rewards are tiered based on your AT holdings— The more AT
              you hold, the greater your bonus rewards!
            </p>
          </div>
          <div class="des-img">
            <div class="at-feature-illustration"></div>
          </div>
        </div>
        <div class="fearture-sencond">
          <div class="des-img">
            <div class="at-feature-illustration"></div>
          </div>
          <div class="description">
            <h6>
              Eligible for Airdrop
            </h6>
            <!--            <div class="underline"></div>-->
            <p>
              Users who belong in the Elite tier (hold more than 40,000 AT) are
              guaranteed new listing airdrops. Depending on the number of tokens
              allocated to airdrops, Prestige tier users may be eligible as
              well.
            </p>
            <p>
              Why take the chance? Join the Elite tier to receive airdrops
              automatically!
            </p>
          </div>
        </div>
        <div class="fearture-third">
          <div class="description">
            <h6>
              Access to All Riostox Weekly Quests
            </h6>
            <!--            <div class="underline"></div>-->
            <p>
              AT token holders can take part in more weekly quests and be
              rewarded in AT. These weekly quests include but are not limited to
              simple deposits and trades of selected tokens each week.
            </p>
            <p>
              With each completed task, you accumulate quest points that are
              converted to AT token! For every 100 quest points accumulated, you
              will receive 100 AT！
            </p>
          </div>
          <div class="des-img">
            <div class="at-feature-illustration"></div>
          </div>
        </div>
        <div class="fearture-fourth">
          <div class="des-img">
            <div class="at-feature-illustration"></div>
          </div>
          <div class="description">
            <h6>
              Trading Fee Rebate
            </h6>
            <!--            <div class="underline"></div>-->
            <p>
              Be rewarded with rebates of up to 40% on your trading fees! The
              more AT tokens you hold, the more rebates you will receive.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="at-data">
      <h5>AT Market Data</h5>
      <div class="content">
        <img src="../../assets/images/at-privilege-chart-en.jpg" alt="" />
        <!--        <div class="left"></div>-->
        <!--        <div class="right">-->
        <!--          <div class="des-content"></div>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="bottom">
      <div class="purchase-at" @click="toDeposite">Purchase AT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'atPrivilege',
  methods: {
    toDeposite() {
      this.$router.replace(
        this.$i18nRoute({
          name: 'rechargeCurrency',
          params: {
            currency: 'at',
          },
        }),
      )
    }
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
    .banner {
      background: url("../../assets/images/atPrivilege/at-Banner.png");
      width: 100%;
      background-size: cover;
      height: 668px;
      position: relative;
      .title {
        position: absolute;
        left: 362px;
        top: 233px;
        width: 475px;
        height: 87px;
        font-size: 36px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 48px;
      }
      .purchaseAt {
        width: 200px;
        height: 60px;
        line-height: 60px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px;
        font-size: 24px;
        font-weight: bold;
        position: absolute;
        bottom: 260px;
        left: 360px;
        color: #2630a4;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
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
    .at-privilege-program {
      margin-top: 40px;
      h5 {
        @include title;
      }
      .content {
        margin-top: 20px;
        h6 {
          width: 234px;
          height: 28px;
          font-size: 26px;
          font-weight: bold;
          color: rgba(9, 8, 80, 1);
        }
        p {
          font-size: 20px;
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
        .fearture-first {
          display: flex;
          .description {
            flex: 1;
            h6 {
              margin-left: 335px;
              margin-top: 80px;
            }
            p {
              margin-left: 335px;
            }
          }
          .des-img {
            flex: 1;
            .at-feature-illustration {
              background: url("../../assets/images/RewardMultiplier-bg.png");
              width: 576px;
              height: 509px;
              margin-left: 10px;
            }
          }
        }
        .fearture-sencond {
          display: flex;
          margin-top: 100px;
          .description {
            flex: 1;
            h6 {
              margin-left: 80px;
              margin-right: 200px;
            }
            p {
              margin-left: 80px;
              margin-right: 200px;
            }
          }
          .des-img {
            flex: 1;
            .at-feature-illustration {
              background: url("../../assets/images/Eligibleforairdrop-bg.png");
              width: 476px;
              height: 432px;
              margin-left: 290px;
            }
          }
        }
        .fearture-third {
          display: flex;
          .description {
            flex: 1;
            h6 {
              width: 452px;
              margin-left: 335px;
              margin-top: 80px;
            }
            p {
              margin-left: 335px;
            }
          }
          .des-img {
            flex: 1;
            .at-feature-illustration {
              background: url("../../assets/images/AccesstoAllRiostoxWeeklyQuests-bg.png");
              width: 666px;
              height: 431px;
              margin-left: 10px;
            }
          }
        }
        .fearture-fourth {
          display: inline-block;
          margin-top: 100px;
          position: relative;
          .description {
            position: absolute;
            top: 20px;
            left: 930px;
          }
          .des-img {
            .at-feature-illustration {
              background: url("../../assets/images/Tradingfeerebate-bg.png");
              width: 1050px;
              height: 508px;
              margin-left: 290px;
              margin-top: 260px;
            }
          }
        }
      }
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
