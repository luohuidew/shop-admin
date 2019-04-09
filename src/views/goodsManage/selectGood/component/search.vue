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
        <el-button type="primary" size="small" @click="search(true)" >搜索</el-button>
      </div>
    </div>
    <div class="content">
      <div class="label">
        <div class="type-name">类目</div>
        <div class="type-conten">
          <dl>
            <dt v-for="(item) in serchData.category" :key="item.id">
              <span :class="{'active': item.active}" class="fristType" @click="methodCategoryOne(item)" >
                {{ item.cat_name }}
              </span>
            </dt>
          </dl>
          <section v-if="subsetCategory.length > 0" >
            <dl>
              <dt v-for="(item) in subsetCategory" :key="item.id">
                <span :class="{'active': item.active}" @click="methodCategoryTwo(item)">
                  {{ item.cat_name }}
                </span>
              </dt>
            </dl>
          </section>
          <section v-if="subsetCategory2.length > 0">
            <dl>
              <dt v-for="(item) in subsetCategory2" :key="item.id" >
                <span :class="{'active': item.active}" @click="methodCategoryThree(item)">{{ item.cat_name }}</span>
              </dt>
            </dl>
          </section>
        </div>
      </div>
      <div class="label">
        <div class="type-name">brand</div>
        <div class="type-conten">
          <dl>
            <dt v-for="(item, index) in serchData.brand" :key="index">
              <span :class="{'active': item.active}" class="fristType" @click="methodBrand(item)"> {{ item.letter }} </span>
            </dt>
          </dl>
          <section v-if="subsetBrand.length > 0" >
            <dl>
              <dt v-for="(item) in subsetBrand" :key="item.id">
                <span :class="{'active': item.active}" @click="methodSubsetBrand(item)">{{ item.brand_name }}</span>
              </dt>
            </dl>
          </section>
        </div>
      </div>
      <div class="label">
        <div class="type-name">tag</div>
        <div class="type-conten">
          <dl>
            <dt v-for="(item) in serchData.tag" :key="item.tag_id">
              <span :class="{'active': item.active}" @click="methodTag(item)"> {{ item.tag_name }} </span>
            </dt>
          </dl>
        </div>
      </div>
      <div class="bottom">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <el-button type="info" size="small" @click="resetStyle(serchData)">清空搜索条件</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    serchDatas: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      serchData: this.serchDatas,
      searchVal: '',
      subsetCategory: [],
      subsetCategory2: [],
      subsetBrand: [],
      serchObj: {
        brind_id: undefined,
        tag_id: undefined,
        cate_id: undefined,
        keywords: undefined
      }
    }
  },
  watch: {
    serchDatas: {
      handler(newName) {
        if (newName.brand) {
          this.resetStyle(JSON.parse(JSON.stringify(newName)))
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  created() {
    // console.log(this.serchData)
  },
  methods: {
    resetStyle(obj) {
      obj.brand.forEach((item_brand) => {
        item_brand.active = false
        item_brand.brand.forEach((item_brand2) => {
          item_brand2.active = false
        })
      })
      obj.tag.forEach((item_tag) => {
        item_tag.active = false
      })
      obj.category.forEach((item_category1) => {
        item_category1.active = false
        item_category1.subset.forEach((item_category2) => {
          item_category2.active = false
          item_category2.subset.forEach((item_category3) => {
            item_category3.active = false
          })
        })
      })
      this.serchData = obj
      this.serchObj.brind_id = undefined
      this.serchObj.tag_id = undefined
      this.serchObj.cate_id = undefined
    },
    methodCategoryOne(item) { // 点击一级分类
      console.log(item)
      this.serchObj.cate_id = item.id
      this.subsetCategory = item.subset
      this.serchData.category.forEach((item_category1) => {
        item_category1.active = false
        item_category1.subset.forEach((item_category2) => {
          item_category2.active = false
          item_category2.subset.forEach((item_category3) => {
            item_category3.active = false
          })
        })
      })
      item.active = true
    },
    methodCategoryTwo(item) { // 点击二级分类
      this.serchObj.cate_id = item.id
      this.subsetCategory2 = item.subset
      this.serchData.category.forEach((item_category1) => {
        item_category1.subset.forEach((item_category2) => {
          item_category2.active = false
          item_category2.subset.forEach((item_category3) => {
            item_category3.active = false
          })
        })
      })
      item.active = true
    },
    methodCategoryThree(item) { // 点击三级级分类
      this.serchObj.cate_id = item.id
      this.serchData.category.forEach((item_category1) => {
        item_category1.subset.forEach((item_category2) => {
          item_category2.subset.forEach((item_category3) => {
            item_category3.active = false
          })
        })
      })
      item.active = true
    },
    methodBrand(item) {
      this.serchData.brand.forEach((item_brand) => {
        item_brand.active = false
        item_brand.brand.forEach((item_brand2) => {
          item_brand2.active = false
        })
      })
      this.subsetBrand = item.brand
      item.active = true
    },
    methodSubsetBrand(item) { // 点击一级分类
      this.serchObj.brind_id = item.id
      this.serchData.brand.forEach((item_brand) => {
        item_brand.brand.forEach((item_brand2) => {
          item_brand2.active = false
        })
      })
      item.active = true
    },
    methodTag(item) { // 点击一级分类
      this.serchObj.tag_id = item.tag_id
      this.serchData.tag.forEach((item_tag) => {
        item_tag.active = false
      })
      item.active = true
    },
    search(val) {
      if (val) {
        this.serchObj.keywords = this.searchVal
        this.$emit('serch', this.serchObj)
      } else {
        this.serchObj.keywords = undefined
        this.$emit('serch', this.serchObj)
      }
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
        flex-shrink: 0;
        background:rgba(248,248,248,1);
        font-size:14px;
        font-weight:400;
      }
      .type-conten {
        max-height: 200px;
        flex-grow: 1;
        overflow-y: scroll;
        section {
          &:nth-of-type(1) {
            padding-left: 10px;
          }
          &:nth-of-type(2) {
            padding-left: 20px;
          }
        }
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
            cursor:pointer;
            span{
              &.active {
                color: #4A90E2;
              }
              padding: 8px;
              font-size: 14px;
              color: #273443;
            }
            .fristType {
              color: #9B9B9B;
            }
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

