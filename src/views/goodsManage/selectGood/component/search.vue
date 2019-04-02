<template>
  <div class="cearch-wrap">
    <div class="title">
      <div class="name">商品库</div>
      <div class="btn">
        <el-input
          v-model="searchVal"
          size="small"
          placeholder=""
          class="search-input"
          suffix-icon="el-icon-search"/>
        <el-button type="primary" size="small" >搜索</el-button>
      </div>
    </div>
    <div class="content">
      <div class="label">
        <div class="type-name">类目</div>
        <div class="type-conten">
          <dl>
            <dt>全部</dt>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
          </dl>
          <section>
            <dl>
              <dt>女装A</dt>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
            </dl>
          </section>
          <section>
            <dl>
              <dt>女装A_1</dt>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
            </dl>
          </section>
        </div>
      </div>
      <div class="label">
        <div class="type-name">类目</div>
        <div class="type-conten">
          <dl>
            <dt>全部</dt>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
            <dd>女装</dd>
          </dl>
          <section>
            <dl>
              <dt>女装A</dt>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
              <dd>女装A</dd>
            </dl>
          </section>
          <section>
            <dl>
              <dt>女装A_1</dt>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
              <dd>女装A_1</dd>
            </dl>
          </section>
        </div>
      </div>
      <div class="bottom">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="info" size="small">清空搜索条件</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      searchVal: ''
    }
  },
  methods: {
    search() {
      this.$emit('serch', 11)
    }
  }
}
</script>

<style lang="scss" scoped>
.cearch-wrap {
  .title {
    display: flex;
    height: 30px;
    /*border:1px solid red;*/
    justify-content: space-between;
    .name{
      font-size:24px;
      font-weight:600;
      color:rgba(39,52,67,1);
      line-height:30px;
    }
    .btn {
      width: 350px;
      .search-input {
        width: 250px;
        margin-right: 14px;
      }
      .search-btn{
        height: 30px;
        padding: 0px 20px;
      }
    }
    margin-bottom: 20px;
  }
  .content {
    border: 1px solid rgba(229,229,229,1) ;
    border-top: 0;
    .label {
      border-top:1px solid rgba(229,229,229,1) ;
      display: flex;
      line-height: 40px;
      .type-name {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        background:rgba(248,248,248,1);
        font-size:14px;
        font-weight:400;
      }
      .type-conten {
        flex-grow: 1;
        dl {
          display: block;
          margin: 0px;
          line-height: 34px;
          dt, dd{
            margin: 0px;
            display: inline-block;
            font-size:14px;
            line-height: 1;
            font-weight:400;
            padding: 8px;
            cursor:pointer;
          }
        }
      }
    }
    .bottom {
      border-top:1px solid rgba(229,229,229,1) ;
      text-align: right;
      line-height: 46px;
      padding-right: 20px;
    }
  }
}
</style>

