<!--todo: 获得key-->
<template>
  <div class="input-value">
    {{value}}
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang='scss' scoped>
.input-value {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #bdc7d1;
  box-shadow: 0 2px 3px #eeeeee;
  font-size: 15px;
  color: #111111;
  text-align: center;
  font-weight: bold;
  line-height: 50px;
}
</style>
