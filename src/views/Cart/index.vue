<template>
  <div>
    <div class="cartbox">
      <el-table
        ref="multipleTable"
        :data="Cartgoods"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="图片" width="150">
          <template slot-scope="data">
            <img :src="data.row.goods_show" alt="商品图片" class="cartimage" />
          </template>
        </el-table-column>
        <el-table-column prop="goods_name" label="商品" width="150">
        </el-table-column>
        <el-table-column
          prop="goods_number"
          label="数量"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="goods_price"
          label="价格"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="goods_type"
          label="分类"
          width="150"
        ></el-table-column>
        <el-table-column label="删除" width="150">
          <template>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cartfooter">
      <div class="footerspan">
        <span>
          总计：
        </span>
        122
      </div>
      <button class="footerbutton">
        立即购买
      </button>
    </div>
  </div>
</template>

<script>
import { getCartlist } from "../../api/cartList";
import { getStore } from "@/utils/storage";
export default {
  data() {
    return {
      Cartgoods: [],
    };
  },
  methods: {
    handleSelectionChange() {},
    getCartgoods() {
      getCartlist({ userId: getStore("id") }).then((cartgoods) => {
        //console.log(cartgoods)
        this.Cartgoods = cartgoods.data.cartgoods;
      });
    },
  },
  created() {
    this.getCartgoods();
  },
};
</script>

<style scoped>
.cartbox {
  overflow: hidden;
  width: 60vw;
  margin-left: 20vw;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.cartimage {
  width: 100px;
  height: 100px;
}
.cartfooter {
  width: 100vw;
  background-color: white;
  position: fixed;
  z-index: 200;
  bottom: 0;
  height: 40px;
}
.footerbutton{
  background-color: red;
  height: 100%;
  width:8%;
  font-size: 15px;
  color:white;
  position: absolute;
  right: 0;
}
.footerspan{
  float: left;
  height: 100%;
  line-height: 40px;
  vertical-align: middle;
}
.footerspan span{
  font-weight: bold;
  font-size: 20px;
}
</style>