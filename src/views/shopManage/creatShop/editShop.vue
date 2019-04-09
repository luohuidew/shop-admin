<template>
  <ShopInfo :creat = "creat"/>
</template>

<script>
import ShopInfo from './component/index'
import { setStoreState } from '@/utils/auth'

export default {
  components: {
    ShopInfo
  },
  data() {
    return {
      creat: setStoreState() === '1'
    }
  },
  created() {
  },
  methods: {
    // onCancel() {
    //   this.$message({
    //     message: 'cancel!',
    //     type: 'warning'
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
  .creatshop-container{
    width: 700px;
    display: table;
    margin: 20px auto;
    .but{
      width: 220px;
    }
    & /deep/ .el-form-item__label {
      font-weight:400;
      font-size:12px;
      color:rgba(39,52,67,1);
    }
  }
</style>

