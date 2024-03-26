<template>
  <div class="no-records" >
    <div class="content">
      <img src="../assets/images/empty.png" alt="">
      <p>{{$t('m.noRecord')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.no-records {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin: 0 auto;
    width: 155px;
    height: 100px;
  }
  p {
    color: #cccccc;
    font-size: 15px;
    text-align: center;
    margin-top: 18px;
  }
}
</style>
