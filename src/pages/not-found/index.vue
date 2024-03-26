<template>
  <!--TODO: translate in en-->
  <div class="page_wrap">
    <img
      src="https://i.riostox.com/i/48/48ee92dbb3192f353fe7e30407e716e3.png"
      class="icon"
    >
    <div id="title">{{$t('m.notFound.notFound')}}</div>
    <div id="text">{{$t('m.notFound.content')}}</div>
    <a
      href="https://riostox.com"
      id="btn"
    >{{$t('m.notFound.backBtn')}}</a>
  </div>
</template>

<script>
export default {
}

</script>

<style lang='scss' scoped>
.page_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1200px;
  margin: 0 auto;
  padding: 100px 0 120px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  text-align: center;
  border-radius: 6px;
}

.icon {
  width: 452px;
  height: 329px;
}

#title {
  margin: 0px 0 30px;
  font-size: 32px;
  color: #666666;
}

#text {
  margin-bottom: 70px;
  font-size: 18px;
  color: #999999;
}

#btn {
  display: inline-block;
  margin: 0 auto;
  padding: 0 40px;
  height: 55px;
  line-height: 55px;
  border: 1px solid #979797;
  border-radius: 5px;
  text-decoration: none;
  color: #999999;
  font-size: 18px;
}

#btn:hover {
  color: #333333;
}

@media only screen and (max-width: 750px) {
  body,
  html {
    background-color: #ffffff;
  }
  .page_wrap {
    padding: 0;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate(0, 0);
  }
  .icon {
    margin-top: 50px;
    width: 226px;
    height: 165px;
  }
  #title {
    font-size: 24px;
  }
  #text {
    padding: 0 40px;
    font-size: 14px;
  }
  #btn {
    margin-bottom: 20px;
  }
}
</style>
