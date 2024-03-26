<template>
  <div class="wrapper">
    <div>
      <h1>Why Use RioStox?</h1>
      <p>
        <strong>
          Efficiency:
        </strong>
        Security tokens contains built in corporate actions such as voting and dividends
      </p>
      <p>
        <strong>
          Accessibility:
        </strong>
        RioStox offers 24/7 market access
      </p>
      <p>
        <strong>
          Transparency:
        </strong>
        Our immutable blockchain allows our users to access trading activities
      </p>
      <p>
        <strong>
          Liquidity:
        </strong>
        Fractionalized asset ownership opens up opportunities to small investors.
      </p>
      <p>
        <strong>
          Security:
        </strong>
        Our users funds are held in a licensed trust at all time
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
