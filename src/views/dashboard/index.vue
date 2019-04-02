<template>
  <div class="dashboard-container">
    <div>
      <h2>欢迎来到Weget商家后台，仅需3步开启</h2>
      <h2>欢迎来到Weget商家后台，您的店铺已关闭</h2>
      <el-button type="primary" @click="openShop">开启店铺</el-button>
    </div>
    <div>
      <h2>店铺还没有商品</h2>
      <h2>欢迎来到Weget商家后台，您的店铺已关闭</h2>
      <el-button type="primary" @click="addDoods">添加商品</el-button>
    </div>
    <img src="" alt="开店流程图">
    <!--<div class="dashboard-text">name2:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    console.log(this.$store.getters.roles, 2222)
  },
  methods: {
    openShop() {
      // this.$router.push({ path: 'goodsManage' })
      this.$router.push({ name: 'creatShop' })
    },
    addDoods() {
      // this.$router.push({ path: 'goodsManage' })
      this.$router.push({ name: 'selectGood' })
    },
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    text-align: center;
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
