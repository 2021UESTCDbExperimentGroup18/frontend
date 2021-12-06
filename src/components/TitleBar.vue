<template>
  <el-header class="title_bar">
    <el-row class="title_line">
      <el-col :offset="14" :span="2">
        <el-button type="primary" icon="el-icon-s-goods" size="large" v-if="this.page_type !== undefined">
          {{button_text}}
        </el-button>
      </el-col>
      <el-col :span="4">
        <div class="additional_info">phone: {{ phone }}</div>
      </el-col>
      <el-col :span="4">
        <el-row class="user_area" align="flex" onmouseover="this.style.cursor='hand'">
          <el-avatar :size="medium" :src="circleUrl" v-on:click="handleClick"/>
          <div align="center" class="user_id" v-on:click="handleClick">
            {{ user_id }}
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "TitleBar",
  props: {
    user_id: String,
    phone: String,
    page_type: String,
    user_type: String,
  },
  data() {
    return {
      button_text: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    if (this.page_type === "order") {
      this.button_text = "下单";
    } else if (this.page_type === "pickup") {
      this.button_text = "接单";
    } else {
      console.log("page_type is not defined", this.page_type);
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/personal",
      });
    },
  },
};
</script>

<style scoped>
.title_bar {
  position: sticky;
  top: 0;
  border-bottom: 1px solid #e8e8e8;
  height: 80px;
  background: url("../assets/images/ocean_background.jpeg") no-repeat;
  background-size: cover;
}

.title_line {
  height: 40px;
  line-height: 40px;
}

.additional_info {
  font-size: 2em;
  margin-left: 20px;
  padding: 20px;
}

.user_area {
  padding: 20px;
  cursor:pointer;
}

.user_id {
  text-align: center;
  font-size: 2em;
  margin-left: 1em;
}

.el-button {
  width: 80%;
  font-size: 1.5em;
  margin: 8% 0 0 20%;
}
</style>