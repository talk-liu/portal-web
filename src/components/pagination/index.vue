<template>
  <ul class="pagination">
    <li :class="{'disabled': current == 1}">
      <a class="arrow" href="javascript:;" @click="setCurrent(current - 1)"><</a>
    </li>
    <!-- <li :class="{'disabled': current == 1}">
      <a href="javascript:;" @click="setCurrent(1)">首页</a>
    </li> -->
    <li v-for="(item, index) in grouplist" :class="{'active': current == item.val}" :key="index">
      <a href="javascript:;" @click="setCurrent(item.val)">{{ item.text }}</a>
    </li>
    <!-- <li :class="{'disabled': current == page}">
      <a href="javascript:;" @click="setCurrent(page)">尾页</a>
    </li> -->
    <li :class="{'disabled': current == page}">
      <a class="arrow" href="javascript:;" @click="setCurrent(current + 1)">></a>
    </li>
  </ul>
</template>

<script type="es6">
export default {
  data() {
    return {
      current: this.currentPage,
    }
  },
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0,
    },
    pageSize: {
      // 每页显示条数
      type: Number,
      default: 10,
    },
    currentPage: {
      // 当前页码
      type: Number,
      default: 1,
    },
    pagerCount: {
      // 分页条数
      type: Number,
      default: 5,
    },
  },
  computed: {
    page() {
      // 总页数
      return Math.ceil(this.total / this.pageSize)
    },
    pagegroup() {
      // 页码个数
      let v = this.pagerCount
      v = v > 0 ? v : 5
      return v % 2 === 1 ? v : v + 1
    },
    grouplist() {
      // 获取分页页码
      let len = this.page,
        temp = [],
        list = [],
        count = Math.floor(this.pagegroup / 2),
        center = this.current
      // debugger
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len })
        }
        return temp
      }
      while (len--) {
        temp.push(this.page - len)
      }
      let idx = temp.indexOf(center)
      idx < count && (center = center + count - idx)
      this.current > this.page - count && (center = this.page - count)
      temp = temp.splice(center - count - 1, this.pagegroup)
      do {
        let t = temp.shift()
        list.push({
          text: t,
          val: t,
        })
      } while (temp.length)
      if (this.page > this.pagegroup) {
        this.current > count + 1 && list.unshift({ text: '...', val: list[0].val - 1 }) && list.unshift({ text: 1, val: 1 })
        this.current < this.page - count && list.push({ text: '...', val: list[list.length - 1].val + 1 }) && list.push({ text: this.page, val: this.page })
      }
      return list
    },
  },
  methods: {
    setCurrent: function(idx) {
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        this.current = idx
        this.$emit('pagechange', this.current)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  li {
    height: 30px;
    border-radius: 2px;
    margin: 0 3px;
    color: #666666;
    background: #f8f8fb;
    a {
      display: block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      color: #666666;
      border-radius: 2px;
      text-decoration: none;
    }
    &:hover {
      background: #ffd200;
      a {
        color: #333333;
      }
    }
  }
  .active {
    background: #ffd200;
    a {
      color: #333333;
    }
  }
  .disabled {
    &:hover {
      background: #f8f8fb;
      a {
        color: #cccccc;
      }
    }
    a {
      color: #cccccc;
      cursor: not-allowed;
    }
  }
}
</style>