<template>
  <div class="miner">
    <a :href="$t('m.home.adFourHref')" target="_blank">
      <img src="../assets/images/diamon.png">
      {{$t('m.home.miner')}}
    </a>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.miner {
  display: inline-block;
  margin-right: 5px;
  height: 26px;
  line-height: 1.9;
  padding: 2px 5px;
  text-align: center;
  background-color: #333333;
  color: #ffffff;
  border-radius: 21px;
  font-weight: bold;
  font-size: 12px;

  a {
    padding: 0 6px;
    margin-left: -6px;
    color: #ffffff;
  }

  img {
    width: 22px;
    height: 19px;
    vertical-align: middle;
  }
}
</style>
