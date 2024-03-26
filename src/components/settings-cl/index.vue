<template>
  <div class="settings-cl_wrap">
    <i class="settings-icon iconfont icon-shezhi" @click="showDialog"></i>
    <v-dialog :visible="visible">
      <v-box
        :title="$t('m.langSettings.settings')"
        showClose="true"
        minHeight="350"
        @close="close"
        width="440"
      >
        <div class="item">
          <label for>{{$t('m.langSettings.lang')}}</label>
          <div class="select">
            <v-select
              v-model="lang['lang']"
              @select="selectLang"
              :suggestions="langList"
              labelKey="lang"
              :lineColor="false"
              :disabled="true"
            ></v-select>
          </div>
        </div>
        <div class="item item-currency">
          <label for>{{$t('m.langSettings.currency')}}</label>
          <div class="select">
            <v-select
              v-model="symbol['symbol']"
              @select="selectSymbol"
              :suggestions="coinList"
              labelKey="symbol"
              :num="1"
              :lineColor="false"
              :disabled="true"
            ></v-select>
          </div>
        </div>
        <div class="btn-wrap">
          <button class="cancel" @click="close()">{{$t('m.btnText.cancel')}}</button>
          <button class="confirm" @click="submit">{{$t('m.btnText.confirmBtn')}}</button>
          <!-- <v-btn class="cancel" type="new" width="120" height="40" @click="close()">{{$t('m.btnText.cancel')}}</v-btn> -->
          <!-- <v-btn type="primary" width="120" height="40" @click="submit">{{$t('m.btnText.confirmBtn')}}</v-btn> -->
        </div>
      </v-box>
    </v-dialog>
  </div>
</template>

<script>
import VBox from '@/components/box'
import VDialog from '@/components/dialog'
import VSelect from '@/components/th5-select'
import VBtn from '@/components/btn'
import Lang from '@/utils/lang-utils'
import find from 'lodash/find'

export default {
  components: {
    VBox,
    VDialog,
    VSelect,
    VBtn,
  },
  data() {
    return {
      visible: false,
      langList: [
        { lang: 'English', local: 'en' },
        { lang: '简体中文', local: 'zh-CN' },
        { lang: '繁體中文', local: 'zh-TW' },
        // { lang: 'Русский', local: 'ru' },
        // { lang: '한국어', local: 'ko' },
        // { lang: 'Tiếng Việt', local: 'vi' },
        // { lang: 'Türkçe', local: 'tr' },
        // { lang: 'Español', local: 'es' },
      ],
      coinList: [
        { symbol: '$ USD', local: 'en', currency: 'usd' },
        { symbol: '￥ CNY', local: 'zh-CN', currency: 'cny' },
        { symbol: '₩ KRW ', local: 'ko', currency: 'krw' },
        { symbol: '₽ RUB', local: 'ru', currency: 'rub' },
        { symbol: '€ EUR', local: 'it', currency: 'eur' },
        { symbol: '£ GBP', local: '', currency: 'gbp' },
      ],
      lang: '',
      symbol: '',
    }
  },
  created() {
    this.lang = this.init(this.langList)
    this.symbol = this.initSymbol() || this.init(this.coinList)
  },
  methods: {
    init(arr = []) {
      let res = ''

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].local === Lang.lang) {
          res = arr[i]
          break
        }
      }
      return res
    },
    initSymbol() {
      const currentOtc = localStorage.getItem('currentOtc')
      if (currentOtc) {
        return find(this.coinList, {
          currency: currentOtc,
        })
      } else {
        return ''
      }
    },
    showDialog() {
      this.visible = true
    },
    close() {
      this.lang = this.init(this.langList)
      this.symbol = this.initSymbol() || this.init(this.coinList)
      this.visible = false
    },
    selectLang(val) {
      this.lang = val
    },
    selectSymbol(val) {
      this.symbol = val
    },
    submit() {
      const currentOtc = this.symbol['currency']
      localStorage.setItem('currentOtc', currentOtc)
      this.changeLang(this.lang['local'])
    },
    changeLang(lang) {
      const to = this.$router.resolve({ params: { lang } })
      window.location.href = to.href
    },
  },
}
</script>

<style lang="scss" scoped>
.settings-cl_wrap {
  .settings-icon {
    margin: 3px 0 0 15px;
    font-size: 20px;
    cursor: pointer;
    color: #ffffff;
  }
  .item-currency.item {
    margin: 20px 40px 0;
  }
  .item {
    margin: 30px 40px 0;
    label {
      margin-bottom: 10px;
      display: block;
      text-align: left;
      font-size: 12px;
      // color: #999999;
      @include themify($themes) {
        color: themed('textColor9');
      }
    }
    .select {
      height: 35px;
      width: 360px;
      text-align: left;
    }
  }
  .btn-wrap {
    padding: 0 80px;
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    button {
      height: 40px;
      width: 120px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
      background-color: #f3f4f6;
      color: #333333;
      border: 0;
      &.confirm {
        &:hover {
          background-color: #07e9b2;
          color: #002060;
        }
      }
    }
  }
}

.theme-dark {
  .settings-cl_wrap {
    .btn-wrap {
      button {
        background-color: #353535;
        color: rgba($color: #ffffff, $alpha: 0.7);
        &.confirm {
          &:hover {
            background-color: #e2a633;
            color: #171718;
          }
        }
      }
    }
  }
}
</style>
