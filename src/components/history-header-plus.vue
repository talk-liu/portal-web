<template>
  <div class="history-header">
    <template v-if="Array.isArray(level1)">
      <span
        v-for='(v,i) in level1'
        :key='i'
        @click="goBack(v)"
      > <i class='iconfont icon-back'></i>{{v.name}}</span>
    </template>
    <span
      v-else
      @click="goBack(level1)"
    ><i class='iconfont icon-back'></i> {{level1.name}}</span>
    <span class="fm">{{level2}}</span>
  </div>
</template>

<script>
export default {
  props: ['level1', 'level2', 'type', 'href'],

  methods: {
    goBack(obj) {
      if (obj.href) {
        location.href = obj.href
        return
      }

      if (this.type === 'component') {
        this.$emit('goBack')
        return
      }
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.history-header {
  span:nth-last-of-type(n + 2) {
    font-size: 13px;
    color: $color-text;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      color: #e06f0d;
    }
  }
  span:nth-last-of-type(1) {
    font-size: 16px;
    color: $color-assist2;
    &:hover {
      color: $color-assist2;
    }
  }
  .icon-back {
    font-size: 12px;
    margin-right: 5px;
  }
}
</style>
