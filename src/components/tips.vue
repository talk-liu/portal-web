<template>
  <div class="tips-wrap">
    <el-popover placement="top" width="160" v-model="visible">
      <div class="tips-content-wrap">
        <div class="tips-content">
          <slot name="desc">{{content}}</slot>
        </div>
        <div class="tips-footer">
          <button class="btn" @click="visible = false">{{$t('m.tips.cancel')}}</button>
          <button class="btn ok" @click="ok">{{$t('m.tips.confirm')}}</button>
        </div>
      </div>
      <slot name="btn" slot="reference">{{btn}}</slot>
    </el-popover>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popover } from 'element-ui'
Vue.use(Popover)

export default {
  props: ['id', 'btn', 'content'],
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    ok() {
      this.$emit('deleteOrder', this.id)
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.tips-content {
  font-size: 13px;
  text-align: center;
  color: $color-assist1;
  margin: 20px 0;
}

.tips-footer {
  text-align: center;
}

.btn {
  outline: none;
  border: 1px solid #bdc7d1;
  width: 44px;
  height: 22px;
  line-height: 22px;
  border-radius: 2px;
  display: inline-block;
  font-size: 12px;
  color: $color-assist3;
  cursor: pointer;
}

.ok {
  border: 1px solid $color-primary;
  background-color: $color-primary;
  color: $color-text;
}
</style>
