<template>
  <div class="err-wraps">
    <div class="err-content">
      <img src="https://i.riostox.com/img/site/hero.png" alt="Hero">
      <h4>系统公告</h4>
      <div class="content-text">
        <p>Riostox 暂不提供服务</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.err-wraps {
  height: 100%;
  overflow: hidden;
  background: #f6f6f6;
  .err-content {
    box-sizing: content-box;
    width: 970px;
    margin: 30px auto;
    padding: 100px 50px;
    color: #999999;
    background-color: #ffffff;
    border: 1px solid #eaedf5;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.03) 0 5px 10px 0;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  h4 {
    margin: 45px;
    font-size: 34px;
    color: #666666;
  }
  .content-text {
    width: 620px;
    margin: 0 auto;
    p {
      margin: 14px 0;
      line-height: 20px;
    }
  }
}

@include screen-h5-new() {
  .err-wraps {
    .err-content {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 50px 20px;
      color: #999999;
      border: none;
      border-radius: 0;
      box-shadow: none;
      text-align: center;
    }
    h4 {
      margin: 20px;
      font-size: 22px;
    }
    .content-text {
      width: 100%;
      p {
        margin: 10px 0;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
