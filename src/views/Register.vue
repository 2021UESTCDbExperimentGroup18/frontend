<template>
  <div class="login clearfix">
    <div style="margin-top: 50px">
      <h1>校园智慧送餐系统</h1>
    </div>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" status-icon label-width="80px">
          <el-col align="middle" justify="center">
            <h3>注册</h3>
          </el-col>
          <div style="padding: 0 0 10px 50px">
            <el-radio-group v-model="user_type_selected" size="medium">
              <el-radio label="1" border>用户</el-radio>
              <el-radio label="2" border>骑手</el-radio>
            </el-radio-group>
          </div>
          <el-form-item prop="username" label="用户名">
            <el-input
              v-model="user.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input
              v-model="user.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input
              v-model="user.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="nid"
            label="身份证号"
            v-if="user_type_selected === '2'"
          >
            <el-input
              v-model="user.nid"
              show-password
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
          <el-col :offset="8">
            <router-link to="/login">返回登录</router-link>
          </el-col>
          <el-col :offset="2">
            <el-form-item>
              <el-button type="primary" icon @click="doRegister()"
                >注册账号</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      user: {
        username: "",
        phone: "",
        password: "",
        nid: "",
      },
      user_type_selected: "1",
    };
  },
  methods: {
    async doRegister() {
      let user_type = "user";
      if (this.user_type_selected === "2") {
        user_type = "rider";
      }

      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      }
      if (!this.user.phone) {
        this.$message.error("请输入手机号！");
        return;
      }
      if (!this.user.nid && this.user_type_selected === "2") {
        this.$message.error("请输入身份证号！");
        return;
      }
      if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      }
      const response = await axios.post("/api/signup/signup_info", {
        user_type: user_type,
        user_name: this.user.username,
        password: this.user.password,
        nid: this.user.nid,
        phone: this.user.phone,
      });

      if (response.data.code === 1) {
        this.$message.success(response.data.message);
        this.$router.push({ path: "/goods" });
      } else {
        this.$message.error(response.data.message);
        this.user.username = "";
        this.user.password = "";
        this.user.nid = "";
        this.user.phone = "";
      }
    },
  },
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/imgs/ocean_background.jpeg") no-repeat;
  background-size: cover;
  position: absolute;
}
.login-wrap {
  background-color: rgba(255, 255, 255, 0.5);
  background-size: cover;
  width: 500px;
  height: 550px;
  margin: 55px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}

h1 {
  text-align: center;
  font-size: 40px;
  color: #000;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}

a {
  text-decoration: none;
  color: rgb(92, 92, 92);
  font-size: 15px;
}
a:hover {
  color: coral;
}

.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>
