<template>
  <i
    @click.stop.prevent="toggleFavorite"
    class="iconfont favorite"
    :class="{'icon-xihuanxuanzhong': status, 'icon-xihuanmoren': !status,'bounceIn':animate}"
  ></i>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      animate: false,
    }
  },
  props: {
    marketId: String,
  },
  computed: {
    ...mapState('loveTickers', ['allLoveTickers']),
    ...mapState('currentUser', ['currentUser']),
    status() {
      let status = false
      if (this.allLoveTickers.indexOf(this.marketId) > -1) {
        status = true
      }
      return status
    },
  },
  methods: {
    ...mapActions('loveTickers', ['tickerLove', 'tickerUnlove']),
    toggleFavorite: debounce(function() {
      if (!this.currentUser) {
        this.$router.push(this.$i18nRoute({ path: '/signin' }))
        return
      }
      this.animate = true
      setTimeout(() => {
        this.animate = false
      }, 1000)
      if (this.status) {
        this.tickerUnlove({
          market_id: this.marketId,
        })
      } else {
        this.tickerLove({
          market_id: this.marketId,
        })
      }
    }, 300),
  },
}
</script>

<style lang='scss' scoped>
.favorite {
  font-size: 22px;
  color: $color-9;
  cursor: pointer;
}

.icon-xihuanxuanzhong {
  color: $color-error;
}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    // opacity: 0;
    transform: scale3d(1.3, 1.3, 1.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    // opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    // opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  animation-duration: 1s;
  animation-name: bounceIn;
}
</style>
