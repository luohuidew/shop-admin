<template>
  <div class="creatshop-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="PC端" name="pc">
        <Pc/>
      </el-tab-pane>
      <el-tab-pane label="移动端" name="h5">
        <Mobile/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Mobile from './component/h5'
import Pc from './component/pc'
export default {
  components: {
    Mobile,
    Pc
  },
  data() {
    return {
      activeName: 'pc'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .creatshop-container{
    width: 1100px;
    margin: 20px auto;
  }
</style>

