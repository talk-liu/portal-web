<template>
  <div class="betatrading">
    <div class="title">
      <p>
        Trading Competition Starts In
      </p>
      <p>
        30 DAYS 23 HOURS 59 MINUTES 59 SECONDS
      </p>
    </div>
    <div class="competition">
      <ul>
        <li class="compete">
          <h2>
            1,000,000 $RFUEL Trading Competition
          </h2>
          <p>
            Compete against the world’s best crypto traders
            & win up to 1,000,000 RFUEL in prize money
          </p>
        </li>
        <li class="money">
          <el-form ref="ruleForm"
                   label-width="200px"
                   class="demo-ruleForm">
            <el-form-item label="Name">
              <el-input width="348px"
                        placeholder="Search Coin Name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input width="348px"
                        placeholder="Search Coin Name" />
            </el-form-item>
            <el-form-item label="Country of Residence">
              <el-input width="348px"
                        placeholder="Search Coin Name" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">SIGN ME UP</el-button>
            </el-form-item>
          </el-form>
        </li>
      </ul>
    </div>
    <div class="tournament">
      <h3>
        Live Tournament Status
      </h3>
      <ul>
        <li class="left">
          <p>Current Participants</p>
          <strong>
            3,312
          </strong>
        </li>
        <li class="right">
          <p>
            Current Total Prize Pool (RFUEL)
          </p>
          <strong>
            300,000
          </strong>
        </li>
      </ul>
      <div>
        <p></p>

      </div>
    </div>
    <div class="how">
      <h3>
        How It Works
      </h3>
      <ul>
        <li>
          <h4>Step 1</h4>
          <p></p>
          <span>
            Sign up for the RioStox Beta Trading
            Competition </span>
        </li>
        <li>
          <h4>Step 2</h4>
          <p></p>
          <span>
            Get your trading tokens on May 2 & start trading </span>
        </li>
        <li>
          <h4>Step 3</h4>
          <p></p>
          <span>
            Top 50 winners announced
            on June 9 2022 </span>
        </li>
      </ul>
      <a href="">
        SIGN ME UP
      </a>
    </div>
    <div class="ranking">
      <h3>
        You Can Win Up To
      </h3>
      <p>
        Top 50 ranking will be based on total number of play tokens in your account balance on June 3 2022
      </p>
      <div class="tables">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column prop="date"
                           label="position"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="% of Total Pool"
                           width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="faqs">
      <h3>
        FAQs
      </h3>
      <ul>
        <li>
          <h4>
            When does the trading competition start and end?
          </h4>
          <p>
            The trading competion will start at 12:00pm HKT May 2 2022 and end at 12:00pm HKT June 2 2022
          </p>
        </li>
        <li>
          <h4>
            What do we trade with in the beta trading competition?
          </h4>
          <p>
            During the trading competition, every trader start with 1,000,000 RFUEL. the trading tokens will be simulated and can only be used for the trading competition
          </p>
        </li>
        <li>
          <h4>
            How do i register for the trading competition?
          </h4>
        </li>
      </ul>
      <a href="">TELL ME MORE </a>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, Input, FormItem, Button, Table, tableColumn } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(tableColumn)

export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.betatrading {
  h3 {
    font-size: 48px;
    text-align: center;
  }

  a {
    display: block;
    width: 270px;
    height: 50px;
    background-color: #44f460;
    text-align: center;
    line-height: 50px;
    margin: auto;
    margin-top: 75px;
    font-size: 24px;
  }
  .title {
    background-color: #2753ee;
    color: #fff;
    text-align: center;
    font-size: 18px;
    padding: 10px 0px 11px 0px;
    p {
      margin-top: 6px;
    }
  }
  .competition {
    margin-top: 127px;
    ul {
      padding: 0px 69px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      li {
        width: 100%;
        h2 {
          font-size: 64px;
        }
      }
      .money {
        .el-input {
        }
      }
      .compete {
        p {
          font-size: 24px;
          margin-top: 35px;
        }
      }
    }
  }
  .tournament {
    margin-top: 170px;
    padding: 0px 108px;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 53px;
      li {
        width: 100%;
        p {
          font-size: 24px;
        }
        strong {
          font-size: 48px;
        }
      }
      .left {
        text-align: right;
        padding-right: 100px;
        border-right: 1px solid;
      }
      .right {
        padding-left: 100px;
      }
    }
  }
  .how {
    margin-top: 140px;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 26px;
      li {
        width: 100%;
        text-align: center;
        p {
          width: 272px;
          height: 272px;
          background-color: #c4c4c4;
          margin: auto;
          margin-top: 42px;
        }
        h4 {
          font-size: 48px;
        }
        span {
          font-size: 24px;
          margin-top: 21px;
          display: block;
        }
      }
    }
  }
  .ranking {
    margin-top: 154px;
    p {
      font-size: 24px;
      text-align: center;
      margin-top: 28px;
    }
    .tables {
      width: fit-content;
      margin: auto;
    }
  }
  .faqs {
    padding: 0px 126px;
    margin-top: 118px;
    padding-bottom: 118px;
    ul {
      margin-top: 74px;
      h4 {
        margin-top: 28px;
        font-size: 24px;
        font-weight: 800;
      }
      p {
        font-weight: 100;
        margin-top: 28px;
        font-size: 18px;
        color: #444;
      }
    }
  }
}
</style>