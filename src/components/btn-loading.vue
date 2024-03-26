<template>
  <svg viewBox="25 25 50 50" class="circular">
    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
  </svg>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.circular {
  height: 14px;
  vertical-align: sub;
  animation: loading-rotate 2s linear infinite;
}

.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 6;
  stroke: #ffffff;
  stroke-linecap: round;
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

@keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
