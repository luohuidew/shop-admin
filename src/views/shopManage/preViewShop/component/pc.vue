<template>
  <div class="pc">
    <header>
      <img class="bg" src="@/assets/img/test.png" alt="">
      <div class="info">
        <div class="logo">
          <img src="@/assets/img/test.png" alt="">
        </div>
        <div class="des">
          <span>MAISON</span> <br>
          Store since Mar 31 2019
        </div>
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
            margin: 10px 0px;
          }
          .type {
            height: 16px;
            overflow: hidden;
            img {
              display: inline-block;
              height: 16px;
              margin-right: 10px;
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

