<template>
  <div class="creatshop-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="PC端" name="pc">
        <Pc :store-info = "storeInfo" :good-list = "goodList" />
      </el-tab-pane>
      <el-tab-pane label="移动端" name="h5">
        <Mobile :store-info = "storeInfo" :good-list = "goodList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Mobile from './component/h5'
import Pc from './component/pc'
import { getStoreId } from '@/utils/auth'
import APIShop from '@/api/shop'

export default {
  components: {
    Mobile,
    Pc
  },
  data() {
    return {
      activeName: 'pc',
      storeInfo: {},
      goodList: []
    }
  },
  created() {
    this.initStae()
  },
  methods: {
    initStae() {
      APIShop.getStoreInfo({ store_id: getStoreId() }).then((res) => {
        const data = res.data
        this.storeInfo = data.store_info
        this.goodList = data.store_list.data
        console.log(this.storeInfo)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .creatshop-container{
    width: 1100px;
    margin: 20px auto;
  }
</style>

