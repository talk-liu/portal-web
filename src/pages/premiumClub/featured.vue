<template>
  <div class="at-privilege-program">
    <h5>Featured In</h5>
    <div class="content">
      <img class="img" src="../../assets/images/icon_fratured_in.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
@mixin title {
  font-size: 30px;
  font-weight: bold;
  color: rgba(9, 8, 80, 1);
  text-align: center;
}

.at-privilege-program {
  margin-top: 80px;
  margin-bottom: 80px;
  h5 {
    @include title;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    img {
      margin-top: 52px;
      width: 1200px;
      height: 148px;
    }
  }
}

</style>

