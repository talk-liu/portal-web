<template>
  <defs>
    <clipPath :id="id">
      <rect x="0" y="0" :width="grid.width" :height="grid.height"/>
    </clipPath>
  </defs>
</template>

<script>
export default {
  name: 'DefsClipPath',
  props: {
    grid: Object,
    id: String
  }
}
</script>

