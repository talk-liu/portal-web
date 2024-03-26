<template>
  <div class="at-privilege-program">
    <h5>Private Investor Programme</h5>
    <div class="content">
      <div class="fearture-first">
        <div class="description">
          <h6>
            Strong platform infrastructure & security
          </h6>
          <!--            <div class="underline"></div>-->
          <p>
            Riostox provides top tier infrastructure for our exchange, we use Amazon Webservices (AWS) cloud infrastructure
            and includes multiple layers of cybersecurity protections. For users, we enabled two-factor authentication, SMS
            message and Email confirmation to ensure all users will not be hacked by third parties and the website encrypted
            by SSL encryption.
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
            High level of User protection
          </h6>
          <p>
            Riostox is cunently under MAS regulation. Therefore, we have a highly secure management system and the best practice
            standards complying with the Singapore MAS legal regulatory. We have our own data protection officer to ensure our
            practice standards is above the market.<br/>
            In order to secure the assets of our clients, we employed the most advanced systems
            to provide AML/KYC services - Cynopsis Singapore for our KYC process and Merkle sciences for our AML process.
          </p>
        </div>
      </div>
      <div class="fearture-third">
        <div class="description">
          <h6>
            High Quality Projects
          </h6>
          <p>
            We have our own committee to provide a professional screening and approval process to safeguard
            the quality of investments products are offered for issuance and trading.<br/>
            All projects will be required to provide a legal opinion to us to ensure the product is on standard.
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
            Top-tier Personal Service
          </h6>
          <p>
            We offer personalized financial services to professional investors; we offer conventional and non-conventional
            ways for you to manage your assets. We do not just provide investment advice, but offer all of services exclusively,
            including managing portfolios, protecting and growing assets, future financial planning; basically, we manage the
            entire financial situation of the individuals.
          </p>
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
    margin-top: 40px;
    h5 {
      @include title;
    }
    .content {
      margin-top: 20px;
      h6 {
        width: 500px;
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
            margin-top: -50px;
            background: url("../../assets/images/Tradingfeerebate-bg.png");
            width: 476px;
            height: 432px;
            margin-left: 290px;
          }
        }
      }
    }
  }

</style>

