<template>
  <transition-group tag="ul" class="pc" name="fade" v-if="type !== 'h5'">
    <li
      v-for="(item,index) in formatList"
      :key="`carousel-${index}`"
      v-show="index === currentIndex"
      :style="{background: item.background}"
    >
      <a :href="item.link" :target="item.target ? '_blank' : '_self'">
        <img :src="item.bigImgUrl" :alt="item.desc" :title="item.title">
      </a>
    </li>
  </transition-group>
  <ul
    class="mobile"
    v-else
    @touchstart="start"
    @touchend="end"
    @touchmove="move"
    :style="{width: (length + 2) * 100 + '%', transform: transform, transitionDuration: duration}"
  >
    <li v-if="isAutoPlay">
      <a :href="list[length - 1].link">
        <img
          :src="list[length - 1].h5ImgUrl"
          :alt="list[length - 1].desc"
          :title="list[length - 1].title"
        >
      </a>
    </li>
    <li v-for="(item,index) in list" :key="index">
      <a :href="item.link">
        <img :src="item.h5ImgUrl" :alt="item.desc" :title="item.title">
      </a>
    </li>
    <li v-if="isAutoPlay">
      <a :href="list[0].link">
        <img :src="list[0].h5ImgUrl" :alt="list[0].desc" :title="list[0].title">
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  props: ['list', 'currentIndex', 'stop', 'go', 'change', 'isAutoPlay'],
  data() {
    return {
      startClientX: '',
      duration: '200ms',
      timer: '',
    }
  },
  computed: {
    ...mapGetters('viewport', ['type']),
    transform: {
      get() {
        const percent = ((this.currentIndex + 1) / (this.length + 2)) * 100
        return `translateX(-${percent}%)`
      },
    },
    formatList: {
      get() {
        return this.list.map(v => ({ ...v, background: this.getGradientBackground(v) }))
      },
    },
    length: {
      get() {
        return this.list.length
      },
    },
  },
  watch: {
    // 占位图切换
    currentIndex: function(newIndex, oldIndex) {
      if (oldIndex === -1 || oldIndex === this.length) {
        this.duration = '0ms'
      } else {
        this.duration = '200ms'
      }
    },
  },
  methods: {
    start(e) {
      this.startClientX = e.touches[0].clientX
      this.timer && clearInterval(this.timer)
      this.timer = null
      this.stop()
    },
    end: throttle(function(e) {
      // 当偏移量大于50px, 切换图片
      const offset = this.startClientX - e.changedTouches[0].clientX
      if (Math.abs(offset) < 50 || !this.isAutoPlay) return
      const nextIndex = offset > 0 ? this.currentIndex + 1 : this.currentIndex - 1
      this.change(nextIndex)
      this.timer = setTimeout(this.go, 300)
    }, 500),
    move(e) {
      e.preventDefault()
    },
    // 获取渐变色背景
    getGradientBackground(item) {
      const { backgroundColor = [], gradient } = item
      const len = backgroundColor.length
      const [start, end] = backgroundColor
      const [, curGradient] = gradient.split('-')
      switch (len) {
        case 2:
          return `linear-gradient(${curGradient ? `to ${curGradient},` : ''} ${start}, ${end})`
        case 1:
          return start
        default:
          return 'inherit'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  margin-left: 50%;
  height: 100%;
  transform: translateX(-50%);
}

.pc {
  position: relative;
  width: 100%;
  height: 100%;
  li {
    position: absolute;
    width: 100%;
    height: 100%;
    a {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 0;
    }
  }
}

.mobile {
  height: 100%;
  display: flex;
  transform: translateZ(0);
  transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
  // 消除 safari 闪烁
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  li {
    width: 0;
    flex: 1;
    overflow: hidden;
    a {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 0;
    }
  }
  img {
    width: 100%;
    object-fit: cover;
  }
}

.fade-enter-to {
  transition: all 500ms ease;
  opacity: 1;
}

.fade-leave-active {
  transition: all 500ms ease;
  opacity: 0;
}

.fade-enter {
  opacity: 0;
}

.fade-leave {
  opacity: 1;
}
</style>
