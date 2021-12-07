<template>
  <div class="all_content">
    <title-bar
      :phone="user_info.phone"
      :user_id="user_info.user_id"
      :user_type="user_info.type"
      :user_name="user_info.user_name"
      :page_type="page_type"
    />
    <div class="content">
      <el-card class="card_content" shadow="never">
        <h2>订单列表</h2>
        <div class="table_detail">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="order_id" label="订单编号">
            </el-table-column>
            <el-table-column prop="order_status" label="订单状态">
            </el-table-column>
            <el-table-column prop="phone" label="骑手电话"> </el-table-column>
            <el-table-column prop="order_detail" label="订单详情">
            </el-table-column>
          </el-table>
        </div>
        <el-row>
          <el-col>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="total_orders"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TitleBar from "../components/TitleBar.vue";

export default {
  name: "personal",
  components: {
    TitleBar,
  },
  data() {
    return {
      user_info: {
        user_id: "None",
        phone: "None",
        type: "user",
        user_name: "None",
      },
      page_type: "details",
      total_orders: 0,
      tableData: [
        {
          order_id: "11111111",
          order_status: "未接单",
          phone: "无",
          order_detail: "xxxx",
        },
        {
          order_id: "22222222",
          order_status: "已接单",
          phone: "23781623786187",
          order_detail: "xxxx",
        },
        {
          order_id: "11111111",
          order_status: "未接单",
          phone: "无",
          order_detail: "xxxx",
        },
        {
          order_id: "22222222",
          order_status: "已接单",
          phone: "23781623786187",
          order_detail: "xxxx",
        },
        {
          order_id: "11111111",
          order_status: "未接单",
          phone: "无",
          order_detail: "xxxx",
        },
        {
          order_id: "22222222",
          order_status: "已接单",
          phone: "23781623786187",
          order_detail: "xxxx",
        },
        {
          order_id: "11111111",
          order_status: "未接单",
          phone: "无",
          order_detail: "xxxx",
        },
        {
          order_id: "22222222",
          order_status: "已接单",
          phone: "23781623786187",
          order_detail: "xxxx",
        },
        {
          order_id: "11111111",
          order_status: "未接单",
          phone: "无",
          order_detail: "xxxx",
        },
        {
          order_id: "22222222",
          order_status: "已接单",
          phone: "23781623786187",
          order_detail: "xxxx",
        },
        {
          order_id: "11111111",
          order_status: "未接单",
          phone: "无",
          order_detail: "xxxx",
        },
        {
          order_id: "22222222",
          order_status: "已接单",
          phone: "23781623786187",
          order_detail: "xxxx",
        },
      ],
    };
  },
  mounted() {
    this.get_user_name();
  },
  methods: {
    async get_user_name() {
      let res = await axios.get("/users/user_info", {
        params: {
          user_id: "test_user",
        },
      });

      console.log(res.data);
      this.user_info.user_name = res.data.user_name;
      this.user_info.user_id = res.data.user_id;
      this.user_info.phone = res.data.phone;
      this.user_info.type = res.data.type;
    },
  },
};
</script>

<style scoped>
.all_content {
  background: url("../assets/images/ocean_background.jpeg") no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}

.card_content {
  margin: 20px;
}

.table_detail {
  margin: 20px;
}
</style>
