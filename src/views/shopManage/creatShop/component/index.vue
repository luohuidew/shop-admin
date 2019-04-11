<template>
  <div class="creatshop-container">
    <step v-if="creat" :num="0" />
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="200px" label-position="left" >
      <el-form-item :label="$t('shopCreate.name')" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.Slogan')" prop="desc">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.logo')">
        <imgUp :propURl = "form.logo" @upload = "successImg($event, 'logo')" />
      </el-form-item>
      <el-form-item :label="$t('shopCreate.pc_background_url')">
        <imgUp :propURl = "form.pc_background_url" @upload = "successImg($event, 'pc_background_url')" />
      </el-form-item>
      <el-form-item :label="$t('shopCreate.mobile_background_url')" >
        <imgUp :propURl = "form.mobile_background_url" @upload = "successImg($event, 'mobile_background_url')" />
      </el-form-item>
      <el-form-item :label="$t('shopCreate.is_help_order')" >
        <el-switch v-model="form.is_help_order" :active-value="1" :inactive-value="2" />
      </el-form-item>
      <el-form-item :label="$t('shopCreate.open_time')" >
        <el-date-picker v-model="form.open_time"  type="date" :placeholder="$t('shopCreate.select_val')"
          style="width: 100%;"/>
      </el-form-item>
      <el-form-item label="Inns_url">
        <el-input v-model="form.inns_url"/>
      </el-form-item>
      <el-form-item label="Facebook_url">
        <el-input v-model="form.facebook_url"/>
      </el-form-item>
      <el-form-item label="Snapchat_url">
        <el-input v-model="form.snapchat_url"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.Contact_name')"  prop="contacts">
        <el-input v-model="form.contacts"/>
      </el-form-item>
      <el-form-item  :label="$t('shopCreate.Contact_iphone')" prop="phone">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.Contact_email')" prop="email">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.Address')" prop="address">
        <el-input v-model="form.address" type="textarea"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.Address2')">
        <el-input v-model="form.address1" type="textarea"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.City')" prop="city">
        <el-input v-model="form.city"/>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.State')" prop="state">
        <el-select v-model="form.state" :placeholder="$t('shopCreate.select_val')">
          <el-option
            v-for="item in MapState"
            :key="item.state"
            :label="item.state"
            :value="item.state">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('shopCreate.Zipcode')" prop="zipcode">
        <el-input v-model="form.zipcode"/>
      </el-form-item>
      <el-form-item >
        <el-button v-if="creat === true" type="primary" class="but" @click="submitForm('ruleForm')">{{$t('shopCreate.save')}}</el-button>
        <el-button v-if="creat === false" type="primary" class="but" @click="submitForm('ruleForm')">{{$t('shopCreate.edit_but')}}</el-button>
        <el-button v-if="creat === false && !closeStoreState" type="primary" class="but" @click="closeStore">{{$t('shopCreate.lose_shop')}}</el-button>
        <el-button v-if="creat === false && closeStoreState" type="primary" class="but" @click="openStore">{{$t('shopCreate.open_shop')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import imgUp from '@/components/imgUp'
import step from '@/components/step/index'
import APIcreateShop from '@/api/shop'
import apiLogin from '@/api/login'
import { setStoreId, getStoreId, setStoreState } from '@/utils/auth'

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
          { required: true, trigger: 'blur' }
        ],
        address: [
          { required: true, trigger: 'blur' }
        ],
        name: [
          { required: true, trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Slogan is required', trigger: 'blur' }
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
          { required: true,  trigger: 'blur' }
        ],
        phone: [
          { required: true,  trigger: 'blur' }
        ],
        city: [
          { required: true,  trigger: 'blur' }
        ],
        state: [
          { required: true,  trigger: 'blur' }
        ],
        zipcode: [
          { required: true, trigger: 'blur' }
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
          message: this.$t('shopCreate.close_shop_suceess'),
          type: 'success'
        })
        this.closeStoreState = true
      })
    },
    openStore() {
      APIcreateShop.releaseStore({ store_id: getStoreId() }).then(res => {
        this.$message({
          message: this.$t('shopCreate.open_shop_suceess'),
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
          message: this.$t('shopCreate.img_required'),
          type: 'warning'
        })
        return
      } else if (!this.form.pc_background_url) {
        this.$message({
          message: this.$t('shopCreate.img_required'),
          type: 'warning'
        })
        return
      } else if (!this.form.mobile_background_url) {
        this.$message({
          message: this.$t('shopCreate.img_required'),
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
                message: this.$t('shopCreate.creat_shop_suceess'), // 店铺创建成功
                type: 'success'
              })
              apiLogin.getStoreState().then((res) => { // 获取最新店铺状态
                const status = res.data.status
                if (status) {
                  setStoreState(status)
                }
              })
              this.$router.push({ name: 'selectGood' })
            })
          } else { // 编辑店铺
            APIcreateShop.updateShop(this.form).then((res) => {
              this.$message({
                message: this.$t('shopCreate.eadit_shop_suceess'),
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

