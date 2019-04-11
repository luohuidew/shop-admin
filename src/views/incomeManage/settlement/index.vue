<template>
  <div class="select-container">
    <div class="wrap">
      <div class="herader">
        <div class="num">
          <span>${{ datas.today_price }}</span>
          <br>{{ $t("incomeManage.today_price") }}
        </div>
        <div class="num">
          <span>${{ datas.today_profit }}</span>
          <br>{{ $t("incomeManage.today_profit") }}
        </div>
        <div class="num">
          <span>${{ datas.profit }}</span>
          <br>{{ $t("incomeManage.profit") }}
        </div>
        <div class="num">
          <span>${{ datas.valid_profit }}</span>
          <br>{{ $t("incomeManage.valid_profit") }}
        </div>
      </div>
      <div class="content">
        <p>{{ $t("incomeManage.title1") }}</p>
        <p>{{ $t("incomeManage.title2") }}</p>
        <p>{{ $t("incomeManage.title3") }}</p>
        <p>{{ $t("incomeManage.title4") }}</p>
      </div>
      <div class="activ">
        <span> {{ $t("incomeManage.payType") }}：</span>
        <template v-if="datas.pay">
          <img src="@/assets/img/paypal.png" alt="" v-if="datas.pay_method === 1" >
          <span>{{ datas.pay_account }}</span>
        </template>

        <el-button type="primary" class="edit" v-if ="datas.pay" @click="editpaypal" >{{ $t("incomeManage.edit_but") }}</el-button>
        <el-button type="primary" class="edit" v-else @click="addpaypal" >{{ $t("incomeManage.add_but") }}</el-button>
      </div>
      <p class="end">{{ $t("incomeManage.income_info") }}</p>
    </div>
    <div class="apply">
      <el-button type="primary" class="edit" @click="apply" >{{ $t("incomeManage.apply_but") }}</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogPayPalVisible"
      title=""
      width="30%" >
      <div class="dialog-wrap">
        <el-form ref="paypalForm" :rules="paypalFormRules" :model="paypalForm" label-position="top" label-width="100px" >
          <el-form-item
            label="请输入PayPal账户邮箱"
            prop="email"
          >
            <el-input v-model="paypalForm.email" type="text" autocomplete="off"/>
          </el-form-item>
          <el-form-item
            label="请再次输入PayPal账户邮箱*"
            prop="checkemail"
          >
            <el-input v-model="paypalForm.checkemail" type="text" autocomplete="off"/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('paypalForm')">确 定</el-button>
        <el-button @click="resetForm('paypalForm')">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogApplayVisible"
      title=""
      width="30%" >
      <div class="dialog-apply">
        {{ $t("incomeManage.Unable") }}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogApplay()">{{ $t("incomeManage.Close") }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import APIincome from '@/api/income'
  import { getStoreId } from '@/utils/auth'

export default {
  components: {
  },
  data() {
    const checkEmailAgin = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入邮箱'))
      } else if (value !== this.paypalForm.email) {
        callback(new Error('两次输入的邮箱不一致!'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      dialogPayPalVisible: false,
      dialogApplayVisible: false,
      datas: {},
      paypalForm: {
        email: '',
        checkemail: ''
      },
      paypalFormRules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        checkemail: [
          { validator: checkEmailAgin, trigger: 'blur' }
        ]

      }

    }
  },
  created() {
    this.dataLoad()
  },
  methods: {
    dialogApplay() {
      this.dialogApplayVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            method: 1,
            account: this.paypalForm.email,
            store_id: getStoreId()
          }
          if (this.EDITAPPLY) {
            APIincome.updatePayMethod(param).then((res) => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.dataLoad()
              this.dialogPayPalVisible = false
            })
          } else {
            APIincome.AddPayMethod(param).then((res) => {
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.dataLoad()
              this.dialogPayPalVisible = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogPayPalVisible = false
      this.$refs[formName].resetFields()
    },
    dataLoad() {
      APIincome.storeStatistics({ store_id: getStoreId() }).then((res) => {
        this.datas = res.data
      })
    },
    apply() {
      APIincome.storeSettle({ store_id: getStoreId() }).then((res) => {
        if (res.data.status === 1) {
          this.dialogApplayVisible = true
        }
      })
    },
    editpaypal() {
      this.EDITAPPLY = true
      this.dialogPayPalVisible = true
      this.paypalForm.email = this.datas.pay_account
    },
    addpaypal() {
      this.EDITAPPLY = false
      this.dialogPayPalVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.select-container {
  width: 1100px;
  margin: 0px auto;
  .wrap{
    margin-top: 50px;
    padding: 30px;
    border: 1px solid #E1E1E1;
    .herader{
      padding-bottom: 30px;
      border-bottom: 1px solid #E1E1E1;
      display: flex;
      .num{
        flex: 1;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid #E1E1E1;
        font-size:14px;
        font-weight:400;
        color:rgba(39,52,67,1);
        &:last-child{
          border: 0px;
        }
        span{
          font-size:24px;
          font-weight:600;
          color:rgba(39,52,67,1);
        }
      }
    }
    .content{
      padding-top: 5px;
      font-size:12px;
      font-weight:400;
      color:rgba(155,155,155,1);
      padding-bottom: 7px;
      line-height: 24px;
      border-bottom: 1px solid #E1E1E1;
    }
    .activ {
      margin-top: 20px;
      span {
        display: inline-block;
        font-size:14px;
        vertical-align: middle;

        font-weight:600;
        color:rgba(39,52,67,1);
        &:nth-of-type(2) {
          font-weight:400;
        }
      }
      img{
        display: inline-block;
        width: 33px;
        vertical-align: middle;
        height: 20px;
      }
      .edit{
        margin-left: 30px;
      }
    }
    .end {
      font-size:12px;
      font-weight:400;
      line-height: 30px;
      color:rgba(155,155,155,1);
    }
  }
  .apply {
    text-align: right;
    margin-top: 20px;
  }
  .dialog-apply {
    font-size:16px;
    font-weight:600;
    color:rgba(39,52,67,1);
  }
}
</style>

