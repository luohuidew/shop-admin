<template>
  <div class="select-container"
       v-loading.fullscreen.lock="gloablLoading"
       element-loading-text="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <step :num="1" v-if="storeState==='1' || storeState=='3'" />
    <search :serch-datas = "serchData" @serch = "serch"/>
    <div class="tabel">
      <div class="top">
        <div class="title">推荐</div>
        <el-checkbox v-model="allChecked" @change="AllSlectChange">全选</el-checkbox>
      </div>
      <div
        v-loading="loading"
        class="wrap"
      >
        <ul>
          <li v-for="(item) in goodList" :key="item.sku_id" class="selected">
            <div class="royalty">
              {{ item.profit }}%<br>盈利
            </div>
            <img :src="item.cover_img" alt="">
            <p>{{ item.title }}</p>
            <div class="bottom">
              <div class="left">
                <div class="type">
                  <span>{{ item.tag_names[0] }}</span>
                </div>
                <div class="price">
                  ${{ item.alone_price }}
                </div>
              </div>
              <div class="right">
                <el-checkbox v-model="item.selected" :disabled = "item.in_store" @change = "selectChange" />
              </div>
            </div>
          </li>
        </ul>
        <div v-show="goodList.length === 0" class="nogood">
          没有搜索到商品
        </div>
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
        <el-button type="primary" @click="pubgoods">已选择{{ selectAllSize }}个商品</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import step from '@/components/step/index'
import search from './component/search'
import APIcreateShop from '@/api/shop'
import { getStoreId, getStoreState } from '@/utils/auth'

export default {
  components: {
    step,
    search
  },
  data() {
    return {
      storeState: getStoreState(),
      gloablLoading: false,
      loading: false,
      selectAllGood: {},
      goodList: [],
      allChecked: false,
      serchData: {},
      pagination: {
        layout: 'prev, pager, next',
        total: 18,
        pageSize: 18,
        currentPage: 1
      },
      serchCache: {},
      selectAllSize: 0
    }
  },
  created() {
    this.getType()
  },
  methods: {
    selectGoodChange(item) {
      item.selected = !item.selected
    },
    AllSlectChange(val) {
      if (val) {
        this.goodList.map((item) => {
          item.selected = true
        })
      } else {
        this.goodList.map((item) => {
          item.selected = false
        })
      }
      this.selectChange()
    },
    selectChange() { // 存储选中的值
      const currentpage = this.pagination.currentPage
      let ary = this.goodList.map((item) => {
        if (item.selected) {
          return item.sku_id
        } else {
          return false
        }
      })
      ary = ary.filter((items) => {
        return items !== false
      })
      const currenpageSelectId = this.CURRENTSelectId
      let copyId = []
      if (currenpageSelectId instanceof Array) {
        copyId = [...currenpageSelectId]
      }
      const ids = [...new Set([...copyId, ...ary])]
      this.goodList.forEach((item) => {
        if (!item.selected) {
          const index = ids.indexOf(item.sku_id)
          if (index !== -1) {
            ids.splice(index, 1)
          }
        }
      })
      this.selectAllGood[currentpage] = [...ids]
      if (ary.length === this.goodList.length) { // 判断是否全选
        this.allChecked = true
      } else {
        this.allChecked = false
      }
      this.selectAllSize = this.getAllSelectId().length
    },
    getType() { // 获取分类页
      this.gloablLoading = true
      APIcreateShop.getGoodsType({ store_id: getStoreId() }).then((res) => {
        this.serchData = res.data
        const datas = res.data.recommend
        const allId = this.getAllSelectId()
        datas.forEach((item) => {
          item.selected = false // 添加未选中状态
          if (allId.includes(item.sku_id)) {
            item.selected = true // 已选择的选中
          }
        })
        this.goodList = datas
        this.gloablLoading = false
      }).catch(() => {
        this.gloablLoading = false
      })
    },
    getAllSelectId() { // 获取选中商品的id
      const keys = Object.keys(this.selectAllGood)
      let array = []
      keys.forEach((currentpage) => {
        array = [...array, ...this.selectAllGood[currentpage]]
      })
      return Array.from(new Set([...array]))
    },
    serch(obj) { // 搜索商品接口
      this.CURRENTSelectId = this.selectAllGood[this.pagination.currentPage]
      obj.store_id = getStoreId()
      obj.page = this.pagination.currentPage
      this.serchCache = obj
      const allId = this.getAllSelectId()
      this.loading = true
      APIcreateShop.getGoodsList(obj).then((res) => {
        this.loading = false
        const datas = res.data
        this.pagination.total = datas.totle
        datas.data.forEach((item) => {
          item.selected = false // 添加未选中状态
          if (allId.includes(item.sku_id)) {
            item.selected = true // 已选择的选中
          }
        })
        this.goodList = datas.data
      }).catch(() => {
        this.loading = false
      })
    },
    dataLoad() {

    },
    handlePageChange(val) {
      this.pagination.currentPage = val
      this.serch(this.serchCache)
    },
    pubgoods() {
      this.$router.push({ name: 'pubGood' })
      const allId = this.getAllSelectId()
      if (allId.length === 0) {
        this.$message({
          type: 'info',
          message: '请先选择商品'
        })
        return
      }
      const param = {
        sku_id: allId,
        store_id: getStoreId()
      }
      APIcreateShop.pubgoods(param).then((res) => {
        this.selectAllGood = {}
        this.selectAllSize = 0
        this.serch(this.serchCache)
        this.$message({
          type: 'success',
          message: '商品添加成功'
        })
        this.$router.push({ name: 'pubGood' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-container {
  width: 1100px;
  margin: 30px auto;
}
  .tabel {
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
    }
    .wrap{
      margin: 0px -20px;
      overflow: hidden;
      ul {
        width: 100%;
        overflow: hidden;
        li {
          /*&:hover {*/
            /*border:1px solid rgba(155,155,155,1);*/
          /*}*/
          position: relative;
          float: left;
          height: 247px;
          width: 166px;
          margin-left: 20px;
          margin-top: 20px;
          box-sizing: border-box;
          border-radius:6px;
          padding: 10px;
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
            right: 15px;
            top:15px
          }
          &.selected {
            border:1px solid rgba(155,155,155,1);
          }
          img {
            width:146px;
            height:146px;
            border-radius:6px;
            display: block;
          }
          p{
            color:rgba(39,52,67,1);
            font-weight:400;
            font-size:12px;
            height: 30px;
            line-height: 16px;
            overflow: hidden;
            margin: 6px 0px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;//规定几行显示省略号
            -webkit-box-orient: vertical;
          }
          .bottom{
            height: 36px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content:space-between;
              .type {
                width: 125px;
                height: 16px;
                overflow: hidden;
                white-space: nowrap;
                span {
                  display: inline-block;
                  white-space: nowrap;
                  height: 16px;
                  margin-top: -3px;
                  padding: 1px 3px;
                  font-size: 12px;
                  color: #ffff;
                  background: linear-gradient(to right, #F77062 , #FE5196); /* 标准的语法 */
                }
              }
              .price {
                margin-top: 7px;
                font-size:12px;
                font-weight:bold;
                color:rgba(39,52,67,1);
              }
            }
          }
        }
      }
      .nogood{
        color:#99a9bf;
        line-height: 50px;
        text-align: center;
      }
    }
    .page {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 100px;
    }
  }
</style>

