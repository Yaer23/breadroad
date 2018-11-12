<template>
  <div>
    <div class="head">
      <h1>你好！ {{ username }}</h1>
    </div>
    <van-cell-group>
      <van-cell title="待开发" is-link />
      <van-cell title="待开发" is-link value="" />
      <van-cell title="待开发" is-link value="" />
    </van-cell-group>
    <van-button size="large" class="bigBtn" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
export default {
  name: "Member",
  data() {
    return {
      username: this.$store.getters.getUsername
    };
  },
  methods: {
    logout() {
      console.log("logout");
      //  清除shopcart
      this.$store.commit("setShopcart", "");
      //  清除token记录
      sessionStorage.removeItem("access_token");
      //  导航到主页
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.head h1 {
  padding-left: 15px;
}
.bigBtn {
  position: absolute;
  bottom: 50px;
  background-color: rgb(250, 84, 84);
}
</style>