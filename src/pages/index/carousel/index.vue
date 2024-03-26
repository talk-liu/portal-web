<template>
  <div
    class="carousel-wrap"
    id="carousel"
    @mouseenter="stop"
    @mouseleave="go"
  >
    <a
      target='_blank'
      href='https://help.riostox.com/hc/zh-cn/articles/360022128691-%E5%85%B3%E4%BA%8E%E4%B8%8D%E4%B8%BA%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86%E5%9C%B0%E5%8C%BA%E7%94%A8%E6%88%B7%E6%8F%90%E4%BE%9B%E6%9C%8D%E5%8A%A1%E7%9A%84%E5%85%AC%E5%91%8A'
      v-if='$fifth.isCn'
      v-show='!visible'
      class='no-cn'
    >
      <div class='ct'>
        <i class='iconfont icon-gonggao pull-left'></i>
        <span>【重要】关于不为中国大陆提供服务的公告</span>
        <i
          @click.prevent='close'
          class='iconfont icon-guanbi1 pull-right'
        ></i>
      </div>
    </a>
    <v-carousel
      :list="list"
      :currentIndex="currentIndex"
      :go="go"
      :stop="stop"
      :change="change"
      :isAutoPlay="isAutoPlay"
    />
    <v-pagination
      :list="list"
      :currentIndex="currentIndex"
      :change="change"
    />
  </div>
</template>

<script>
import VPagination from './pagination'
import VCarousel from './carousel'

export default {
  props: ['list'],
  data() {
    return {
      currentIndex: 0,
      timer: '',
      transformX: '0',
      visible: false,
    }
  },
  computed: {
    isAutoPlay() {
      return this.list.length > 1
    },
  },
  watch: {
    currentIndex: function(newIndex) {
      setTimeout(() => {
        if (newIndex === this.list.length) {
          this.currentIndex = 0
        }
        if (newIndex === -1) {
          this.currentIndex = this.list.length - 1
        }
      }, 350)
    },
    list() {
      this.isAutoPlay && this.go()
    },
  },
  methods: {
    go() {
      if (this.timer || !this.isAutoPlay) return
      this.timer = setInterval(this.autoPlay, 4000)
    },
    stop() {
      this.timer && clearInterval(this.timer)
      this.timer = null
    },
    change(index) {
      this.currentIndex = index
    },
    autoPlay() {
      if (this.currentIndex < this.list.length) {
        this.currentIndex++
      }
    },
    close() {
      this.visible = true
    },
  },
  // 自动轮播
  mounted() {
    this.go()
  },
  components: {
    VPagination,
    VCarousel,
  },
}
</script>

<style lang="scss" scoped>
.carousel-wrap {
  height: 500px;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: -54px;
  .no-cn {
    position: absolute;
    top: 54px;
    z-index: $zindex-newspace;
    font-size: 12px;
    color: #f9f9f9;
    width: 100%;
    height: 34px;
    line-height: 34px;
    background: rgba(0, 0, 0, 0.2);
    .ct {
      width: 1400px;
      margin: 0 auto;
    }
  }
}

@include screen-sm-md-new {
  .carousel-wrap {
    .no-cn {
      .ct {
        width: 84%;
      }
    }
  }
}

@include screen-h5-new() {
  .carousel-wrap {
    height: 53.3vw;
    margin-top: 0;
    .no-cn {
      top: 0;
      padding: 0 15px;
      .ct {
        width: 100%;
      }
    }
  }
}
</style>
