<template>
  <div class="dashboard-container">
    <div v-if="storeIdState === '1'">
      <h2>欢迎来到Weget商家后台，仅需3步开启 </h2>
      <el-button type="primary" @click="creatShop">创建店铺</el-button>
    </div>
    <div v-else-if="storeIdState === '3'">
      <h2>店铺还没有商品</h2>
      <el-button type="primary" @click="addDoods">添加商品</el-button>
    </div>
    <div v-else-if="storeIdState === '2'">
      <h2 >欢迎来到Weget商家后台，您的店铺已关闭</h2>
      <el-button type="primary" @click="openShop">开启店铺</el-button>
    </div>
    <div v-else>
      <h2 >欢迎来到Weget商家后台，继续添加商品</h2>
      <el-button type="primary" @click="addDoods">添加商品</el-button>
    </div>
    <img src="@/assets/img/liucheng.jpg" class="liucheng" alt="开店流程图" >
    <!--<div class="dashboard-text">name2:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { setStoreState } from '@/utils/auth'
import APIcreateShop from '@/api/shop'
import { getStoreId } from '@/utils/auth'
import apiLogin from '@/api/login'

export default {
  name: 'Dashboard',
  data() {
    return {
      storeIdState: ''
    }
  },
  created() {
    apiLogin.getStoreState().then((res) => { // 获取最新店铺状态
      const status = res.data.status
      this.storeIdState = status.toString()
      if (status) {
        setStoreState(status)
      }
    })
  },
  computed: {
    // ...mapGetters([
    //   'name',
    //   'roles'
    // ])
  },
  methods: {
    openShop() {
      APIcreateShop.releaseStore({ store_id: getStoreId() }).then(res => {
        this.$message({
          message: '店铺开启成功，请继续添加商品',
          type: 'success'
        })
        this.$router.push({ name: 'pubGood' })
      })
    },
    creatShop() {
      this.$router.push({ name: 'creatShop' })
    },
    addDoods() {
      // this.$router.push({ path: 'goodsManage'  })
      this.$router.push({ name: 'selectGood' })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    text-align: center;
    .liucheng {
      width: 1000px;
      display: inline-block;
      img {
        width: 100%;
      }
    }
    h2{
      margin-top: 146px;
      font-size:18px;
      font-weight:600;
      color:rgba(39,52,67,1);
      line-height:25px;
      margin-bottom: 77px;
    }
    img {
      margin-top: 107px;
      display: block;
      width: 1000px;
    }
  }
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
