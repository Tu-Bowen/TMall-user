<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li
                v-for="(item, i) in small"
                :key="i+item"
                :class="{ on: item === big }"
                @click="handleClick(i)"
              >
                <img :src="item" />
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="bigimg" />
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{ goods_name }}</h4>
          <h6>
            <span>{{ goods_introduce }}</span>
            <span class="price">
              <em>¥</em>
              <i>{{ Number(goods_price).toFixed(2) }}</i>
            </span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @handleValue="handleVal"></buy-num>
        </div>
        <div class="buy">
          <el-button type="primary" @click="addCart(goods_id)"
            >加入购物车</el-button
          >
          <el-button type="danger">现在购买</el-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <m-shelf title="产品信息">
        <div slot="content">
          <div v-if="detail_images.length!==0" :style="{'font-size':'0'}">
            <img
              v-for="(detailimg, idx) in detail_images"
              :key="detailimg + idx"
              :src="detailimg"
              alt="详情图"
              :style="{'width':'100%'}"
            />
          </div>
          <div class="no-info" v-else>
            <img src="/static/images/no-data.png" alt="" />
            <br />该商品暂无内容数据
          </div>
        </div>
      </m-shelf>
    </div>
  </div>
</template>

<script>
import BuyNum from "@/components/BuyNum";
import MShelf from "@/components/Shelf";
import { getGoodsdetail } from "../../api/goods";
export default {
  data() {
    return {
      goods_id: 0,
      goods_name: "",
      goods_price: "",
      goods_introduce: "",
      detail_images: "",
      small: [],
      big: [],
      bigimg:''
    };
  },
  components: {
    BuyNum,
    MShelf,
  },
  methods: {
    addCart(e) {
      console.log(e);
    },
    handleVal(num) {
      console.log(num);
    },
    handleClick(index) {
      this.bigimg = this.big[index];
    },
    async getGoodsDetail(productId) {
      try {
        const res = await getGoodsdetail({ params: { id: productId } });
        const {
          goods_id,
          goods_name,
          goods_price,
          goods_introduce,
          goods_images,
        } = res.data;
        this.goods_id = goods_id;
        this.goods_name = goods_name;
        this.goods_price = goods_price;
        this.goods_introduce = goods_introduce;
        this.small = [];
        this.detail_images = [];
        for (let i = 0; goods_images && i < goods_images.length; i++) {
          if (goods_images[i].type === "onimg") {
            this.small.push(goods_images[i].url);
            this.big.push(goods_images[i].big||goods_images[i].url)
          }
          if (goods_images[i].type === "detail") {
            this.detail_images.push(goods_images[i].url);
          }
          if(goods_images[i].type === "onbig"){
            this.bigimg=goods_images[i].url
          }
        }
        if(this.big.length!==0)
        this.bigimg=this.big[0]
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    const { productId } = this.$route.query;
    this.getGoodsDetail(productId);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}

.gray-box {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  .gallery-wrapper {
    .gallery {
      display: flex;
      width: 540px;
      .thumbnail {
        li:first-child {
          margin-top: 0px;
        }
        li {
          @include wh(80px);
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          cursor: pointer;
          &.on {
            padding: 10px;
            border: 3px solid #ccc;
            border: 3px solid rgba(0, 0, 0, 0.2);
          }
          img {
            display: block;
            @include wh(100%);
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
        }
        img {
          display: block;
          @include wh(440px);
        }
      }
    }
  }
  // 右边
  .banner {
    width: 450px;
    margin-left: 10px;
    h4 {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
    }
    h6 {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sku-custom-title {
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
    }
    .params-name {
      padding-right: 20px;
      font-size: 14px;
      color: #8d8d8d;
      line-height: 36px;
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
    }
    .buy {
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
    }
  }
}

.item-info {
  .gray-box {
    padding: 0;
    display: block;
  }
  .img-item {
    width: 1220px;
    // padding: 1vw;
    text-align: center;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.no-info {
  padding: 200px 0;
  text-align: center;
  font-size: 30px;
}

.price {
  display: block;
  color: #d44d44;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  i {
    padding-left: 2px;
    font-size: 24px;
  }
}
</style>