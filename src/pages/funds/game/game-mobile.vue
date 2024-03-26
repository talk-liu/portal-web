<template>
  <div class="funds-profit">
    <div class='at'>
      <div class="top">
        <p class="title">
          <span>{{$t("m.funds.fundsMenu.program")}}</span>
        </p>
        <p class="atpeivlege" v-if="!isEmptyData(show_vipGrade)">
          {{getlangMessage(at_vip_grade)}}</p>
        <p v-else class="num">--</p>
      </div>
      <div class="top">
        <p class="week">{{show_groupName}}</p>
      </div>
    </div>
    <gameHistoryMobile v-on:showVipGrade="showVipGrade"/>
    <v-dialog :visible="show" class="dialog">
      <div class="locked-content">
        <div class="locked-list">
          <div class="label">{{$t("m.funds.profit.defrozenLabel")}}</div>
          <div class="item" v-for='(item,key) in locked_at_list' :key='key'>
            <i class="iconfont icon-locked"></i>
            <span>
              {{$t("m.funds.profit.defrozenTip1", { amount: item.amount, time: formatYmd(item.unfreeze_at) })}}
            </span>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import myProfit from '@/mixins/my-profit'
import gameHistoryMobile from './game-history-mobile'
import VDialog from '@/components/dialog'
export default {
  mixins: [myProfit],
  components: {
    VDialog,
    gameHistoryMobile
  },
  data() {
    return {
      show: false,
      show_vipGrade: '',
      show_groupName:'',
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.show = false
    })
  },
  methods: {
    showLocked() {
      this.show = true
    },
    // 判断字符是否为空的方法
    isEmptyData(obj) {
      if (typeof obj == 'undefined' || obj == null || obj == '') {
        return true
      } else {
        return false
      }
    },
    // getlangMessage(at_vip_grade) {
    //   let message = ''
    //   if (this.$fifth.lang === 'zh-CN' || this.$fifth.lang === 'zh-TW') {
    //     if (at_vip_grade == 'Regular') {
    //       message = '白银'
    //     } else if (at_vip_grade == 'Classic') {
    //       message = '黄金'
    //     } else if (at_vip_grade == 'Prestige') {
    //       message = '铂金'
    //     } else if (at_vip_grade == 'Elite') {
    //       message = '钻石'
    //     } else {
    //       message = at_vip_grade
    //     }
    //   } else {
    //     message = at_vip_grade
    //   }
    //   return message
    // },
    showVipGrade(showVipGrade, groupName) {
      this.show_vipGrade = showVipGrade
      this.show_groupName = groupName
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/variable.scss';

@keyframes spin {
  to {
    transform: translateY(-5.9em);
  }
}

.funds-profit {
  padding: 0 20px;
  .at {
    background: #f9f9fb;
    border: 1px solid #eaeaed;
    width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    padding-bottom: 15px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.03);
    position: relative;
    display: flex;
    .top {
      padding: 15px 20px 0;
      flex: 1;
      .title {
        p {
          color: $color-assist1;
          font-size: 24px;
        }
        span {
          color: $color-assist1;
          font-size: 14px;
        }
        a {
          color: $color-assist3;
          font-size: 12px;
        }
      }
      .week {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
      }
      .atpeivlege {
        color: #f15a22;
        font-size: 24px;
        margin-top: 5px;
      }
      .num {
        color: #111111;
        font-size: 24px;
        margin-top: 5px;
        span {
          vertical-align: middle;
          font-size: 14px;
        }
      }
    }
  }
}

.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.locked-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 145px;
  max-height: 290px;
  overflow: scroll;
  border-radius: 12px;
  background: #ffffff;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.locked-list {
  width: 270px;
  padding: 22px 22px 0;
  color: #030303;
  font-size: 15px;
  .label {
    font-size: 16px;
    color: #030303;
    font-weight: bold;
  }
  .item {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #e6e6e6;
    text-align: left;
    i {
      color: #e06f0d;
      margin-right: 20px;
      vertical-align: middle;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
