<template>
  <div>
    <el-upload
      v-loading="loading"
      v-show="!imgshow"
      :headers="{'Encrypt-Sign':'77df195c07d2694225b2c3f36e12f1a22c3305e602f5e09f6c0f80bf2a4f70c2'}"
      :action="base_url"
      :before-upload="beforeAvatarUpload"
      :on-success="successupload"
      :show-file-list = "false"
      class="img-upload"
    >
      <div tabindex="0" class="el-upload el-upload--picture-card">
        <i class="el-icon-plus"/>
      </div>
      <div slot="tip" class="el-upload__tip">{{ $t('shopCreate.logo_size')}}</div>
    </el-upload>
    <div v-show="imgshow" class="img">
      <!--<img src="" alt="">-->
      <img :src="originUrl" class="upload-success-img">
      <i class="el-icon-error icons" @click="deleteImg"/>
    </div>
  </div>
</template>

<script>
// import { Message } from 'element-ui'
// import { BASE_API } from '@/utils/config.js'
const baseUrl = process.env.BASE_API
export default {
  props: {
    propURl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      imgshow: false,
      originUrl: '',
      base_url: `${baseUrl}/pop/upload/uploadImage`,
    }
  },
  computed: {

  },
  watch: {
    propURl(url) {
      if (!this.firstimg) { // 只要第一次传过来的值
        this.firstimg = true
        this.imgshow = url !== ''
        this.originUrl = url
      }

    }
  },
  methods: {
    deleteImg() {
      this.originUrl = ' '
      this.imgshow = false
      this.$emit('upload', undefined)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1
      // const isJPG = file.type === 'image/jpeg/png'
      // this.$loading({
      //   target:'.img-upload'
      // })
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error('limit to 1MB')
        return false
      } else {
        this.loading = true
        return true
      }
    },
    successupload(response, file) {
      // console.log();
      console.log(response)
      if (response.code !== 1000) {
        this.loading = false
        this.$message.error('upload fails, please try again')
      } else {
        this.imgshow = true
        this.originUrl = window.URL.createObjectURL(file.raw)
        this.loading = false
        this.$message({
          type: 'success',
          message: 'upload success!'
        })
        this.$emit('upload', response.data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .img-upload {
    & /deep/ .el-upload--picture-card {
      width: 50px;
      height: 50px;
      line-height: 60px;
    }
  }
  .upload-success-img{
    width: 300px;
  }
  .img {
    position: relative;
    img {
      vertical-align: middle;
    }
    .icons {
      vertical-align: middle;
      font-size: 30px;
      cursor: pointer;
    }
  }

</style>

