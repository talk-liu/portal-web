<template>
  <div class="wrapper">
    <router-link :to="$i18nRoute({ path: '/news-center/release' })">Go Back</router-link>
    <h1>{{ ghostData.title }}</h1>
    <p>{{ ghostData.updated_at }}</p>
    <img width="100%" :src="ghostData.feature_image" />
    <div v-html="ghostData.html"></div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { Pagination, Input, DatePicker } from 'element-ui'
Vue.use(Pagination)
Vue.use(Input)
Vue.use(DatePicker)
export default {
  data() {
    return {
      ghostData: {},
    }
  },
  created() {
    const params = {
      key: '8e2cee66ef9d0a5ac2f66059b1',
      limit: 'all',
      fields: 'title,updated_at,feature_image,html,id,excerpt,slug',
      order: 'updated_at DESC',
    }
    axios
      .get('https://cms.riodefi.com/ghost/api/v3/content/posts/slug/' + this.$route.params.slug, { params: params })
      .then((res) => {
        this.ghostData = res.data.posts[0]
      })
  },
  mounted() {},
  methods: {},
}
</script>



<style lang="scss">
.wrapper {
  figure {
    img {
      width: 100%;
      object-fit: contain;
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.wrapper {
  max-width: 1440px;
  padding: 0 30px;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  display: block;
  margin: 60px auto;
  a {
    font-size: 16px;
    line-height: 110%;
    font-weight: 400;
    background: #002060;
    border-radius: 5px;
    padding: 10px 25px;
    margin-bottom: 30px;
    color: #fff;
  }
  h1 {
    font-size: 48px;
    line-height: 120%;
    font-weight: 700;
  }
  p {
    font-size: 20px;
    line-height: 110%;
    font-weight: 400;
    margin-bottom: 20px;
  }
  img {
    width: 100%;
  }
  figure {
    width: 100%;
  }
}
</style>



