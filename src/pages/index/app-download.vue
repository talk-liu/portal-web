<template>
  <div class="app-download">
    <div class="wrap">
      <img src="//i.riostox.com/i/ca/ca52dfedc9de039256e197eb76818a38.png" alt class="computer">
      <div class="cnt">
        <div class="title">Across-platform Terminal Access</div>
        <p>H5/App available, allowing you to trade whenever and wherever.</p>
        <div class="btns">
          <a class="btn google" href="//riostox.com/app_download"></a>
          <a class="btn app-store" href="//riostox.com/app_download"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-download {
  display: flex;
  padding: 67px 0 55px;
  justify-content: center;
  .wrap {
    display: flex;
    width: 1400px;
    justify-content: space-around;
  }
  img {
    width: 468px;
    height: 218px;
  }
  .cnt {
    .title {
      font-size: 36px;
      color: #111111;
      margin-bottom: 10px;
    }
    p {
      font-size: 20px;
      color: rgba(#111111, 0.8);
      font-weight: 200;
      margin-bottom: 40px;
    }
    .btns {
      .btn {
        display: inline-block;
        width: 237px;
        height: 68px;
        background: 0 0 no-repeat;
        background-size: 237px 68px;
      }
      .google {
        margin-right: 60px;
        background-image: url('../../assets/images/index-download2.png');
      }
      .app-store {
        background-image: url('../../assets/images/index-download3.png');
      }
    }
  }
}

@include screen-sm-md-new() {
  .app-download {
    padding: 73px 0 86px;
    .wrap {
      width: 550px;
      .computer {
        display: none;
      }
      .cnt {
        text-align: center;
        .title {
          font-size: 30px;
          line-height: 42px;
          margin-bottom: 14px;
        }
        p {
          font-size: 18px;
          line-height: 25px;
        }
        .btns {
          .google {
            margin-right: 0;
          }
        }
      }
    }
  }
}

@include screen-h5-new() {
  .app-download {
    padding: 40px 0 40px;
    .wrap {
      width: pxtovw(237px);
      .computer {
        display: none;
      }
      .cnt {
        text-align: center;
        .title {
          font-size: 20px;
          line-height: 28px;
          margin-bottom: 10px;
        }
        p {
          font-size: 13px;
          line-height: 18px;
          margin-bottom: 30px;
        }
        .btns {
          .google {
            margin-right: 0;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>

