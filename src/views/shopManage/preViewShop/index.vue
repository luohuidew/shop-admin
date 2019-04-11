<template>
  <div class="creatshop-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('goodsManage.pc_divice')" name="pc">
        <Pc :store-info = "storeInfo" :good-list = "goodList" />
      </el-tab-pane>
      <el-tab-pane :label="$t('goodsManage.h5_divice')" name="h5">
        <Mobile :store-info = "storeInfo" :good-list = "goodList" />
      </el-tab-pane>
    </el-tabs>
    <div class="gobalck">
      <el-button type="primary" size="" @click="$router.go(-1)"> {{ $t("goodsManage.go_back") }}</el-button>
    </div>
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
  .gobalck {
    text-align: center;
    margin-top: 30px;
  }
</style>

