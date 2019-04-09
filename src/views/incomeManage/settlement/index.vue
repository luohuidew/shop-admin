<template>
  <div class="select-container">
    <div class="wrap">
      <div class="herader">
        <div class="num">
          <span>${{ datas.today_price }}</span>
          <br>今日交易金额
        </div>
        <div class="num">
          <span>${{ datas.today_profit }}</span>
          <br>今日收益
        </div>
        <div class="num">
          <span>${{ datas.profit }}</span>
          <br>累计收益
        </div>
        <div class="num">
          <span>${{ datas.valid_profit }}</span>
          <br>可领取收益
        </div>
      </div>
      <div class="content">
        <p>今日交易金额=今日卖出商品总额</p>
        <p>今日收益=所有商品收益相加（商品收益=交易额*收益比率）</p>
        <p>累计收益=开店以来的累计收益</p>
        <p>可领取收益=超过30天的可领取收益（因为购买商品我们支持30天退换货，所以要等用户确认不会退换后结算）</p>
      </div>
      <div class="activ">
        <span> 收款方式：</span>
        <template v-if="datas.pay">
          <img src="@/assets/img/paypal.png" alt="" v-if="datas.pay_method === 1" >
          <span>{{ datas.pay_account }}</span>
        </template>

        <el-button type="primary" class="edit" v-if ="datas.pay" @click="editpaypal" >修改</el-button>
        <el-button type="primary" class="edit" v-else @click="addpaypal" >添加账号</el-button>
      </div>
      <p class="end">每个月可以提交一次结算申请，我们将会在7天内给您打款。如有问题，您可联系info@weget.com</p>
    </div>
    <div class="apply">
      <el-button type="primary" class="edit" @click="apply" >申请结算</el-button>
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
        您的可领取收益为0，没法为您结算
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogApplay()">关闭</el-button>
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

