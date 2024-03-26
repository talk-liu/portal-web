<template>
  <router-link v-if="menu.isRoute" @click.native.stop :to="$i18nRoute({path: menu.url})" class="menu-item">
    <i v-if="menu.icon && !menu.hideName" :class="['iconfont', menu.icon]"/>
    {{menu.name}}
    <slot></slot>
  </router-link>
  <span v-else-if="menu.handleClick" class="menu-item" @click.stop="menu.handleClick">
    <i v-if="menu.icon && !menu.hideName" :class="['iconfont', menu.icon]"/>
    {{menu.name}}
    <slot></slot>
  </span>
  <a
    v-else-if="menu.url"
    :class="['menu-item', menu.icon && menu.hideName ? `iconfont ${menu.icon}` : '']"
    :href="menu.url"
    :target="menu.target ? menu.target : '_self'"
  >
    <i v-if="menu.icon && !menu.hideName" :class="['iconfont', menu.icon]"/>
    {{menu.hideName ? '' : menu.name}}
    <slot></slot>
  </a>
  <a
    v-else-if="menu.urlObj"
    :class="['menu-item', menu.icon && menu.hideName ? `iconfont ${menu.icon}` : '']"
    :href="menu.urlObj[$fifth.lang] ? menu.urlObj[$fifth.lang] : menu.urlObj.en"
    :target="menu.target ? menu.target : '_self'"
  >
    <i v-if="menu.icon && !menu.hideName" :class="['iconfont', menu.icon]"/>
    {{menu.hideName ? '' : menu.name}}
    <slot></slot>
  </a>
  <span v-else :class="['menu-item', menu.icon && menu.hideName ? `iconfont ${menu.icon}` : '']">
    <i v-if="menu.icon && !menu.hideName" :class="['iconfont', menu.icon]"/>
    {{menu.hideName ? '' : menu.name}}
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
    },
  },
}
</script>
