<template>
  <div class="productsBox">
    <div class="back"></div>
    <div class="products">
      <h2>Our Products</h2>
      <p class="ipsum">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt tincidunt vehicula. Curabitur
        dignissim, tellus ut rhoncus accumsan, sem urna lacinia arcu.
      </p>
      <ul class="productsList">
        <li v-for="item in productsList"
            :key="item"
            :style="{ 'background-image': 'url(' + item.url + ')' }">
          <div class="layer"></div>
          <div class="box">
            <h3>{{ item.title }}</h3>
            <h5>{{ item.value }}</h5>
            <p>{{ item.text }}</p>
            <router-link :to="$i18nRoute({path:'/pro/markets/btcusdt'})">Start Trading</router-link>
            <img src="" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productsList: [
        {
          title: 'Bitcoin Investment Made Easy',
          value: 'Trade and hold cryptocurrency with cash',
          text: 'RioStox is a streamlined bitcoin exchange for newcomers and experts alike. Make easy deposits and withdrawals, measure your portfolio performance and keep track of all of your digital assets in one convenient place.',
          url: require('@/assets/newImg/images/member/bann.png'),
        },
        {
          title: 'LABS',
          value: 'Enter the world of Fractionalized Property Investment',
          text: 'LABS is a digital investment platform that provides access to tokenized property ownership and enables the continuous trading of real estate assets-backed digitized shares on a regulated security exchange.',
          url: require('@/assets/newImg/images/member/bann1.png'),
        },
        {
          title: 'Tokenized Corporate Debt',
          value: 'Access structured financial products not commonly available in public markets',
          text: 'Debt products rely on regular dividend payments but long settlement times and manual processes slow the issuance process down. Middle men compound the problem by charging significant fees for these services. Tokenization allows debt issuers to alleviate these inefficiencies through automation.',
          url: require('@/assets/newImg/images/member/bann2.png'),
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.productsBox {
  background-color: #002060;
  position: relative;
  .back {
    background-image: url('../../assets/newImg/images/member/bann7.png');
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    mix-blend-mode: normal;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.14;
    transition: background 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
.products {
  max-width: 1440px;
  margin: auto;
  padding-top: 148px;
  color: #fff;
  position: relative;
  z-index: 1;
  h2 {
    font-size: 48px;
    text-align: center;
  }
  .ipsum {
    text-align: center;
    font-size: 16px;
    width: 600px;
    margin: auto;
    margin-top: 40px;
    margin: 40px auto 30px auto;
  }
  .productsList {
    padding-bottom: 100px;
    li {
      width: 1200px;
      height: 471px;
      background-size: cover;
      margin: auto;
      background-color: rgba(0, 0, 0, 1);
      border-radius: 5px;
      margin-bottom: 20px;
      position: relative;
      .layer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #031334 -1.52%, rgba(3, 19, 52, 0) 100%);
      }
      .box {
        width: 560px;
        padding-left: 78px;
        padding-top: 78px;
        position: relative;
        z-index: 1;
      }
      h3 {
        font-size: 48px;
      }
      h5 {
        color: #4e87f7;
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        margin-bottom: 20px;
      }
      a {
        background: #07e9b2;
        color: #002060;
        font-size: 18px;
        display: inline-block;
        width: 220px;
        height: 60px;
        border-radius: 4px;
        text-align: center;
        line-height: 60px;
      }
    }
  }
}
</style>
