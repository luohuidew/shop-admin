<template>
  <div class="select-container">
    <step :num="2"/>
    <div class="good-wrap">
      <div class="top">
        <div class="title">商品列表</div>
        <div class="des">
          <span>共30个商品，最多可添加120个商品</span>
          <el-button type="primary" size="small">添加商品</el-button>
        </div>
      </div>
      <div class="wrap">
        <div class="title">
          <span>
            时间排序
            <i class="el-icon-d-caret"/>
          </span>
          <span>
            金额排序
            <i class="el-icon-d-caret"/>
          </span>
        </div>
        <div class="list">
          <el-row>
            <el-col v-for="(index) in 9" :span="12" :key="index">
              <div class="cotent">
                <div class="img-good">
                  <div class="royalty">
                    20%<br>盈利
                  </div>
                  <img class="" src="@/assets/img/test.png" alt="">
                </div>

                <div class="right">
                  <div class="ti">Vneck Opera Print Ov
                  </div>
                  <div class="type">
                    <img src="@/assets/img/test.png" alt="">
                  </div>
                  <div class="price">
                    $26
                  </div>
                  <div class="btn">
                    <el-button size="mini" type="primary" class="padding">置顶</el-button>
                    <span><i class="el-icon-delete  color" /></span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"/></el-col>
          </el-row>
        </div>
      </div>
      <div class="page">
        <el-pagination
          :layout= "pagination.layout"
          :total= "pagination.total"
          :page-sizes="pagination.pageSizes"
          :current-page="pagination.currentPage"
          background
          @current-change = "handlePageChange"
          @prev-click = "handlePageChange"
          @next-click = "handlePageChange"
        />
        <div>
          <el-button type="primary" @click="perView">预览店铺</el-button>
          <el-button type="primary" @click="pubgoods">发布商品到店铺</el-button>
        </div>

      </div>
    </div>
    <el-dialog
      :visible.sync="dialogPusVisible"
      title="发布商品"
      width="30%">
      <span class="dialog-cotent">恭喜您，发布成功，可到App或者pc端查看<br>
        填写收款信息，有助于您的收款</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMoneyInfo">去填写</el-button>
        <el-button type="primary" @click="dialogPusVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import step from '@/components/step/index'

export default {
  components: {
    step
  },
  data() {
    return {
      dialogPusVisible: false,
      pagination: {
        layout: 'prev, pager, next',
        total: 1000,
        pageSizes: 20,
        currentPage: 3
      }
    }
  },
  created() {},
  methods: {
    dataLoad() {},
    handlePageChange(val) {
      this.pagination.currentPage = val
      this.dataLoad()
    },
    pubgoods() {
      this.dialogPusVisible = true
    },
    perView() {
      this.$router.push({ name: 'preViewShop' })
    },
    addMoneyInfo() {
      this.$router.push({ name: 'settlement' })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-container {
  width: 1100px;
  margin: 0px auto;
}
  .good-wrap {
    margin-top:30px ;
    .top{
      display: flex;
      height: 30px;
      /*border:1px solid red;*/
      justify-content: space-between;
        .title {
          font-size: 24px;
          font-weight: 600;
          color: rgba(39, 52, 67, 1);
          line-height: 30px;
        }
      .des {
        color:rgba(39,52,67,1);
        font-size: 14px;
        font-weight: 400;
      }
    }
    .wrap {
      .title {
        height: 40px;
        background:rgba(225,225,225,1);
        justify-content: flex-end;
        display: flex;
        align-items: center;
        font-weight:400;
        font-size:14px;
        margin-top: 30px;
        color:rgba(39,52,67,1);
        span {
          cursor: pointer;
          display: inline-block;
          margin-right: 20px;
        }
      }
      .list {
        border-left: 1px solid #E1E1E1;

        .cotent {
          border-right: 1px solid #E1E1E1;
          border-bottom: 1px solid #E1E1E1;
          box-sizing: border-box;
          padding: 20px;
          height: 160px;
          display: flex;
          &:nth-child(1){
          }
          &:nth-child(2){
          }
          .img-good {
            position: relative;
            width:120px;
            height:120px;
            border-radius: 6px;
            overflow: hidden;
            margin-right: 20px;
            img {
              width: 100%;
              height:100%;
            }
            .royalty {
              position: absolute;
              border-radius: 50%;
              background: #DB1C27;
              height: 40px;
              width: 40px;
              justify-content: center;
              text-align: center;
              display: flex;
              align-items: center;
              font-weight:600;
              font-size: 12px;
              color: #fff;
              right: 5px;
              top:5px
            }

          }
          .right {
            flex: 1;
            .ti {
              margin-top: 8px;
              font-size:14px;
              font-weight:400;
              color:rgba(39,52,67,1);
            }
            .type >img{
              margin-top: 8px;
              display: inline-block;
              height: 16px;
            }
            .price {
              margin-top: 8px;
              font-size:14px;
              font-weight:400;
              color:rgba(39,52,67,1);
            }
            .btn {
              margin-top: 8px;
              .padding {
              }
              span {
                cursor: pointer;
                display: inline-block;
                background:rgba(245,108,108,1);
                border-radius: 50%;
                padding: 6px 7px;
                margin-left: 20px;
                .color {
                  color: #fff;
                }
              }
            }
          }

        }
      }
    }
    .page {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 100px;
    }
  }
.select-container .dialog-cotent {
  line-height: 30px;
}
</style>

