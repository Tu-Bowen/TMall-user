<template>
  <el-row class="good-item">
    <el-col>
      <el-card :body-style="{ padding: 0 }">
        <div class="good-img">
          <a> <img v-lazy="goods.goods_show" alt="" /><!--v-lazy--> </a>
        </div>
        <h6 class="good-title">{{ goods.goods_name }}</h6>
        <h3 class="sub-title ellipsis">{{ goods.goods_introduce }}</h3>
        <div class="good-price pr">
          <div class="ds pa">
            <a href="javascript:;">
              <el-button
                type="default"
                size="medium"
                @click="productDetail(goods.goods_id)"
                >查看详情</el-button
              >
            </a>
            <a href="javascript:;">
              <el-button
                type="primary"
                size="medium"
                @click="
                  addCart(
                    goods.goods_id,
                    goods.goods_price,
                    goods.goods_name,
                    goods.goods_introduce,
                    goods.goods_show,
                    goods.goods_type
                  )
                "
                >加入购物车</el-button
              >
            </a>
          </div>
          <p>
            <span style="font-size: 14px">¥</span>
            {{ Number(goods.goods_price).toFixed(2) }}
          </p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { getStore } from "@/utils/storage";
import { addCartlist } from "@/api/cartList.js";
export default {
  props: ["goods"],
  computed: {
    ...mapState(["login"]),
  },
  methods: {
    ...mapMutations(["ADDCART"]),
    productDetail(id) {
      // 编程式导航
      this.$router.push({
        name: "goodsDetail",
        query: {
          productId: id,
        },
      });
    },
    addCart(goods_id, goods_price, goods_name, goods_introduce, goods_show,goods_type) {
      if (this.login) {
        // 用户已登录
        addCartlist({
          userId: getStore("id"),
          goods_id,
          goods_price,
          goods_name,
          goods_show,
          goods_introduce,
          goods_type,
        })
          .then((res) => {
            console.log(`添加购物车成功响应数据`);
            console.log(res);
            // 已经存储到后端中， 将当前的商品存储到store的cartList
            this.ADDCART({
              goods_id,
              goods_price,
              goods_name,
              goods_show,
              goods_introduce,
              goods_type,
            });
          })
          .catch((err) => {
            console.log(`添加购物车失败`);
            console.log(err);
          });
      } else {
        // 如果用户未登录 也要将商品存储到store的cartList
        this.ADDCART({
          goods_id,
          goods_price,
          goods_name,
          goods_show,
          goods_introduce,
          goods_type,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.good-img {
  display: flex;
  justify-content: center;
  a {
    display: block;
    img {
      margin: 50px auto 10px;
      width: 206px;
      height: 206px;
      display: block;
    }
  }
}
.good-price {
  margin: 15px 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #d44d44;
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-around;
  padding-bottom: 60px;
  a {
    margin-right: 5px;
  }
  .ds {
    display: none;
  }
}
.good-price:hover .ds {
  display: block;
}
.good-title {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
  text-align: center;
  overflow: hidden;
}
h3 {
  text-align: center;
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  padding: 10px;
}
.good-item {
  background: #fff;
  width: 25%;
  transition: all 0.5s;
  height: 410px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
    .good-price p {
      display: none;
    }
    .ds {
      display: flex;
    }
  }
}
.el-card {
  border: none;
}
</style>