<template>
  <div class="cartbox">
    <el-table
      ref="multipleTable"
      :data="Ordergoods"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="goods_name" label="商品" width="120">
      </el-table-column>
      <el-table-column label="图片" width="150">
        <template slot-scope="data">
          <img :src="data.row.goods_show" alt="商品图片" class="cartimage" />
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="数量"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="goods_price"
        label="价格"
        width="80"
      ></el-table-column>
      <el-table-column label="分类" width="80">
        <template slot-scope="data">
          <el-tag>
            {{ data.row.goods_type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_address"
        label="收货地址"
        width="200"
      ></el-table-column>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="data">
          <span>{{
            data.row.goods_status === "untake" ? "未收货" : "已签收"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单操作" width="300">
        <template slot-scope="data">
          <div v-if="data.row.goods_status === 'untake'">
            <el-button size="mini" type="primary">查看物流状态</el-button>
            <el-button size="mini" type="success">确认收货</el-button>
          </div>
          <div v-else>
            <el-button size="mini" type="danger">申请售后服务</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrderlist } from "../../api/order";
import { getStore } from "@/utils/storage";
export default {
  data() {
    return {
      Ordergoods: [],
    };
  },
  methods: {
    getOrdergoods() {
      getOrderlist({ params: { userid: getStore("id") } }).then(
        (ordergoods) => {
          console.log(ordergoods);
          if (ordergoods.status === 200)
            this.Ordergoods = ordergoods.data.ordergoods;
        }
      );
    },
  },
  created() {
    this.getOrdergoods();
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
</style>