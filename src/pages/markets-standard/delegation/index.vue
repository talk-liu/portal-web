<template>
  <div class="bottom">
    <current-delegation/>
    <history-delegation/>
  </div>
</template>
<script>
import CurrentDelegation from './current-delegation'
import HistoryDelegation from './history-delegation'
export default {
  components: {
    CurrentDelegation,
    HistoryDelegation,
  },
}
</script>
