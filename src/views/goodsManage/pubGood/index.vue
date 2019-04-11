<template>
  <div class="select-container">
    <step v-if="storeState==='1' || storeState==='3'" :num="2"/>
    <div class="good-wrap">
      <div class="top">
        <div class="title">{{ $t("goodsManage.goos_list") }}</div>
        <div class="des">
          <span v-show="language === 'zh'">已发布{{ goodsListLength }}个商品，最多可发布120个商品 </span>
          <span v-show="language === 'en'">{{ goodsListLength }} Products Selected, Max. 120 products could be sdded </span>
          <el-button type="primary" size="small" @click="addGoods">{{ $t("goodsManage.add_good") }}</el-button>
        </div>
      </div>
      <div
        v-loading="loadingGood"
        class="wrap"
        element-loading-text="loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)">
        <div class="title">
          <el-radio-group v-model="tabPosition">
            <el-radio-button label="Already" size="small" >{{ $t("goodsManage.published") }}</el-radio-button>
            <el-radio-button label="noready" size="small" >{{ $t("goodsManage.Unpublished") }}</el-radio-button>
          </el-radio-group>
          <div>
            <span @click="timeSort">
              {{ $t("goodsManage.Sort_time") }}
              <i class="el-icon-d-caret"/>
            </span>
            <span @click="priceSort">
              {{ $t("goodsManage.Sort_price") }}
              <i class="el-icon-d-caret"/>
            </span>
          </div>
        </div>
        <div class="list">
          <el-row>
            <el-col v-for="(item) in goodsList" :span="12" :key="item.sku_id">
              <div class="cotent">
                <div class="img-good">
                  <div class="royalty">
                    {{ item.profit }}%<br>{{ $t("goodsManage.profit") }}
                  </div>
                  <img :src="item.cover_img" class="" alt="">
                </div>

                <div class="right">
                  <div class="ti">{{ item.title }}
                  </div>
                  <div class="type">
                    <span v-for="tag in item.tag_names">{{ tag }}</span>
                  </div>
                  <div class="price">
                    ${{ item.market_price }}
                  </div>
                  <div class="btn">
                    <el-button size="mini" type="primary" class="padding" @click="setTopDood(item)">{{ $t("goodsManage.good_set_top") }}</el-button>
                    <span @click="deleteDood(item)"><i class="el-icon-delete  color" /></span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <p v-if="goodsList.length === 0" class="nogoods">
          {{ $t("goodsManage.search_empty") }}
        </p>
      </div>
      <div class="page">
        <el-pagination
          :layout= "pagination.layout"
          :total= "pagination.total"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          background
          @current-change = "handlePageChange"
          @prev-click = "handlePageChange"
          @next-click = "handlePageChange"
        />
        <div>
          <el-button type="primary" @click="perView">{{ $t("goodsManage.preview") }}</el-button>
          <el-button v-show="tabPosition === 'noready'" type="primary" @click="pubgoods">{{ $t("goodsManage.push_shop") }}</el-button>
        </div>

      </div>
    </div>
    <el-dialog
      :visible.sync="dialogPusVisible"
      :title="$t('goodsManage.Publish_goods')"
      width="30%">
      <span class="dialog-cotent">{{ $t("goodsManage.Publish_succee") }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMoneyInfo">{{ $t("goodsManage.go_add") }}</el-button>
        <el-button type="primary" @click="dialogPusVisible = false">{{ $t("goodsManage.close") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import step from '@/components/step/index'
import APIcreateShop from '@/api/shop'
import APIincome from '@/api/income'
import { getStoreId, getStoreState } from '@/utils/auth'

export default {
  components: {
    step
  },
  data() {
    return {
      storeState: getStoreState(),
      loadingGood: false,
      tabPosition: 'Already',
      goodsListEd: [], // 已发布商品列表
      goodsListNo: [], // 未发布商品列表
      goodsList: [],
      goodsListLength: 0,
      dialogPusVisible: false,
      pagination: {
        layout: 'prev, pager, next',
        total: 100,
        pageSize: 18,
        currentPage: 1
      },
      timeSortSate: 'desc',
      priceSortSate: 'desc'
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  watch: {
    tabPosition: function(newval) {
      if (newval === 'noready') {
        this.initData()
      } else {
        this.initData()
      }
    }
  },
  created() {
    if (this.$route.query.down === 1) {
      this.tabPosition = 'noready' // 会触发watch
      this.getGoodSize()
    }
    this.initData()
    this.shopInfo()
  },
  methods: {
    getGoodSize() {
      APIcreateShop.getShopgoods({ down: 2, store_id: getStoreId() }).then((res) => {
        this.goodsListLength = res.data.total
      })
    },
    shopInfo() {
      APIincome.storeStatistics({ store_id: getStoreId() }).then((res) => {
        this.INFOSHOP = res.data
      })
    },
    timeSort() {
      const param = {
        sort: this.timeSortSate,
        order: 'create_time'
      }
      this.initData(param)
      if (this.timeSortSate === 'asc') {
        this.timeSortSate = 'desc'
      } else {
        this.timeSortSate = 'asc'
      }
    },
    priceSort() {
      const param = {
        sort: this.priceSortSate,
        order: 'price'
      }
      this.initData(param)
      if (this.priceSortSate === 'asc') {
        this.priceSortSate = 'desc'
      } else {
        this.priceSortSate = 'asc'
      }
    },
    setTopDood(item) {
      const param = {
        store_id: getStoreId(),
        sku_id: item.sku_id
      }
      APIcreateShop.setGoodTop(param).then((res) => {
        this.$message({
          type: 'success',
          message: '置顶成功'
        })
        this.initData()
      }).catch(() => {
      })
    },
    deleteDood(item) {
      const param = {
        store_id: getStoreId(),
        sku_id: item.sku_id
      }
      APIcreateShop.deleteGood(param).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.initData(this.CACHEOBJ)
      }).catch(() => {
      })
    },
    initData(obj = {}) {
      const param = {
        store_id: getStoreId(),
        page: this.pagination.currentPage,
        down: obj.down,
        sort: obj.sort,
        order: obj.order
      }
      this.CACHEOBJ = { ...param }
      if (this.tabPosition === 'noready') { // 未发布
        param.down = 1
      } else {
        param.down = 2
      }
      this.loadingGood = true
      APIcreateShop.getShopgoods(param).then((res) => {
        this.loadingGood = false
        const data = res.data.data
        const total = res.data.total
        this.pagination.total = total
        if (param.down === 1) {
          this.goodsListNo = data
          this.goodsList = data
        } else {
          this.goodsListEd = data
          this.goodsList = data
          this.goodsListLength = total
        }
      }).catch(() => {
        this.loadingGood = false
      })
    },
    addGoods() {
      this.$router.push({ name: 'selectGood' })
    },
    handlePageChange(val) {
      this.pagination.currentPage = val
      this.initData(this.CACHEOBJ)
    },
    pubgoods() {
      APIcreateShop.releaseStore({ store_id: getStoreId() }).then((res) => {
        if (this.INFOSHOP.pay) {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
          this.initData(this.CACHEOBJ)
        } else {
          this.dialogPusVisible = true
        }
      }).catch(() => {
      })
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
      min-height: 200px;
      .title {
        height: 40px;
        background:rgba(225,225,225,1);
        justify-content: space-between;
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
            .type {
              overflow: hidden;
              margin-top: 8px;
              height: 20px;
                span {
                  display: inline-block;
                  white-space: nowrap;
                  margin-top: -3px;
                  padding: 2px 3px;
                  font-size: 12px;
                  color: #ffff;
                  margin-right: 10px;
                  background: linear-gradient(to right, #F77062 , #FE5196); /* 标准的语法 */
                }
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
    .nogoods{
      line-height: 50px;
      text-align: center;
      color: #d3dce6;
    }
  }
.select-container .dialog-cotent {
  line-height: 30px;
}
</style>

