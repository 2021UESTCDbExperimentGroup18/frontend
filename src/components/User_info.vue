<template>
  <div class="administer_info">
    <title-bar
        :phone="user_info.phone"
        :user_id="user_info.user_id"
        :user_type="user_info.type"
        :user_name="user_info.user_name"
        :page_type="page_type"
    />
    <div class="content">
      <el-card class="card_content" shadow="never">
        <el-form ref="form" :model="form" label-width="100px">

          <el-form-item label="电话">
            <el-row>
              <el-col :span="12"><el-input v-model="form.phone" placeholder="电话" style="width: 100%"></el-input></el-col>
              <el-col :span="12"></el-col>
            </el-row>

          </el-form-item>
          <el-form-item label="身份证号码">
            <el-row>
              <el-col :span="12"><el-input v-model="form.user_id" placeholder="身份证号码" style="width: 100%"></el-input></el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="地址和电话">
            <el-row :gutter="50">
              <el-col :span="8">
                <el-input v-model="form.address" placeholder="地址"></el-input>
              </el-col>
              <el-col :span="8">
                <el-input v-model="form.phone" placeholder="电话"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="add_address()">添加</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item >
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="address_id" label="编号">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
              <el-table-column prop="phone" label="电话">
              </el-table-column>
              <el-table-column label="Operations" width="120">
                <template #default="scope">
                  <el-button
                      type="text"
                      size="medium"
                      @click.prevent="remove_address(scope.$index, tableData, scope.row.address_id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="原密码">
            <el-row>
              <el-col :span="12"><el-input v-model="form.password1" placeholder="原密码" style="width: 100%"></el-input></el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="修改密码">
            <el-row>
              <el-col :span="12"><el-input v-model="form.password2" placeholder="新密码" style="width: 100%"></el-input></el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><el-input v-model="form.password3" placeholder="请再次输入" style="width: 100%"></el-input></el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="12"><el-button type="primary" @click="onSubmit">修改</el-button></el-col>
              <el-col :span="12"><el-button type="primary" @click="onSubmit">返回</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TitleBar from "../components/TitleBar.vue";

export default {
  name: "administer_info",
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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          address_id:12313,
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "1312312312312",

        },
        {
          address_id:213213,
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "6436436363",

        },
        {
          address_id:31321,
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "146346436346",

        },
        {
          address_id:13134,
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "343454352",

        },
        {
          address_id:132135,
          address: "上海市普陀区金沙江路 1518 弄",
          phone: "76756712312",

        }]

    };
  },
  mounted() {
    this.get_user_name();
    this.search();
  },
  methods: {
    async check_password(){
      axios
          .post("/users", {
            user_id: this.user_id,
            password: this.form.password1
          })
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data === 1) {//实际返回布尔类型，需要重新搞
              return true;
            }
            else if(res.data === 2)
            {
              alert("密码输入错误！");
            }
            else{
              alert("用户不存在！");
            }
          });
    },
    async add_address(){
      axios
          .post("/users", {
            user_id: this.user_id,
            phone: this.form.phone,
            address: this.form.address
          })
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data.status === "Ture") {//实际返回布尔类型，需要重新搞
              alert("地址和电话插入成功！");
              location.reload();//此处要重新考虑一下，重新加载要不要传入参数
            } else {
              alert("地址和电话插入失败！");
            }
          });
    },




    async change_password(){
      //调用check_password()函数，或者把函数写进来
      if(this.form.password2===this.form.password3){//此处password1与password2有问题，应该要修改
        axios
            .post("/users", {
              user_id: this.user_id,
              password: this.form.password2
            })
            .then(res => {
              // console.log("输出response.data.status", res.data.status);
              if (res.data.status === "Ture") {//实际返回布尔类型，需要重新搞
                alert("成功修改！");
                location.reload();//此处要重新考虑一下，重新加载要不要传入参数
              } else {
                alert("修改失败！");
              }
            });
      }
    },

    async remove_address(index,rows,address_id){
      console.log(address_id)
      rows.splice(index, 1)//此处只是简单删除，没有后端交互
      axios
          .post("/users", {
            address_id: address_id,
          })
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data.status === "Ture") {//实际返回布尔类型，需要重新搞
              alert("删除成功！");
              location.reload();//此处要重新考虑一下，重新加载要不要传入参数
            } else {
              alert("删除失败！");
            }
          });
    },

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
    async search() {
      let res = await axios.get("/users/search", {
        params: {
          user_id: "test_user",
        },
      });

      console.log(res.data);
      this.tableData.address = res.data(1).address;
      this.tableData.phone = res.data(1).phone;
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
