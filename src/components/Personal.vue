<template>
  <div>
    <title-bar :phone="user_info.phone" :user_id="user_info.user_id" :user_type="user_info.type" :user_name="user_info.user_name" :page_type='page_type'/>
  </div>
</template>
<script>
import axios from 'axios';
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
    };
  },
  mounted() {
    this.get_user_name();
  },
  methods: {
    async get_user_name() {
      let res = await axios.get("/users/user_info", {
        params: {
          user_id: "test_user"
        }
      })

      console.log(res.data);
      this.user_info.user_name = res.data.user_name;
      this.user_info.user_id = res.data.user_id;
      this.user_info.phone = res.data.phone;
      this.user_info.type = res.data.type;
    }
  }
};
</script>

<style scoped>
.additional_info {
  font-size: 2em;
}
</style>