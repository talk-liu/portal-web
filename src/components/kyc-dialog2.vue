<!--<template>-->
<!--  <div id="dialog">-->
<!--    <div class="border">-->
<!--      <div @click="closeDialog" class="closeImg"></div>-->
<!--      <span class="title">这是一段信息</span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <transition name="fade">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
        <div class="dialog-container">
          <div class="dialog-header">{{this.getTitles()}}</div>
          <div class="dialog-body">
            <slot>{{this.getContent()}}</slot>
          </div>
          <div class="dialog-footer">
            <div class="left i-block">
              <button class="button" @click="goBack">{{this.getCancelText()}}</button>
            </div>
            <div class="right i-block">
              <button class="button" @click="submit">{{this.getButtumText()}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: [
    'type',
  ],
  methods: {
    closeDialog() {
      // 给父组件传参
      this.$emit('closeDialog', false)
    },
    submit() {
      // window.open('https://ares-riostoxexchange.cynopsis.co')
      this.$router.push(this.$i18nRoute({
        name: 'IsKyc',
      }))
    },
    getContent() {
      let message = ''
      if (this.$fifth.lang === 'en') {
        message = 'From 01th December 2020, unverified user will not be able to deposit funds. For more details, please check out our latest announcement.'
      } else {
        message = '从2020年12月01日开始，未经验证的用户将无法存入资金。有关更多详细信息，请查看我们的最新公告。'
      }
      return message
    },
    getTitles() {
      let message = ''
      if (this.$fifth.lang === 'en') {
        message = 'Reminder'
      } else {
        message = '温馨提示'
      }
      return message
    },
    getButtumText() {
      let message = ''
      if (this.$fifth.lang === 'en') {
        message = 'Complete KYC Now'
      } else {
        message = '立即完成KYC'
      }
      return message
    },
    getCancelText() {
      let message = ''
      if (this.$fifth.lang === 'en') {
        message = 'Cancel'
      } else {
        message = '取消'
      }
      return message
    },
    goBack() {
      // 点击后退
      this.$router.go(-1)
    },
  },
}
</script>

<!--<style scoped>-->
<!--  #dialog{-->
<!--    position: fixed;-->
<!--    top: 0;-->
<!--    left: 0;-->
<!--    background: rgba(0,0,0,0.3);-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--  }-->
<!--  .title{-->
<!--    background-color: #f3fff7;-->
<!--    color: #42b983;-->
<!--    height: 32px;-->
<!--    border-radius: 12px 12px 0 0;-->
<!--    border-bottom: 1px solid #cccccc;-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--    font-size: 13px;-->
<!--    color: #38c26b;-->
<!--  }-->
<!--  .message{-->
<!--    text-align: center;-->
<!--    position: absolute;-->
<!--    top: 50%;-->
<!--  }-->
<!--  .closeImg{-->
<!--    width: 20px;-->
<!--    height: 20px;-->
<!--    float: right;-->
<!--    margin-right: 5px;-->
<!--    margin-top: 5px;-->
<!--    cursor: pointer;-->
<!--    background-size: cover;-->
<!--    background-repeat: no-repeat;-->
<!--  }-->
<!--  .border{-->
<!--    text-align: center;-->
<!--    background-color: white;-->
<!--    border-radius: 20px;-->
<!--    width: 50%;-->
<!--    height: 50%;-->
<!--    position: absolute;-->
<!--    left: 50%;-->
<!--    top: 50%;-->
<!--    transform: translate(-50%,-50%);-->
<!--  }-->
<!--</style>-->
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.dialog-mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: table;
  animation-duration: 0.6s;

  .dialog-wrapper {
    display: table-cell;
    vertical-align: middle;
    animation-duration: 0.3s;

    .dialog-container {
      margin: auto;
      top: 50%;
      background-color: white;
      width: 35%;
      border-radius: 12px;

      .dialog-header {
        /*color: #42b983;*/
        height: 80px;
        border-radius: 12px 12px 0 0;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        /*color: #38c26b;*/
      }

      .dialog-body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        height: 50px;
        padding: 20px;
        font-size: 14px;
      }

      .dialog-footer {
        height: 40px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 0 0 12px 12px;
        display: table;
        padding-bottom: 10px;

        .left {
          width: 50%;
          height: 100%;
          vertical-align: middle;
          display: table-cell;
          font-size: 14px;
          padding: 20px;
          /*color: #38c26b;*/
          text-align: center;

          .button {
            padding: 10px;
            min-width: 50%;
            border: none;
          }

        }

        .right {
          width: 50%;
          height: 100%;
          vertical-align: middle;
          display: table-cell;
          font-size: 14px;
          /*color: #38c26b;*/
          text-align: center;

          .button {
            padding: 10px;
            min-width: 50%;
            background: #07e9b2;
            border: none;
            outline: none;
          }

        }

        .left:hover {
          cursor: pointer;
        }

        .right:hover {
          cursor: pointer;
        }

      }
    }
  }
}
</style>
