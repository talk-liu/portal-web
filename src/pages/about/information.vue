<template>
  <div class="wrapper">
    <div>
      <h1>What Is RioStox?</h1>
      <p>
        RioStox is a licensed security exchange regulated by Labuan Financial Services Authority (LFSA) that offers
        issuance, settlement, custody, and secondary trading of digitized securities.
      </p>
      <p>
        RioStox provides investors with access to private markets and alternative assets, such as cryptocurrencies,
        fractionalised real estate and digital assets hedge funds. It is based in Labuan and is open to all non-US
        retail, accredited, and institutionnal investors.
      </p>
    </div>
    <div>
      <img src="https://i.riostox.com/i/5c/5c55e360791c67e191b985bbf959a1d9.png" alt="RioStox" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {},
  watch: {},
}
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 1440px;
  margin: 130px auto;
  display: flex;
  align-items: center;
  padding: 0 30px;
  >div{
    margin-right: 20px;
  }
  div{
    flex: 1;
  }
  h1 {
    font-size: 60px;
    color: #002060;
    font-weight: bold;
  }
  p {
    font-size: 28px;
    margin-bottom: 40px;
  }
}
</style>
