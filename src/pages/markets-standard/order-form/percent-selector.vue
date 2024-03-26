<template>
  <div class='percent'>
    <span class="semi-bold" v-for="(item,key) in percentConfig" :key="key" @click="click(item,key)">
      {{item.value}}%
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      percentConfig: [
        { value: '25', key: '0.25' },
        { value: '50', key: '0.5' },
        { value: '75', key: '0.75' },
        { value: '100', key: '1' },
      ],
    }
  },
  methods: {
    click(item) {
      this.$emit('input', item.key)
    },
  },
}
</script>

<style lang="scss" scoped>
.percent {
  font-size: 11px;
  color: $color-assist2;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 7px;
  > span {
    text-align: right;
    cursor: pointer;
    &:hover {
      color: $color-text;
    }
    > span {
      display: block;
    }
  }
}
</style>
