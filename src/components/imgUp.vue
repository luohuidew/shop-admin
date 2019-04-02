<template>
  <div>
    <el-upload
      v-loading="loading"
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
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="img">
      <img src="" alt="">
      <i class="el-icon-error"></i>
    </div>
  </div>
</template>

<script>
// import { Message } from 'element-ui'
// import { BASE_API } from '@/utils/config.js'
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    base_url() {
      return '?width='
    }
  },
  methods: {
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
        this.$message.error('上传头像图片大小不能超过 1MB!')
        return false
      } else {
        this.loading = true
        return true
      }
    },
    successupload(response, file) {
      // console.log(window.URL.createObjectURL(file.raw));
      if (response.code !== 1000) {
        this.$message.error('图片上传失败，请重试')
      } else {
        this.loading = false
        this.$message({
          type: 'success',
          message: '上传成功成功!'
        })
        this.$emit('upload', response)
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

</style>

