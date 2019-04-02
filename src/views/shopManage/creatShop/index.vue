<template>
  <div class="creatshop-container">
    <step :num="0"></step>
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="140px" label-position="left" >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Slogan" prop="Slogan">
        <el-input type="textarea" v-model="form.Slogan"></el-input>
      </el-form-item>
      <el-form-item label="店铺Logo" prop="logo">
        <imgUp></imgUp>
      </el-form-item>
      <el-form-item label="PC店铺背景" prop="logo">
        <imgUp></imgUp>
      </el-form-item>
      <el-form-item label="App店铺背景" prop="logo">
        <imgUp></imgUp>
      </el-form-item>
      <el-form-item label="销售数据店铺展示">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="开店时间" prop="time">
        <el-form-item prop="time">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="inns_url">
        <el-input v-model="form.inns_url"/>
      </el-form-item>
      <el-form-item label="facebook_url">
        <el-input v-model="form.facebook_url"/>
      </el-form-item>
      <el-form-item label="snapchat_url">
        <el-input v-model="form.snapchat_url"/>
      </el-form-item>
      <el-form-item label="联系人" prop="ren">
        <el-input v-model="form.ren"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="ren">
        <el-input v-model="form.tel"/>
      </el-form-item>
      <el-form-item label="详细地址" prop="ren">
        <el-input type="textarea" v-model="form.ren"></el-input>
      </el-form-item>
      <el-form-item label="详细地址2">
        <el-input type="textarea" v-model="form.ren"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="ren">
        <el-input v-model="form.cheng"/>
      </el-form-item>
      <el-form-item label="州" prop="ren">
        <el-input v-model="form.cheng"/>
      </el-form-item>
      <el-form-item label="邮编" prop="ren">
        <el-input v-model="form.cheng"/>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" class="but" @click="submitForm('ruleForm')">确定</el-button>
        <el-button type="primary" class="but" @click="form.logo=22">测试图片上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import imgUp from '@/components/imgUp'
import step from '@/components/step/index'
export default {
  components: {
    imgUp,
    step
  },
  data() {
    return {
      form: {
        name: '',
        Slogan: '',
        logo: '',
        time: '',
        inns_url: '',
        facebook_url: '',
        snapchat_url: '',
        ren: '',
        tel: '',
        dizhi: '',
        cheng: '',
        delivery: true
      },
      rules: {
        name: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ],
        time: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        ren: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!22');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
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

