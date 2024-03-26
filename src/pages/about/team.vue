<template>
  <div class="wrapper">
    <h1>RioStox Team</h1>
    <p>
      Meet some of our talented team members working in our officies in Hong Kong, Kuala Lumpur and Mainland China;
      helping to promote and progress our financial markets and the communities that they support for the prosperity of
      all.
    </p>
    <div class="team">
      <div class="person" v-for="(val, key) in teamList" :key="key">
        <div class="photo">
          <img :src="val.image" />
        </div>
        <div class="content">
          <h3>{{ val.name }}</h3>
          <p>{{ val.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamList: [
        {
          name: 'Phyrex Ni',
          value: 'Managing Director China',
          image: 'https://i.riostox.com/i/65/6513b1311633dfc8591171be180e3ed8.png',
        },
        {
          name: 'Alex Hui',
          value: 'Director of Operations',
          image: 'https://i.riostox.com/i/8d/8d79e46b95d3568de6cc051660c6dc0e.png',
        },
        {
          name: 'Argu Lin',
          value: 'Technical Director',
          image: 'https://i.riostox.com/i/5d/5d75322d6b679507ac0c1bf37e9471df.png',
        },
        {
          name: 'Stacie Meng',
          value: 'Partnerships Director',
          image: 'https://i.riostox.com/i/b8/b8cb2b5392c756f451ec10b27270c5f0.png',
        },
        {
          name: 'Harrison Cheung',
          value: 'BD Director',
          image: 'https://i.riostox.com/i/eb/eb4a0c1a43d6dc3ab44285b0df2ab4cb.png',
        },
        {
          name: 'Billy Magbanua',
          value: 'Product Manager',
          image: 'https://i.riostox.com/i/ed/edaac6c0cb4015f4b00cc0a94fdd791a.png',
        },
      ],
    }
  },
  components: {},
  mounted() {},
  watch: {},
}
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 1440px;
  margin: 130px auto;
  padding: 0 30px;
  h1 {
    color: #002060;
    font-size: 60px;
    line-height: 120%;
    font-weight: 700;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  p {
    font-size: 28px;
    line-height: 110%;
    font-weight: 400;
    color: #333;
    margin-top: 16px;
  }
  .team {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .person {
      display: flex;
      height: 242px;
      margin-top: 70px;
      .photo {
        display: block;
        width: 242px;
        height: 100%;
        border-radius: 50%;
        background: #c4c4c4;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .content {
        width: 422px;
        height: 100%;
        background: rgba(0, 32, 96, 0.25);
        border-radius: 5px;
        margin-left: -135px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        padding-left: 145px;
        h3 {
          font-size: 32px;
          margin: 0;
          color: #002060;
        }
        p {
          font-size: 20px;
          color: #000;
        }
      }
    }
  }
}
</style>
