<template>
  <div class="select-container">
    <step :num="1"/>
    <search @serch = "serch"/>
    <div class="tabel">
      <div class="top">
        <div class="title">推荐</div>
        <el-checkbox v-model="allChecked">全选</el-checkbox>
      </div>
      <div class="wrap">
        <ul>
          <li v-for="(item,index) in 12" :class="{selected: item.selected}">
            <div class="royalty">
              20%<br>盈利
            </div>
            <img src="@/assets/img/test.png" alt="">
            <p>Icons Print T-shirtIcons Print T-shirtIcons Print T-shirtIcons Print T-shirt</p>
            <div class="bottom">
              <div class="left">
                <div class="type">
                  <img src="@/assets/img/test.png" alt="">
                </div>
                <div class="price">
                  $54
                </div>
              </div>
              <div class="right">
                <el-checkbox v-model="allChecked"/>
              </div>
            </div>
          </li>
        </ul>
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
        <el-button type="primary" @click="pubgoods">已选择5个商品</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import step from '@/components/step/index'
import search from './component/search'

export default {
  components: {
    step,
    search
  },
  data() {
    return {
      allChecked: false,
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
    serch(val) {
      alert(val)
    },
    dataLoad() {},
    handlePageChange(val) {
      this.pagination.currentPage = val
      this.dataLoad()
    },
    pubgoods() {
      this.$router.push({ name: 'pubGood' })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-container {
  width: 1100px;
  margin: 0px auto;
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
                img {
                  height: 16px;
                  width: 68px;
                }
              }
              .price {
                font-size:12px;
                font-weight:bold;
                color:rgba(39,52,67,1);
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
</style>

