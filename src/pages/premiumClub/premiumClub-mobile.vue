<template>
  <div class="wrap">
    <div class="banner">
      <div class="title">Enjoy the AT Privilege & Get AT Today!</div>
      <div class="purchaseAt" @click="toDeposite" >Purchase AT</div>
    </div>
    <div class="introduction">
      <h5>What is AT？</h5>
      <div class="content">
        <p>
          Riostox Token (AT) is the native token of Riostox Exchange (Riostox). As a
          key component of the digital asset ecosystem, AT plays a critical
          role in building consensus and creating shared value in the
          community.
        </p>
        <div class="at-introduction-illustration"></div>
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
    <div class="middle-banner"></div>
    <div class="at-privilege-program">
      <h5>AT Privilege Program</h5>
      <div class="content">
        <div class="fearture-first">
          <div class="description">
            <h6>
              Reward Multiplier
            </h6>
            <div class="underline"></div>
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
          <div class="description">
            <h6>
              Eligible for Airdrop
            </h6>
            <div class="underline"></div>
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
          <div class="des-img">
            <div class="at-feature-illustration"></div>
          </div>
        </div>
        <div class="fearture-third">
          <div class="description">
            <h6>
              Access to All Riostox Weekly Quests
            </h6>
            <div class="underline"></div>
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
          <div class="description">
            <h6>
              Trading Fee Rebate
            </h6>
            <div class="underline"></div>
            <p>
              Be rewarded with rebates of up to 40% on your trading fees! The
              more AT tokens you hold, the more rebates you will receive.
            </p>
          </div>
          <div class="des-img">
            <div class="at-feature-illustration"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="at-data">
      <h5>AT Market Data</h5>
      <div class="content">
        <img src="../../assets/images/at-privilege-chart-en.jpg"  height="185" />
      </div>
    </div>
    <div class="bottom"><div class="purchase-at" @click="toDeposite">Purchase AT</div></div>
  </div>
</template>

<script>
export default {
  name: 'atPrivilege-mobile',
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
    font-size: 15px;
    font-weight: bold;
    color: rgba(9, 8, 80, 1);
    text-align: center;
  }

  .wrap {
    font-family: $font-family-base;
    .banner {
      background: url("../../assets/images/atPrivilege/at-Banner.png");
      background-size: 100% 155px;
      background-repeat: no-repeat;
      width: 100%;
      height: 155px;
      position: relative;
      .title {
        position: absolute;
        left: 50px;
        top: 60px;
        width: 200px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .purchaseAt {
        width: 80px;
        height: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px;
        font-size: 10px;
        font-weight: bold;
        position: absolute;
        bottom: 30px;
        left: 50px;
        color: #2630a4;
        text-align: center;
        line-height: 20px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .introduction {
      margin-top: 20px;
      margin-bottom: 20px;
      h5 {
        @include title;
      }
      .content {
        margin-top: 20px;
        margin-left: 35px;
        margin-right: 35px;
        .at-introduction-illustration {
          width: 100%;
          height: 225px;
          background: url("../../assets/images/AT解说插图.png");
          background-size: 100% auto;
          background-repeat: no-repeat;
          margin: 0 auto;
        }
        p {
          font-size: 9px;
          line-height: 36px;
          color: #090850;
          font-weight: bold;
          &:nth-child(2) {
            margin-top: 30px;
          }
          &:nth-child(3) {
            margin-top: 30px;
          }
        }
      }
    }
    .middle-banner {
      width: 100%;
      height: 80px;
      background: url("../../assets/images/middle-banenr-AT.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
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
          font-size: 13px;
          font-weight: bold;
          color: rgba(9, 8, 80, 1);
          margin: 0 auto;
          text-align: center;
        }
        p {
          font-size: 10px;
          font-weight: 400;
          color: rgba(9, 8, 80, 1);
          line-height: 36px;
          margin-top: 27px;
          margin-left: 10px;
          margin-right: 10px;
        }
        .underline {
          width: 32px;
          height: 4px;
          background: linear-gradient(90deg, rgba(252, 174, 112, 1) 0%, rgba(251, 109, 112, 1) 100%);
          margin: -10px auto;
        }
        .fearture-first {
          .des-img {
            .at-feature-illustration {
              background: url("../../assets/images/RewardMultiplier-bg.png");
              background-repeat: no-repeat;
              background-size: 100% auto;
              margin: 0 35px;
              height: 275px;
            }
          }
        }
        .fearture-sencond {
          .des-img {
            .at-feature-illustration {
              background: url("../../assets/images/Eligibleforairdrop-bg.png");
              background-repeat: no-repeat;
              background-size: 100% auto;
              margin: 0 35px;
              height: 275px;
            }
          }
        }
        .fearture-third {
          margin-top: 30px;
          .des-img {
            .at-feature-illustration {
              background: url("../../assets/images/AccesstoAllRiostoxWeeklyQuests-bg.png");
              background-repeat: no-repeat;
              background-size: 100% auto;
              margin: 0 35px;
              height: 275px;
            }
          }
        }
        .fearture-fourth {
          .des-img {
            .at-feature-illustration {
              background: url("../../assets/images/Tradingfeerebate-bg.png");
              background-repeat: no-repeat;
              background-size: 100% auto;
              margin: 0 35px;
              height: 165px;
            }
          }
        }
      }
    }
    .at-data {
      margin-top: 20px;
      h5 {
        @include title;
      }
      .content {
        margin: 10px auto 0;
        img {
          display: block;
          margin: 0 auto;
        }
      }
    }
    .bottom {
      margin-top: 50px;
      background: url("../../assets/images/bottom-bg.png");
      background-size: 100% auto;
      background-repeat: no-repeat;
      width: 100%;
      height: 60px;
      // 购买at按钮
      .purchase-at {
        width: 80px;
        height: 20px;
        line-height: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
        font-size: 10px;
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
