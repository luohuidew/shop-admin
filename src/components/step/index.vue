<template>
  <div class="step">
    <el-steps :active="num" align-center finish-status="success" >
      <el-step :title="$t('step.Store_preferences')"/>
      <el-step :title="$t('step.Select_products')"/>
      <el-step :title="$t('step.Adjust_publish')"/>
    </el-steps>
  </div>
</template>

<script>

export default {
  name: 'Step',
  props: {
    num: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
    }
  },
  computed: {
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .step {
    width: 550px;
    margin: 30px auto;
    margin-bottom: 0px;
    & /deep/ .is-process .el-step__icon.is-text{
      background:#273443;
      color: #273443;
      border: none;
    }
    & /deep/ .el-step__title {
      font-size:14px ;
    }
    & /deep/ .is-wait .el-step__icon.is-text{
      background:#B0B0B0;
      color: #B0B0B0;
      border: none;
    }
    & /deep/ .is-success .el-step__icon.is-text{
      background:#273443;
      color: #273443;
      border: none;
    }
    & /deep/ .el-step__head.is-success {
      color: #273443;
      border-color: #273443;
    }
    & /deep/ .el-step__title.is-success {
      color: #273443;
    }
    & /deep/ .el-step__head.is-success .el-step__line {
      background-color: #273443
    }
  }

</style>
