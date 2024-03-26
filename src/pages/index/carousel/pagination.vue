<template>
  <div class="pagination-wrap">
    <div class="pc" v-if="type !== 'h5'">
      <a
        v-for="(item,index) in list"
        :key="index"
        :href="item.link"
        :target="item.target ? '_blank' : '_self'"
        :class="{item,'active':index===currentIndex}"
        @mouseover="change(index)">
        <img :src="item.smallImgUrl" :alt="item.desc" :title="item.title">
      </a>
    </div>
    <div class="mobile" v-else>
      <span v-for="(item,index) in list" :key="index" :class="{item,'active':index===currentIndex}"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['list', 'currentIndex', 'change'],
  computed: {
    ...mapGetters('viewport', ['type']),
  },
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
  position: absolute;
  width: 1400px;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.pc {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  z-index: $zindex-sticky;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .item {
    background: inherit;
    height: 110px;
    margin: 0 10px;
    width: 200px;
    border: 2px solid rgba(0, 0, 0, 0);
    &.active {
      border: 2px solid #ffd200;
    }

    pointer-events: auto;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.mobile {
  .item {
    display: inline-block;
    width: 5px;
    height: 3px;
    background: #ffffff;
    opacity: 0.5;
    border-radius: 1.5px;
    margin-right: 3px;
    transition: width 200ms ease;
    &.active {
      width: 8px;
      opacity: 1;
    }
  }
}

@include screen-sm-md-new() {
  .pagination-wrap {
    width: 84%;
  }
}

@include screen-h5-new() {
  .pagination-wrap {
    width: auto;
    height: auto;
    left: 25px;
    bottom: 15px;
    top: inherit;
  }
}
</style>
