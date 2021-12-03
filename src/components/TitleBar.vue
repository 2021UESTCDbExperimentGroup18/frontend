<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#000000">
      <el-menu-item index="1">
        <el-row>
          <el-col :span="8">
            <el-avatar :size="medium" :src="circleUrl"/>
          </el-col>
          <el-col :span="16">
            <el-col align="center" style="text-align: center; font-size: 2em">
              {{user_id}}
            </el-col>
          </el-col>
        </el-row>
      </el-menu-item>
      <el-menu-item index="2">
        <div class="additional_info">
          phone: {{phone}}
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "TitleBar",
  props: {
    user_id: String,
    phone: String
  },
  data() {
    return {
      activeIndex: 1,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  }
}
</script>

<style scoped>

.additional_info {
  font-size: 2em
}

</style>