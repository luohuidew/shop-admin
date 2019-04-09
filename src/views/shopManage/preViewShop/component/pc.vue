<template>
  <div class="pc">
    <header>
      <img :src="storeInfo.pc_background_url" class="bg" alt="">
      <div class="info">
        <div class="logo">
          <img :src="storeInfo.logo" alt="">
        </div>
        <div class="des">
          <span>{{ storeInfo.name }}</span> <br>
          {{ storeInfo.open_time }}
        </div>
      </div>
    </header>
    <section class="good-wrap">
      <h3>Daily Wow</h3>
      <ul>
        <li v-for="(item) in goodList" :key="item.sku_id">
          <div class="img">
            <img :src="item.cover_img" alt="">
          </div>
          <p>{{ item.title }}</p>
          <div class="type">
            <img  v-for="tag in item.show_tag" :src="tag.mask_bg_image" alt="">
          </div>
          <div class="price">
            ${{ item.market_price }}
          </div>
        </li>
      </ul>
      <div class="nogood" v-if="goodList.length === 0">
        您还没有商品
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    goodList: {
      type: Array,
      default() {
        return []
      }
    },
    storeInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    // storeInfo(re) {
    //   alert(33)
    //   console.log(re, 9999999999999999999999999999)
    // }
  },
  data() {
    return {
    }
  },
  created() {
    // console.log(this.storeInfo, 999999999999)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .pc {
    width: 1100px;
    margin: 0px auto;
    header {
      padding-bottom: 90px;
      position: relative;
      img.bg {
        display: block;
        width: 100%;
      }
      .info {
        height: 100px;
        .logo {
          display: inline-block;
          padding: 5px;
          height: 120px;
          width: 120px;
          margin-top: -50px;
          background: #fff;
          border-radius: 50%;
          img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
          }
        }
        .des {
          display: inline-block;
          margin-left: 20px;
          span {
            font-size:24px;
            font-weight:500;
            color:rgba(0,0,0,1);
          }
          font-size:14px;
          line-height: 25px;
          font-weight:400;
          color:rgba(74,74,74,1);
        }
      }
    }
    .good-wrap {
      width: 980px;
      margin: 0px auto;
      .nogood {
        line-height: 50px;
        font-size: 14px;
        color: #99a9bf;
        text-align: center;
      }
      h3 {
        font-size:20px;
        font-weight:600;
        color:rgba(0,0,0,1);
        line-height: 30px;
      }
      ul {
        display: block;
        margin: 0px -20px;
        overflow: hidden;
        li {
          display: inline-block;
          margin: 20px 0px 0px 20px;
          height: 336px;
          width: 230px;
          box-sizing: border-box;
          padding: 15px;
          border-radius: 6px;
          border:1px solid #F3F3F3;
          .img {
            height: 200px;
            width: 200px;
            img {
              width: 200px;
              height: 200px;
              border-radius: 6px;
            }
          }
          p{
            font-size:14px;
            font-weight:400;
            color:rgba(74,74,74,1);
            line-height: 20px;
            margin: 8px 0px;
            overflow: hidden;
            height: 40px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;//规定几行显示省略号
            -webkit-box-orient: vertical;
          }
          .type {
            height: 20px;
            overflow: hidden;
            white-space: nowrap;
            img{
              display: inline-block;
              white-space: nowrap;
              height: 16px;
              margin-right: 5px;
            }
            span{
                display: inline-block;
                white-space: nowrap;
                margin-top: 0px;
                padding: 2px 3px;
                 margin-right: 5px;
                font-size: 12px;
                color: #ffff;
                background: linear-gradient(to right, #F77062 , #FE5196); /* 标准的语法 */
            }
          }
          .price {
            margin-top: 10px;
            font-size:18px;
            font-weight:600;
            color:rgba(0,0,0,1);
            line-height:18px;
          }
        }
      }
    }
  }
</style>

