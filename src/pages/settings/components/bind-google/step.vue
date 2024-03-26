<template>
  <div
    class='steps'
    :class="{'ru': $fifth.isRu}"
  >
    <div
      v-for='(v,i) in array'
      :key='i'
      class='step'
      v-bind:class='{disabled : i>current-1}'
    >
      <div class='step-num'>{{i + 1}}</div>
      <div class='step-name'>{{v}}</div>
      <i
        class='iconfont icon-jiantou'
        v-if="i < 3"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['array', 'current'],
}
</script>

<style lang='scss' scoped>
.steps {
  display: flex;
  justify-content: center;
  margin: 86px auto 60px;
  width: 930px;
  &.ru {
    .step {
      &:first-child {
        margin-left: 30px;
      }
    }
  }
  .step {
    margin-right: 20px;
    display: flex;
    align-items: center;
    &:last-child {
      margin-right: 0;
      .step-name {
        margin-right: 0;
      }
    }
    .step-num {
      flex-basis: 24px;
      width: 24px;
      height: 24px;
      line-height: 20px;
      background: #000000;
      display: flex;
      justify-content: center;
      color: #ffffff;
      border-radius: 12px;
      font-weight: bold;
      border: 1px solid #000000;
    }
    .step-name {
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      margin-left: 10px;
      margin-right: 30px;
    }
    .step .icon-jiantou:nth-last-of-type(1) {
      display: none;
    }
    .iconfont {
      transform: scaleX(1.5);
      display: inline-block;
    }
  }
  .step.disabled {
    .step-num {
      background: none;
      border: 1px solid #999999;
      color: #999999;
    }
    .step-name {
      color: #999999;
    }
  }
  .step:last-child i {
    display: none;
  }
}
</style>
