<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TitleBar from "./components/TitleBar.vue";
// import Login from "@/components/Login.vue"
import axios from 'axios'

export default {
  name: 'App',
  components: {
    // Login
    // HelloWorld,
    // TitleBar
  },
  data() {
    return {
      user_info: {
        user_id: "",
        phone: ""
      }
    }
  },
  mounted() {
    this.get_user_name();
  },
  methods: {
    async get_user_name() {
      console.log("async test");
      let res = await axios.get("http://127.0.0.1:5000/api/users/user_info", {
        params: {
          user_id: "test_user"
        }
      })

      console.log(res.data);
      this.user_info.user_id = res.data.user_id;
      this.user_info.phone = res.data.phone;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
