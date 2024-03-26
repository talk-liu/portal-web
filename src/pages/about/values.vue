<template>
  <div class="wrapper">
    <div>
      <h1>RioStox Values</h1>
      <h3>Fostering Growth and Prosperity for All</h3>
      <p>
        At RioStox, we understand that our responsibilities go beyond our status as a market place. Our issuer, business
        partners and the wider community look to us to lead the way and set an example. Our role in the community, and
        our commitment to being a responsible leader is a critical part of our business strategy and of our future.
      </p>
      <span>Calvin Ng, RioStox Director/President</span>
    </div>
    <div>
      <img src="https://i.riostox.com/i/f2/f2f7a00b094718883af2ba2b24ab7ea2.png" alt="RioStox" />
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
  > div {
    margin-right: 20px;
  }
  div {
    flex: 1;
  }
  h1 {
    font-size: 60px;
    color: #002060;
    font-weight: bold;
  }
  h3 {
    font-size: 48px;
    margin: 30px 0px;
  }
  p {
    font-size: 28px;
    margin-bottom: 40px;
  }
  span {
    font-size: 28px;
    line-height: 110%;
    font-weight: 400;
    margin-bottom: 40px;
  }
}
</style>
