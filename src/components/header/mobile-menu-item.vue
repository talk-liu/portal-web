<template>
  <div :class="['link',menu.name===active?'active':'']">
    <template v-if="menu.menu && !menu.hideMenu">
      <div class="title" @click.stop="changeActive(menu.name)">
        {{menu.name}}
        <span class="show">+</span>
      </div>
      <ul>
        <li
          v-if="((item.checkLogin && isLogin) || !item.checkLogin)
          && ((item.checkCn && $fifth.isCn) || !item.checkCn) && !item.hide"
          v-for="(item,i) in menu.menu"
          :key="`left-item-${i}`"
        >
          <router-link v-if="item.isRoute" :to="$i18nRoute({path:item.url})">{{item.name}}</router-link>
          <a
            v-else-if="item.url"
            :href="item.url"
            :target="item.target ? item.target : '_self'"
          >{{item.name}}</a>
          <a
            v-else-if="item.urlObj"
            :href="item.urlObj[$fifth.lang] ? item.urlObj[$fifth.lang] : item.urlObj.en"
            :target="item.target ? item.target : '_self'"
          >{{item.name}}</a>
          <a v-else-if="item.handleClick" @click.stop="item.handleClick">{{item.name}}</a>
        </li>
      </ul>
    </template>
    <template v-else-if="!menu.hide">
      <router-link v-if="menu.isRoute"  :to="$i18nRoute({path:menu.url})">{{menu.name}}</router-link>
      <a
        v-else-if="menu.url"
        :href="menu.url"
        :target="menu.target ? menu.target : '_self'"
      >{{menu.name}}</a>
      <a
        v-else-if="menu.urlObj"
        :href="menu.urlObj[$fifth.lang] ? menu.urlObj[$fifth.lang] : menu.urlObj.en"
        :target="menu.target ? menu.target : '_self'"
      >{{menu.name}}</a>
      <a v-else-if="menu.handleClick" @click="menu.handleClick">{{menu.name}}</a>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['menu', 'active'],
  methods: {
    changeActive(name) {
      this.$emit('changeActive', name)
    },
  },
  computed: {
    ...mapGetters('currentUser', ['isLogin']),
  },
}
</script>

<style lang="scss" scoped>
.link {
  font-size: 14px;
  min-height: 40px;
  line-height: 40px;
  color: #ffffff;
  border-bottom: 1px solid #666666;
  cursor: pointer;
  position: relative;
  .title {
    display: flex;
    justify-content: space-between;
    .show {
      font-size: 20px;
    }
  }
  .icon-gou {
    font-size: 12px;
    position: absolute;
    left: 0;
  }
  .email {
    font-size: 12px;
    color: rgba($color: #ffffff, $alpha: 0.5);
    margin-left: 20px;
  }
  a {
    color: #ffffff;
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  ul {
    margin-left: 18px;
    margin-bottom: 5px;
    display: none;
    li {
      height: 30px;
      line-height: 30px;
      a {
        color: rgba($color: #ffffff, $alpha: 0.7);
      }
    }
  }
}

.link.active {
  .title {
    .show {
      transform: rotate(45deg);
      transition: 0.3s;
    }
  }
  ul {
    display: block;
  }
}
</style>

