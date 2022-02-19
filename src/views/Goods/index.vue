<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a
          @click="handleSort(i)"
          :class="{ active: i === isIndex }"
          href="javascript:;"
          v-for="(navItem, i) in navList"
          :key="i"
          >{{ navItem.title }}</a
        >
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min" />
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max" />
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="reset"
            >确定</el-button
          >
        </div>
      </div>
    </div>
    <div>
      <div class="goods-box w">
        <mall-goods
          v-for="(goods, i) in goodLists"
          :key="goods + i"
          :goods="goods"
        ></mall-goods>
      </div>
      <div class="w">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[8, 20, 40, 80]"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MallGoods from "@/components/MallGoods";
import { getGoodlists, getTypegoodslists } from "../../api/goods";
export default {
  components: {
    MallGoods,
  },
  data() {
    return {
      navList: [
        { title: "综合排序" },
        { title: "价格由低到高" },
        { title: "价格由高到低" },
      ],
      isIndex: 0,
      //最高价钱
      max: "",
      //最低价钱
      min: "",
      //当前页码
      currentPage: 1,
      //当前页的商品数量
      pageSize: 20,
      //排序顺序
      sort: "",
      //全部商品的数量
      total: 0,
      //当前页面的商品
      goodLists: [],
    };
  },
  watch: {
    $route: "getGoods",
  },
  created() {
    //获取全部商品数据
    this.getGoods();
  },
  methods: {
    //切换当前页面商品数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoods();
    },
    //切换当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    //获取商品数据
    getGoods() {
      const params = {
        page: this.currentPage,
        size: this.pageSize,
        sort: this.sort,
        priceGt: this.min,
        priceLte: this.max,
      };
      if (this.$route.query.cid) {
        console.log(this.$route.query.cid);
        getTypegoodslists({
          params: {
            page: this.currentPage,
            size: this.pageSize,
            sort: this.sort,
            priceGt: this.min,
            priceLte: this.max,
            goods_type: this.$route.query.cid,
          },
        }).then((res) => {
          console.log(res.data.data)
          this.goodLists = res.data.data.goods;
          this.total = res.data.data.total;
        });
      } else {
        getGoodlists({ params: params }).then((res) => {
          this.goodLists = res.data.data.goods;
          this.total = res.data.data.total;
          //console.log(this.goodLists)
        });
      }
    },
    // 排序
    priceSort(v) {
      this.sort = v;
      this.getGoods();
    },
    reset() {
      this.currentPage = 1;
      this.sort = "";
      this.getGoods();
    },
    handleSort(i) {
      this.isIndex = i;
      switch (i) {
        case 0:
          //   综合排序
          this.reset();
          break;
        case 1:
          this.priceSort(1);
          //   正序
          break;
        case 2:
          this.priceSort(-1);
          //   倒序
          break;

        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/mixin";
@import "../../assets/style/theme";
.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 30px 0 0;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  overflow: hidden;
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>