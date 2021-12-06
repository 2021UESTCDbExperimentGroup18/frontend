<template>
  <div class="login" clearfix>
    <div style="margin-top:50px;">
      <h1>校园智慧送餐系统</h1>
    </div>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
          <el-form-item prop="phone" label="用户名">
            <el-input v-model="user.phone" placeholder="请输入用户名" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <router-link to="/register">注册账号</router-link>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "login",
  data() {
    return {
      user: {
        phone: "",
        password: ""
      }
    };
  },
  created() {},
  methods: {
    doLogin() {
      if (!this.user.phone) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        // this.$router.push({ path: "/personal" });
        axios
          .post("/login", {
            phone: this.user.phone,
            password: this.user.password
          })
          .then(res => {
            // console.log("输出response.data.status", res.data.status);
            if (res.data.status === 200) {
              this.$router.push({ path: "/personal" });
            } else {
              alert("您输入的用户名或密码错误！");
            }
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/images/ocean_background.jpeg") no-repeat;
  background-size: cover;
  position: absolute;
}
.login-wrap {
  background-color: rgba(255,255,255,0.5);
  background-size: cover;
  width: 500px;
  height: 350px;
  margin: 115px auto;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
#password {
  margin-bottom: 5px;
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
  color: #aaa;
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