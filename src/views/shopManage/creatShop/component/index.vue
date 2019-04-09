<template>
  <div class="creatshop-container">
    <step v-if="creat" :num="0" />
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="140px" label-position="left" >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="Slogan" prop="desc">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item label="店铺Logo">
        <imgUp :propURl = "form.logo" @upload = "successImg($event, 'logo')" />
      </el-form-item>
      <el-form-item label="PC店铺背景" >
        <imgUp :propURl = "form.pc_background_url" @upload = "successImg($event, 'pc_background_url')" />
      </el-form-item>
      <el-form-item label="App店铺背景" >
        <imgUp :propURl = "form.mobile_background_url" @upload = "successImg($event, 'mobile_background_url')" />
      </el-form-item>
      <el-form-item label="销售数据店铺展示">
        <el-switch v-model="form.is_help_order" :active-value="1" :inactive-value="2" />
      </el-form-item>
      <el-form-item label="开店时间" >
        <el-date-picker v-model="form.open_time"  type="date" placeholder="选择日期"
          style="width: 100%;"/>
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
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model="form.contacts"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="联系邮箱" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" type="textarea"/>
      </el-form-item>
      <el-form-item label="详细地址2">
        <el-input v-model="form.address1" type="textarea"/>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="form.city"/>
      </el-form-item>
      <el-form-item label="州" prop="state">
        <el-select v-model="form.state" placeholder="请选择">
          <el-option
            v-for="item in MapState"
            :key="item.state"
            :label="item.state"
            :value="item.state">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮编" prop="zipcode">
        <el-input v-model="form.zipcode"/>
      </el-form-item>
      <el-form-item >
        <el-button v-if="creat === true" type="primary" class="but" @click="submitForm('ruleForm')">确定</el-button>
        <el-button v-if="creat === false" type="primary" class="but" @click="submitForm('ruleForm')">修改</el-button>
        <el-button v-if="creat === false && !closeStoreState" type="primary" class="but" @click="closeStore">关闭店铺</el-button>
        <el-button v-if="creat === false && closeStoreState" type="primary" class="but" @click="openStore">开启店铺</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import imgUp from '@/components/imgUp'
import step from '@/components/step/index'
import APIcreateShop from '@/api/shop'
import { setStoreId, getStoreId } from '@/utils/auth'

export default {
  components: {
    imgUp,
    step
  },
  props: {
    creat: {
      type: Boolean
    }
  },
  data() {
    return {
      MapState: [],
      closeStoreState: false,
      form: {
        name: '',
        desc: '',
        logo: '',
        pc_background_url: '',
        mobile_background_url: '',
        is_help_order: '',
        open_time: '',
        inns_url: '',
        facebook_url: '',
        snapchat_url: '',
        contacts: '',
        phone: '',
        email: '',
        address: '',
        address1: '',
        city: '',
        state: '',
        zipcode: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        // logo: [
        //   { required: true, message: '请上传图片', trigger: 'change' }
        // ],
        // pclogo: [
        //   { required: true, message: '请上传图片', trigger: 'change' }
        // ],
        // applogo: [
        //   { required: true, message: '请上传图片', trigger: 'change' }
        // ],
        // open_time: [
        //   { type: 'date', required: true, message: '请选择日期'}
        // ],
        contacts: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ],
        zipcode: [
          { required: true, message: '请输入信息', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (!this.creat) {
      this.init_state()
    } else {
      APIcreateShop.getStates().then(res => {
        this.MapState = res.data
      })
    }
  },
  methods: {
    closeStore() {
      APIcreateShop.closeStore({ store_id: getStoreId() }).then(res => {
        this.$message({
          message: '店铺关闭成功',
          type: 'success'
        })
        this.closeStoreState = true
      })
    },
    openStore() {
      APIcreateShop.releaseStore({ store_id: getStoreId() }).then(res => {
        this.$message({
          message: '店铺开启成功',
          type: 'success'
        })
        this.closeStoreState = false
      })
    },
    init_state() {
      APIcreateShop.getData({ store_id: getStoreId() }).then(res => {
        this.form = res.data.info
        this.MapState = res.data.address
        this.closeStoreState = res.data.info.is_closed === 1 // is_closed =1 关闭 is_closed =2 不关闭
      })
    },
    successImg(urls, key) {
      this.form[key] = urls
    },
    submitForm(formName) {
      if (!this.form.logo) {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
        return
      } else if (!this.form.pc_background_url) {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
        return
      } else if (!this.form.mobile_background_url) {
        this.$message({
          message: '请上传图片',
          type: 'warning'
        })
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.creat) { // 第一次创建店铺
            APIcreateShop.createShop(this.form).then((res) => {
              setStoreId(res.data.store_id)
              this.$message({
                message: '店铺创建成功',
                type: 'success'
              })
              this.$router.push({ name: 'selectGood' })
            })
          } else { // 编辑店铺
            APIcreateShop.updateShop(this.form).then((res) => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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

