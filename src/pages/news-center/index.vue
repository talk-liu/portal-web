<template>
  <div class="wrapper">
    <div id="release">
      <div class="content">
        <div class="tags">
          <span
            @click="tagsEve(index, items)"
            v-for="(items, index) in tags"
            :key="index"
            :class="{ active: items.boll }"
            >{{ items.name }}</span
          >
        </div>
        <div class="searchWrapper"></div>
        <div class="newsWrapper">
          <ul class="news">
            <li class="newsItem"></li>
            <li
              class="wrapper"
              :class="'item' + index"
              v-for="(item, index) in riodefiList.data.posts"
              :key="index"
              :style="{ 'background-image': 'url(' + item.feature_image + ')' }"
            >
              <div class="article">
                <div>
                  <h3>{{ item.title }}</h3>
                  <p class="date">Apr {{ item.updated_at }}</p>
                  <p>{{ item.plaintext }}</p>
                  <router-link :to="$i18nRoute({ path: '/details/' + item.slug })">{{$t('m.newHome.view')}}</router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <el-pagination
          @current-change="handleSizeChange"
          background
          layout="prev, pager, next"
          :total="riodefiList.data.meta.pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <div id="announcements">
      <h2>{{$t('m.newsCenter.announcements')}}</h2>
      <h3>1.1 {{$t('m.newsCenter.regulation')}}</h3>
      <p>
        {{$t('m.newsCenter.lorem')}}
      </p>
      <p>
        {{$t('m.newsCenter.fusce')}}
      </p>
      <p>
        {{$t('m.newsCenter.fermentum')}}
      </p>
      <h4>12/03/2021</h4>
      <h3>1.2 {{$t('m.newsCenter.regulation')}}</h3>
      <p>
        {{$t('m.newsCenter.lorem')}}
      </p>
      <p>
        {{$t('m.newsCenter.fusce')}}
      </p>
      <p>
        {{$t('m.newsCenter.fermentum')}}
      </p>
      <h4>12/03/2021</h4>
    </div>
    <div id="market-data">
      <div>
        <h2>{{$t('m.newsCenter.data')}}</h2>
        <p>
          <el-input @input="searchEve" :placeholder="$t('m.newsCenter.crypto')" suffix-icon="el-icon-search" clearable></el-input>
        </p>
        <div>
          <ul>
            <li v-for="(items, index) in coingeckoList" :key="index" v-show="!items.boll">
              <label>{{ index + 1 }}</label>
              <img :src="items.image" />
              <strong>{{ items.name }} {{ items.symbol }}</strong>
              <strong>${{ items.current_price }}</strong>
              <strong>{{ items.price_change_percentage_24h }}%</strong>
              <strong v-if="items.price_change_percentage_24h > 0">
                <svg class="arrowUp" width="53" height="46" viewBox="0 0 53 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M45.7134 32.8684C46.7453 32.4744 47.2624 31.3185 46.8684 30.2866L40.4478 13.4707C40.0538 12.4388 38.8979 11.9216 37.866 12.3156C36.8341 12.7096 36.3169 13.8656 36.7109 14.8975L42.4182 29.845L27.4707 35.5522C26.4388 35.9462 25.9216 37.1021 26.3156 38.134C26.7096 39.1659 27.8656 39.6831 28.8975 39.2891L45.7134 32.8684ZM6.18327 15.8256L44.1833 32.8256L45.8167 29.1744L7.81673 12.1744L6.18327 15.8256Z" fill="#07E9B2" />
                </svg>
              </strong>
              <strong v-else>
                <svg width="53" height="46" viewBox="0 0 53 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M45.7134 32.8684C46.7453 32.4744 47.2624 31.3185 46.8684 30.2866L40.4478 13.4707C40.0538 12.4388 38.8979 11.9216 37.866 12.3156C36.8341 12.7096 36.3169 13.8656 36.7109 14.8975L42.4182 29.845L27.4707 35.5522C26.4388 35.9462 25.9216 37.1021 26.3156 38.134C26.7096 39.1659 27.8656 39.6831 28.8975 39.2891L45.7134 32.8684ZM6.18327 15.8256L44.1833 32.8256L45.8167 29.1744L7.81673 12.1744L6.18327 15.8256Z" fill="#ED394B" />
                </svg>
              </strong>
              <router-link :to="$i18nRoute({ path: '/pro/markets/' + items.symbol + 'usd' })">{{$t('m.newsCenter.buy')}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="market-communications">
      <div>
        <h2>{{$t('m.newHome.the')}}</h2>
        <p>
          <a target="_blank" href="https://www.bloomberg.com/">
            <img src="../../assets/newImg/images/home/partners/bloomberg.png" />
          </a>
          <a target="_blank" href="https://www.forbes.com/">
            <img src="../../assets/newImg/images/home/partners/forbes.png" />
          </a>
          <a target="_blank" href="https://www.cnbc.com/">
            <img src="../../assets/newImg/images/home/partners/cnbc.png" />
          </a>
          <a target="_blank" href="https://www.businessinsider.com/">
            <img src="../../assets/newImg/images/home/partners/bi.png" />
          </a>
          <a target="_blank" href="https://www.bangkokpost.com/">
            <img src="../../assets/newImg/images/home/partners/bp.png" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Pagination, Input, DatePicker } from 'element-ui'
import { set } from 'nprogress'
Vue.use(Pagination)
Vue.use(Input)
Vue.use(DatePicker)
export default {
  data() {
    return {
      riodefiList: {},
      coingeckoList: [],
      tags: [
        { name: this.$t('m.newsCenter.started'), id: 'tag:rfuel', boll: false },
        { name: this.$t('m.newsCenter.rfuel'), id: 'tag:getting-started', boll: false },
      ],
      posts: {
        key: '8e2cee66ef9d0a5ac2f66059b1',
        limit: 10,
        fields: 'title,updated_at,feature_image,html,id,excerpt,slug',
        order: 'updated_at DESC',
        formats: 'plaintext,html',
        page: 1,
        filter: '',
      },
    }
  },
  filters: {},
  created() {
    this.riodefiEve(this.posts)
    const coingecko = {
      vs_currency: 'usd',
      page: 1,
      per_page: 100,
      sparkline: false,
      order: 'market_cap_desc',
      ids: '',
    }
    axios.get('https://api.coingecko.com/api/v3/coins/markets/', { params: coingecko }).then((res) => {
      this.coingeckoList = res.data
    })
  },
  mounted() {
    const _this = this;
    setTimeout(function () {
      window.location.hash = _this.$route.params.hash
    }, 1000)
  },
  methods: {
    riodefiEve(params) {
      axios.get('https://cms.riodefi.com/ghost/api/v3/content/posts/', { params: params }).then((res) => {
        this.riodefiList = res
      })
    },
    handleSizeChange(size) {
      this.posts.page = size
      this.riodefiEve(this.posts)
    },
    tagsEve(index, items) {
      const boll = items.boll
      for (let i in this.tags) {
        this.posts.filter = ''
        this.tags[i].boll = false
      }
      if (!boll) {
        this.tags[index].boll = true
        this.posts.filter = items.id
      }

      this.riodefiEve(this.posts)
    },
    searchEve(val) {
      for (let i in this.coingeckoList) {
        this.$set(this.coingeckoList[i], 'boll', false)
      }
      for (let i in this.coingeckoList) {
        const s = this.coingeckoList[i].name + this.coingeckoList[i].symbol
        if (s.indexOf(val) == -1) {
          this.$set(this.coingeckoList[i], 'boll', true)
        }
      }
    },
  },
}
</script>



<style lang="scss" scoped>
.arrowUp{
  transform: rotate( -45deg );
}
.wrapper {
  padding-top: 19px;
  position: relative;
  background-color: #1a2a49;
}
#release {
  .is-background {
    text-align: center;
    padding: 40px 0px;
  }
  padding-left: 100px;
  padding-right: 100px;
  max-width: 1920px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #27406d;
  border-radius: 20px;
  padding: 20px 20px 0;
  .content {
    max-width: 1440px;
    padding: 0 30px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    display: block;
    .tags {
      display: flex;
      margin-bottom: 50px;
      span {
        border: 4px solid #ddd;
        color: #fff;
        padding: 4px 10px;
        margin-right: 30px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
      }
      .active {
        color: #07e9b2;
        border: 4px solid #07e9b2;
      }
    }
  }
  .newsWrapper {
    min-height: 1022px;
    .news {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-gap: 19px;
      gap: 19px;
      grid-template-areas:
        'calendar item0 item0 item1 item1'
        'item2 item2 item3 item4 item5'
        'item6 item7 item8 item8 item9';
      .newsItem {
        background-color: #fff;
        width: 338px;
        border-radius: 5px;
      }
      .wrapper {
        height: 328px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        position: relative;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        .article {
          padding: 18px 20px;
          box-sizing: border-box;
          > div {
            width: 170px;
            h3 {
              font-size: 20px;
              font-weight: 700;
              margin: 0;
            }
            p {
              font-weight: 400;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            a {
              display: flex;
              align-items: center;
              position: absolute;
              right: 30px;
              bottom: 18px;
              color: #223761;
            }
          }
        }
      }
      .item0 {
        grid-area: item0;
      }
      .item1 {
        grid-area: item1;
      }
      .item2 {
        grid-area: item2;
      }
      .item8 {
        grid-area: item8;
      }
    }
  }
}

#announcements {
  color: #fff;
  max-width: 1440px;
  padding: 0 30px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  display: block;
  padding-bottom: 60px;
  h2 {
    text-align: center;
    font-size: 96px;
    line-height: 120%;
    font-weight: 700;
    text-align: center;
    margin: 0;
    margin-top: 90px;
  }
  h3 {
    font-size: 48px;
    line-height: 120%;
    font-weight: 700;
    margin: 60px 0 25px 0;
  }
  p {
    font-size: 20px;
    line-height: 110%;
    font-weight: 400;
    margin: 25px 0;
  }
  h4 {
    font-size: 20px;
    line-height: 110%;
    font-weight: 400;
    margin: 25px 0;
  }
}

#market-data {
  background-color: #fff;
  color: #002060;
  padding-bottom: 60px;
  h2 {
    font-size: 96px;
    font-weight: 700;
    text-align: center;
  }
  > div {
    max-width: 1440px;
    padding: 0 30px;
    margin: 0 auto;
    box-sizing: border-box;
    font-size: 24px;
    p {
      text-align: center;
      margin: 77px auto 40px;
    }
    .el-input {
      width: 854px;
    }
  }
  ul {
    height: 400px;
    overflow: auto;
    li {
      font-weight: 400;
      line-height: 17px;
      padding: 10px 60px 10px 0;
      display: grid;
      grid-template-columns: 0.25fr 0.5fr 1.5fr 1fr 1fr 0.5fr 0.5fr;
      align-items: center;
      transition: background-color 0.3s;
      label {
        font-weight: bold;
      }
      img {
        width: 64px;
      }
      a {
        font-size: 20px;
        line-height: 110%;
        font-weight: 500;
        border: 2px solid #002060;
        box-sizing: border-box;
        border-radius: 99px;
        color: #002060;
        padding: 11px 36px;
        width: fit-content;
      }
    }
  }
}
#market-communications {
  max-width: 100%;
  width: 100%;
  display: block;
  padding-bottom: 200px;
  padding-top: 135px;
  background: rgba(255, 255, 255, 0.5);
  > div {
    max-width: 1440px;
    padding: 0 30px;
    margin: 0 auto;
    h2 {
      font-size: 48px;
      font-weight: 700;
      color: #002060;
      margin: 50px 0px;
    }
    p {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 40px;
      justify-content: space-evenly;
      justify-items: center;
      align-content: space-evenly;
      align-items: center;
    }
  }
}
</style>



