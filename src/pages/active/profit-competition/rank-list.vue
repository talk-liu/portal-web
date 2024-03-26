<template>
  <section class="rank-wraps ofh">
    <slot name="title">
      <div class="title"></div>
    </slot>
    <dl class="ranklist">
      <dt>
        <p>{{tableName.rank}}</p>
        <p>{{tableName.username}}</p>
        <p>{{tableName.return}}</p>
      </dt>
      <dd v-for="(item, index) in rankData" :key="index" >
        <p>{{item.rank}}</p>
        <p>{{item.email}}</p>
        <p>{{item.profit_rate}}</p>
      </dd>
    </dl>
    <slot name="tips">
      <div class="tips"></div>
    </slot>
  </section>
</template>
<script>
export default {
  props: ['tableName', 'rankData']
}
</script>
<style lang="scss" scoped>
.rank-wraps {
  width: 100%;
  padding: 0 2%;
  border-radius: 4px;
  // border: solid 1px #eaedf5;
  box-shadow: 0 0 0 1px #eaedf5;
  text-align: center;
  .title {
    line-height: 18px;
    margin: 24px 0 18px;
    font-size: 12px;
    color: #666666;
  }
  .ranklist {
    border-top: 1px solid #f8f8fb;
    dt,
    dd {
      display: flex;
      p {
        &:nth-child(1) {
          width: 20%;
        }
        &:nth-child(2) {
          width: 50%;
        }
        &:nth-child(3) {
          width: 30%;
        }
      }
    }
    dt {
      height: 44px;
      line-height: 44px;
      font-size: 12px;
      color: #777777;
    }
    dd {
      height: 34px;
      line-height: 34px;
      font-size: 13px;
      color: #666666;
      &:nth-child(2n) {
        background: #fafafa;
      }
    }
  }
  .tips {
    line-height: 20px;
    margin: 30px auto 18px;
    font-size: 12px;
    color: #666666;
  }
}
</style>
