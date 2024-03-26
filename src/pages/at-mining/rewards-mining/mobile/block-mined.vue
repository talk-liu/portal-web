<template>
  <div :class="['block-mined',{seleted}]" :style='{height:animateHeight}'>
    <!-- <div class='waves' v-if='!isClick && i==2'></div> -->
  </div>
</template>

<script>
const isClick = localStorage.getItem('mine_clicked')
export default {
  data() {
    return {
      isClick: isClick === '1' ? true : false,
      animateHeight: 0,
    }
  },
  props: ['seletedIdx', 'i', 'height'],
  watch: {
    seleted() {
      this.isClick = true
    },
  },
  computed: {
    seleted() {
      return this.seletedIdx == this.i
    },
  },
  mounted() {
    setTimeout(() => {
      this.animateHeight = this.height
    }, 1000)
  },
}
</script>

<style lang='scss'>
.block-mined.seleted {
  // background: linear-gradient(to bottom, rgba(107, 107, 107, 0.5), rgba(154, 154, 154, 0.5));
  // border-top: 1px solid $color-primary;
  // border-left: 1px solid $color-primary;
  // border-right: 1px solid $color-primary;
  border: 2px solid #847d95;
}

.block-mined.seleted:before {
  background: #d8d8d8;
  content: '';
  height: 1px;
  width: 100%;
  left: 0;
  top: -1px;
  position: absolute;
  // border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  // border-left: 1px solid rgba(255, 255, 255, 0.3);
  // -webkit-transform: rotate(-45deg);
  // -ms-transform: rotate(-45deg);
  // transform: rotate(-45deg);
}

.block-mined {
  width: 100%;
  border-radius: 3px;
  // background: linear-gradient(to bottom, rgba(107, 107, 107, 0.8), rgba(154, 154, 154, 0.8));
  background-color: #524b66;
  cursor: pointer;
  .click-text {
    margin-top: 5px;
    text-align: center;
    color: #160426;
  }

  transition: 0.6s;
}

// .waves {
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
//   margin-left: 31px;
//   margin-top: 14px;
// }

// .wave,
// .waves:before,
// .waves:after {
//   position: absolute;
//   background: white;
//   width: 8px;
//   height: 8px;
//   content: '';
//   display: block;
//   border-radius: 50%;
// }

// .waves:before {
//   animation: wave-animate 3s infinite ease-out;
// }

// .waves:after {
//   opacity: 0;
//   animation: wave-animate 3s 1.5s infinite ease-out;
// }

@keyframes wave-animate {
  0% {
    transform: scale(0);
    opacity: 1;
    transform-origin: center;
  }
  100% {
    transform: scale(3);
    opacity: 0;
    transform-origin: center;
  }
}
</style>
