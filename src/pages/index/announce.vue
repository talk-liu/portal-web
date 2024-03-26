<template>
  <div class="announce">
    <div class="wrap">
      <a
        v-for="(item, index) in list"
        :class="[item.isIco ? 'item' : 'item active']"
        :key="index"
        :href="item.link"
        :target="item.target ? '_blank' : '_self'"
      >
        <img v-if="!item.isIco" :src="item.bgUrl" alt>
        <div v-else class="ico" :style="backgroundHandler(item)">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{item.des}}</p>
          <img :src="item.currencyUrl" alt>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    backgroundHandler(item) {
      if (item.backgroundUrl) {
        return { backgroundImage: `url(${item.backgroundUrl})` }
      } else {
        return { backgroundColor: item.backgroundColor }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.announce {
  display: flex;
  justify-content: center;
  padding: 50px 0;
  .wrap {
    display: flex;
    width: 1400px;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.active {
  display: block;
  width: 335px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}

.ico {
  position: relative;
  width: 335px;
  height: 150px;
  padding: 24px;
  color: #ffffff;
  background-size: 100%;
  .title {
    font-size: 18px;
    line-height: 24px;
    font-family: euBold;
    font-weight: 500;
    margin-bottom: 19px;
  }
  .desc {
    font-size: 12px;
    line-height: 18px;
    overflow: hidden;
    height: 55px;
    font-weight: 100;
  }
  img {
    position: absolute;
    top: 20px;
    right: 24px;
    width: 30px;
    height: 30px;
  }
}

@include screen-md-new() {
  .announce {
    .wrap {
      width: 1000px;
      justify-content: space-around;
      .item {
        margin-bottom: 20px;
      }
    }
  }
}

@include screen-sm-new() {
  .announce {
    .wrap {
      width: 700px;
      .item {
        margin-bottom: 20px;
      }
    }
  }
}

@include screen-h5-new() {
  .announce {
    background: #fafafa;
    padding: 15px 20px 0;
    .wrap {
      width: 100%;
      .item {
        width: 100%;
        height: pxtovw(150px);
        margin-bottom: pxtovw(15px);
      }
      .ico {
        width: 100%;
        height: pxtovw(150px);
        .title {
          font-size: pxtovw(18px);
          line-height: pxtovw(24px);
          margin-bottom: pxtovw(19px);
        }
        .desc {
          font-size: pxtovw(12px);
          height: pxtovw(60px);
          line-height: pxtovw(20px);
        }
        img {
          top: pxtovw(20px);
          right: pxtovw(24px);
          width: pxtovw(30px);
          height: pxtovw(30px);
        }
      }
    }
  }
}
</style>

