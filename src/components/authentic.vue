<template>
  <div class="authentic-dialog">
    <div class="box-wrap">
      <div class="title primary-bg fm">
        <!-- <span v-if="twoFactor">{{$t('m.authentic.title')}}</span> -->
        <span>{{$t('m.authentic.openTitle')}}</span>
      </div>
      <div class="verify-content"
           :class="{middle: twoFactor}">
        <div class="select-text"
             v-if='twoFactor'>{{$t('m.authentic.selectVerify')}}</div>
        <div class="select-text"
             v-else>{{$t('m.authentic.desc')}}</div>
        <div class="select-way_box"
             v-if="twoFactor">
          <div class="select-way_item"
               @click="verifyGoogle"
               v-if="withdrawMe.app_two_factor">
            <i class="icon-google"></i>
            <p>{{$t('m.authentic.googleVerification')}}</p>
          </div>
          <div class="select-way_item"
               @click="verifyPhone"
               v-if="withdrawMe.sms_two_factor">
            <i class="iconfont icon-shoujiyanzhengxiugai"></i>
            <p>{{$t('m.authentic.phoneVerification')}}</p>
          </div>
          <div class="select-way_item"
               @click="verifyEmail"
               v-if="withdrawMe.sms_two_factor && (!withdrawMe.app_two_factor || !withdrawMe.sms_two_factor)">
            <i class="iconfont icon-youjianyanzhengxiugai"></i>
            <p>{{$t('m.authentic.emailVerification')}}</p>
          </div>
        </div>
        <div class="select-way_box"
             v-else>
          <div class="select-way_item"
               @click="verifyGoogle">
            <i class="icon-google"></i>
            <p>{{$t('m.authentic.googleVerification')}}</p>
          </div>
          <div class="select-way_item"
               @click="verifyPhone">
            <i class="iconfont icon-shoujiyanzhengxiugai"></i>
            <p>{{$t('m.authentic.phoneVerification')}}</p>
          </div>
        </div>
        <div class="close-btn"
             :class="{en:$fifth.lang!=='zh-CN'}"
             v-if='!twoFactor'>
          <v-btn type="primary"
                 @click="closeModal"
                 width="200">{{$t('m.authentic.ignore')}}</v-btn>
          <p class="fm">{{$t('m.authentic.desc')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import { mapState } from 'vuex'
export default {
  components: {
    VBtn,
  },
  props: {
    showFooter: { type: Boolean },
    // twoFactorProp: { type: Object },
    // title: { type: String },
  },

  computed: {
    ...mapState('withdraw', ['withdrawMe']),
    twoFactor() {
      return this.withdrawMe && this.withdrawMe.two_factors
    },
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },
    verifyPhone() {
      if (!this.twoFactor) {
        this.$router.push(
          this.$i18nRoute({
            name: 'Bind',
            params: {
              type: 'phone',
            },
          }),
        )
        return
      }
      this.$emit('nextStep', 'sms', 'patch')
      this.closeModal()
    },
    verifyGoogle() {
      if (!this.twoFactor) {
        this.$router.push(
          this.$i18nRoute({
            name: 'BindGoogle',
            params: {
              type: 'google',
              step: 'downloadApp',
            },
          }),
        )
        return
      }
      this.$emit('nextStep', 'app', 'patch')
      this.closeModal()
    },
    verifyEmail() {
      if (!this.twoFactor) {
        this.$router.push(
          this.$i18nRoute({
            name: 'Bind',
            params: {
              type: 'email',
            },
          }),
        )
        return
      }
      this.$emit('nextStep', 'email', 'patch')
      this.closeModal()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.authentic-dialog {
  z-index: $zindex-modal;

  .box-wrap {
    margin: 108px auto;
    width: 600px;
    height: 400px;
    border-radius: 4px;
    text-align: center;
    // background-color: #fff;
    box-shadow: none;

    .title {
      position: relative;
      padding: 19px 0;
      color: $color-text;
      font-size: 22px;
      border-top-right-radius: 4px;
      border-top-left-radius: 4px;

      .close {
        position: absolute;
        right: 25px;
        top: 20px;
        cursor: pointer;
        i {
          font-size: 20px;
        }
      }
    }

    .verify-content {
      background-color: #ffffff;
      padding: 60px 55px;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      // height: 382px;
      &.middle {
        height: 330px;
      }
      .select-text {
        color: $color-assist1;
        margin-bottom: 48px;
        text-align: center;
        font-size: 16px;
      }
      .close-btn {
        margin: 60px auto 0;
        &.en {
          width: 360px;
        }

        p {
          margin-top: 20px;
          font-size: 12px;
          color: $color-assist6;
        }
      }
      .select-way_box {
        display: flex;
        justify-content: space-between;

        i {
          display: inline-block;
          margin-top: 25px;
          font-size: 60px;
        }
        i.icon-google {
          background: url(../assets/images/google.png) no-repeat;
          background-size: 100% 100%;
          width: 67px;
          height: 67px;
          margin-top: 18px;
        }

        i.icon-youjianyanzhengxiugai {
          margin-left: 20px;
          width: 81px;
          height: 57px;
          margin-top: 30px;
          font-size: 55px;
        }
        i.icon-shoujiyanzhengxiugai {
          width: 65px;
          height: 65px;
        }
        .select-way_item {
          //padding: 25px 0;
          width: 220px;
          height: 140px;
          background-color: #fdfdfd;
          border: 1px dashed #eaedf5;
          box-shadow: rgba(0, 0, 0, 0.03) 0 10px 7px 0;
          border-radius: 3px;
          cursor: pointer;
          &:hover {
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 7px 0;
            border-color: $color-text;
          }

          p {
            margin-top: 5px;
            font-size: 16px;
            color: $color-assist1;
          }
        }
      }
    }
  }
}
</style>
