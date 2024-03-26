<template>
  <div class="ad-banner_wrap" v-if="indexAdList.length">
    <i class="iconfont icon-xiaoxi"></i>
    <div class="ad-list_box">
      <div class="ad-list">
        <a
          v-for="(item,index) in indexAdList"
          :key="index"
          :href="item.href"
          target="_blank"
          class="slider-item"
        >{{item.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
const gon = window.gon
export default {
  computed: {
    indexAdList() {
      let list = []
      const adList = gon && gon.adList && gon.adList.indexAdList
      if (adList && adList.length > 0) {
        const isCn = this.$fifth.isCn
        adList.map(item => {
          list.push({
            title: isCn ? item.title : item.titleEN,
            href: isCn ? item.href : item.hrefEN,
          })
        })
      }
      return list
    },
  },
}
</script>

<style lang="scss" scoped>
.ad-banner_wrap {
  //position: relative;
  margin: 20px auto 0;
  padding: 0 40px;
  width: 1200px;
  height: 60px;
  line-height: 60px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid $color-line;
  overflow: hidden;
  color: $color-text;

  .fn {
    font-weight: normal;
  }

  a {
    position: relative;
    padding: 0 20px;
    font-size: 15px;
    cursor: pointer;
    white-space: nowrap;
    color: #777777;
    &:nth-of-type(1) {
      padding-left: 0;
    }

    &:not(:last-of-type):after {
      content: '';
      position: absolute;
      right: 0;
      top: 6px;
      width: 1px;
      height: 14px;
      background-color: #bbbbbb;
    }

    &:hover {
      color: $color-assist10;
      text-decoration: underline;
    }
  }

  &.one {
    background-color: #ff4e4e;
    color: #ffffff;

    a {
      color: #ffffff;

      &:hover {
        color: $color-primary;
      }
    }
  }

  .ad-list_box {
    display: inline-block;
    position: relative;
    top: 0;
    left: 20px;
    height: 100%;
    width: 1090px;
    overflow: hidden;
  }

  .ad-list {
    //display: flex;
    position: absolute;
    top: 0;
    height: 100%;
  }

  i {
    position: relative;
    top: -2px;
    font-size: 20px;
    vertical-align: text-bottom;
  }
}
</style>
