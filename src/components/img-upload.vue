<template>
  <div class="img-upload_wrap">
    <div class="upload-box">
      <img ref='imgRef' class="file-img" :src="src" @click="upload">
      <input type="file" class="file-input" @change="change" :name="name" :id="id">
      <div class="upload-btn">
        <v-btn type="info" @click="upload" class="btn">{{$t('m.identity.uploadBtn')}}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import VBtn from '@/components/btn'
import Message from '@/utils/message'
export default {
  props: ['name', 'id'],
  components: {
    VBtn,
  },
  data() {
    return {
      src: '',
    }
  },
  methods: {
    upload() {
      document.getElementsByClassName('file-input').click()
    },
    // 图片格式
    isImg(str) {
      return str.indexOf('image') > -1 ? true : false
    },
    change(event) {
      const file = event.target.files[0]

      if (!this.isImg(file.type)) {
        Message.warn(this.$t('m.errMessages.imgErr'))
        event.target.value = ''
        return
      }

      // 2M以内
      if (file.size / 1024 / 1024 > 2) {
        Message.warn(this.$t('m.errMessages.imgSizeErr'))
        event.target.value = ''
        return
      }

      const imgFile = event.target.files[0]
      const fr = new FileReader()

      fr.onload = () => {
        // this.src = fr.result;
        const newImg = new Image()
        newImg.src = fr.result
        newImg.onload = () => {
          this.clipImg(newImg)
        }
      }

      fr.readAsDataURL(imgFile)
    },
    desImg(width, height) {
      if (width * height <= 960 * 640) {
        return { targetWidth: width, targetHeight: height }
      }
      width = (width * 3) / 4
      height = (height * 3) / 4
      return this.desImg(width, height)
    },
    clipImg(img) {
      const { targetWidth, targetHeight } = this.desImg(img.width, img.height)

      // 缩放图片需要的canvas
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      // canvas对图片进行缩放
      canvas.width = targetWidth
      canvas.height = targetHeight
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight)
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight)
      this.src = canvas.toDataURL('image/jpeg')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variable.scss';

.img-upload_wrap {
  .upload-box {
    border-radius: 3px;
    position: relative;
    width: 320px;
    height: 180px;
    background-color: #fdfdfd;
    border: 1px dashed $color-line;
    display: flex;
    align-items: center;
    justify-content: center;
    .file-img {
      position: absolute;
      max-width: 318px;
      max-height: 178px;
      z-index: 999;
    }
    .upload-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .file-input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: 9999;
      &:hover {
        .upload-btn {
          background-color: $color-primary;
          color: $color-text;
        }
      }
    }
  }
}
</style>

<style>
.file-input:active + .upload-btn .btn button {
  background-color: #ffd200;
  border-color: #ffd200;
  color: #333333;
}
</style>
