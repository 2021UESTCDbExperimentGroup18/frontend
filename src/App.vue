<template>
<!--  <router-view />-->
<!--  <Personal/>-->
<!--  <Administer_info/>-->
  <User_info/>
</template>

<script>
// import Personal from "@/components/Personal";
// import Administer_info from "@/components/Administer_info";
import User_info from "@/components/User_info";
export default {
  name: "App",
  components: {User_info},
};
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
  margin: 0;
  padding: 0;
}
</style>
