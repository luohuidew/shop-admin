<template>
  <div class="wraps">
    <div class="h5">
      <header>
        <div class="bg">
         <img src="@/assets/img/test.png" alt="" class="shop-bg">
          <div class="avte">
            <img src="@/assets/img/test.png" alt="">
            <p>
              <span>Amour</span><br>
              <span class="time">Store Since 01 Jan 2019</span>
            </p>
          </div>
        </div>
        <div class="info">
          <img src="@/assets/img/production.png" alt=""> Products: 3474
        </div>
        <div class="info">
          <img src="@/assets/img/storeInfo.png" alt="">
          <span> Fashion flows through the air and changes constantly with passing times. An approaching revolution can…</span>
        </div>
      </header>
      <section class="good-wrap">
        <h3>Daily Wow</h3>
        <ul>
          <li v-for="(index) in 10" :key="index">
            <div class="img">
              <img src="@/assets/img/test.png" alt="">
            </div>
            <p>AOC Long Snowflake Earrings AOC Long Snowflake Earrings</p>
            <div class="type">
              <img src="@/assets/img/test.png" alt="">
            </div>
            <div class="price">
              $12.90
            </div>
          </li>
        </ul>
      </section>
    </div>
    <footer>
      <img src="@/assets/img/h5bottom.png" alt="">
    </footer>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .wraps {
    position: relative;
    height: 700px;
    width: 430px;
    border: 1px solid #ccc;
    overflow:hidden;
    margin: 20px auto;
    background:rgba(243,243,243,1);
    footer{
      position: absolute;
      bottom: -15px;
      left: 0px;
      height: 80px;
      width: 100%;
      img {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 70px;
      }
    }
  }
 .h5 {
   padding-bottom: 80px;
   position: relative;
      height: 700px;
      overflow-y: scroll;
      header {
        padding-bottom: 15px;
        .bg {
          width: 100%;
          min-height: 130px;
          position: relative;
          .shop-bg{
            width: 100%;
            min-height: 130px;
          }
          .avte{
            position: absolute;
            bottom: 10px;
            width: 100%;
            height: 50px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: inline-block;
              margin-right: 10px;
              margin-left: 20px;
              vertical-align: middle;
            }
            p{
              color: #fff;
              height: 40px;
              display: inline-block;
              font-size:14px;
              font-weight:bold;
              vertical-align: middle;
              line-height: 20px;
              .time{
                font-weight: 400;
              }
            }
          }
        }
        .info{
          /*&:after{*/
          /*height: 100%;*/
          /*width: 1px;*/
          /*content: '';*/
          /*display: inline-block;*/
          /*vertical-align: middle;*/
          /*}*/
          padding: 10px 20px 0px;
          font-size:12px;
          font-weight:400;
          color:rgba(74,74,74,1);
          vertical-align: middle;
          display: flex;
          align-items: center;
          img {
            width: 18px;
            height: 18px;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
          }
          span{
            flex: 1;
            display: inline-block;
            line-height: 15px;
            vertical-align: middle;
          }
        }
      }
      .good-wrap {
        background:rgba(243,243,243,1);
        padding: 0 15px;
        h3 {
          font-size:18px;
          font-weight:bold;
          color:rgba(0,0,0,1);
          line-height: 40px;
        }
        ul {
          margin: 0px -15px;
          overflow: hidden;
          li {
            background: #fff;
            margin-bottom: 15px;
            float: left;
            margin-left: 13px;
            height: 286px;
            width: 187px;
            box-sizing: border-box;
            .img {
              width: 186px;
              height: 186px;
              img {
                width: 100%;
                height: 186px;
                border-radius: 6px;
              }
            }
            p {
              padding: 0px 10px;
              font-size:12px;
              font-weight:400;
              color:rgba(74,74,74,1);
              line-height: 20px;
              height: 38px;
              margin: 5px 0px;
              overflow: hidden;
              line-height: 18px;
            }
            .type {
              padding: 0px 10px;
              height: 16px;
              margin: 6px 0px;
              img {
                height: 16px;
              }
            }
            .price {
              margin: 10px 0px;
              padding: 0px 10px;
              font-size:14px;
              font-weight:400;
              color:rgba(0,0,0,1);
            }
          }
        }
      }
    }
</style>

