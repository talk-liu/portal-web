<template>
  <text :x="x" :y="y" alignment-baseline="hanging">
    <slot></slot>
  </text>
</template>

<script>
export default {
  name: 'TextTop',
  props: {
    x: Number,
    y: Number,
  }
}
</script>

