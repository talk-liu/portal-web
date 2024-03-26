<template>
  <div class="funds-profit">
    <div class="header">
      <div class="at-value">
        <p class="b-title">{{$t("m.funds.fundsMenu.program")}}</p>
        <div class="item">
          <p class="value" v-if="!isEmptyData(show_vipGrade)">
            {{this.getlangMessage(show_vipGrade)}}</p>
          <p v-else class="no-value">--</p>
        </div>
      </div>
    </div>
    <gameHistory v-on:showVipGrade="showVipGrade"/>
    <gameRewardHistory/>
  </div>
</template>
<script>
import gameHistory from './game-history'
import gameRewardHistory from './game-reward-history'
export default {
  data() {
    return {
      show_vipGrade: ''
    }
  },
  components: {
    gameHistory,
    gameRewardHistory,
  },
  methods: {
    // 判断字符是否为空的方法
    isEmptyData(obj) {
      if (typeof obj == 'undefined' || obj == null || obj == '') {
        return true
      } else {
        return false
      }
    },
    showVipGrade(showVipGrade) {
      this.show_vipGrade = showVipGrade
    },
    getlangMessage(at_vip_grade) {
      let message = ''
      if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
        if (at_vip_grade == 'Regular') {
          message = '白银'
        } else if (at_vip_grade == 'Classic') {
          message = '黄金'
        } else if (at_vip_grade == 'Prestige') {
          message = '铂金'
        } else if (at_vip_grade == 'Elite') {
          message = '钻石'
        } else {
          message = at_vip_grade
        }
      } else {
        message = at_vip_grade
      }
      return message
    },
  }
}
</script>
<style scoped lang="scss">
@import '../../../assets/scss/variable.scss';

@keyframes spin {
  to {
    transform: translateY(-5.9em);
  }
}

.funds-profit {
  width: 1120px;
  margin: 0 auto;
  padding-top: 30px;
}

.header {
  display: flex;
  align-items: flex-start;
}

.at-value {
  padding-right: 65px;
  min-width: 300px;
  .b-title {
    color: $color-3;
    font-size: 16px;
    display: block;
    font-weight: 500;
    line-height: 1em;
    margin-bottom: 10px;
  }
  .value {
    color: #fac140;
    font-size: 40px;
    font-weight: 400;
    margin-top: 5px;
  }
  .no-value {
    margin-top: 10px;
  }
}
</style>
