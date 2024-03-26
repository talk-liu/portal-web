<template>
  <div class="newsBox">
    <div class="newsBack"></div>
    <div class="newsContent">
      <header>
        <h3>News</h3>
        <el-form model="" ref="ruleForm" rules="" label-width="100px" class="demo-ruleForm">
          <el-form-item class="searchName" label-width="0px">
            <el-input placeholder="Search" />
          </el-form-item>

          <el-form-item label-width="0px">
            <el-select placeholder="Filter by Date">
              <el-option> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </header>

      <div class="newsSelect">
        <span v-for="item in newsSelectList" :key="item.name">{{ item.name }}</span>
      </div>

      <div>
        <ul>
          <li
            v-for="(item, index) in riodefiList.data.posts"
            :key="item.id"
            :class="'item' + index"
            :style="{ 'background-image': 'url(' + item.feature_image + ')' }"
             v-show="riodefiList.data"
          >
            <h3>{{ item.title }}</h3>
            <p class="date">Apr {{ item.updated_at }}</p>
            <p class="plaintext">{{ item.plaintext }}</p>
            <router-link :to="$i18nRoute({ path: '/details/' + item.slug })">{{ $t('m.newHome.view') }}</router-link>
          </li>
          <!-- <li>
            <div class="newsValue">
              <div>111</div>
              <div>22</div>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Form, FormItem, Input, Select, Option } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
export default {
  data() {
    return {
      riodefiList: {},
      newsSelectList: [
        {
          name: 'All',
        },
        {
          name: 'Bitcoin EFT',
        },
        {
          name: 'Fractional Real Estate',
        },
        {
          name: 'RioStox',
        },
        {
          name: 'RFuel',
        },
      ],
    }
  },
  mounted() {
    const params = {
      key: '8e2cee66ef9d0a5ac2f66059b1',
      limit: 7,
      fields: 'title,updated_at,feature_image,html,id,excerpt,slug',
      order: 'updated_at DESC',
      formats: 'plaintext,html',
      page: 1,
      filter: '',
    }

    axios.get('https://cms.riodefi.com/ghost/api/v3/content/posts/', { params: params }).then((res) => {
      this.riodefiList = res
    })
  },
}
</script>

<style lang="scss" scoped>
.newsBox {
  position: relative;
  width: 100%;
  background-color: #002060;
  .newsBack {
    background-image: url('../../assets/newImg/images/member/bann6.png');
    opacity: 0.14;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0px;
    top: 0px;
  }
  .newsContent {
    max-width: 1440px;
    margin: auto;
    position: relative;
    z-index: 1;
    padding-top: 80px;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      h3 {
        color: #fff;
        font-size: 48px;
      }
    }
    .newsSelect {
      margin-bottom: 40px;
      margin-top: 30px;
      span {
        padding: 12px 20px;
        font-size: 16px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 5px;
        margin: 0px 5px;
        cursor: pointer;
      }
    }
    .searchName {
      display: inline-block;
      width: 300px;
    }
    ul {
      padding-bottom: 100px;

      display: grid;
      grid-gap: 20px;

      grid-template-areas: 
      'item0 item0 item1 item2'
      'item3 item3 item4 item4'
      'item5 item5 item6 item6'
      ;

      
      .item0{
            grid-area: item0;
      }
      .item3{
            grid-area: item3;
      }
      .item4{
            grid-area: item4;
      }
      .item5{
            grid-area: item5;
      }
      .item6{
            grid-area: item6;
      }
      li {
        border-radius: 5px;
        height: 328px;
        background-color: #fff;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 18px 20px;
        position: relative;
        h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          margin-bottom: 10px;
        }
        .plaintext {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          display: -webkit-box;
          font-weight: 400;
          overflow: hidden;
        }
        a {
          position: absolute;
          right: 20px;
          bottom: 18px;
        }
      }
    }
  }
}
.el-form-item {
  margin: 0px;
  display: inline-block;
}
</style>
