<template>
  <div id="app">
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      background="#AE0111"
    >
      <div slot="action" @click="onSearch" style="color: #fff">搜索</div>
    </van-search>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <van-tabbar v-model="active" @change="changeTabbar" v-show="isShow">
      <van-tabbar-item icon="home">首页</van-tabbar-item>
      <van-tabbar-item icon="records" dot>商品</van-tabbar-item>
      <van-tabbar-item icon="cart" :info="getNum">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      searchValue: "",
      active: 0,
      isShow: true
    };
  },
  methods: {
    onSearch() {},
    changeTabbar() {
      console.log(this.active);
      switch (this.active) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/classify");
          break;
        case 2:
          this.$router.push("/shopcart");
          break;
        case 3:
          this.$router.push("/member");
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["getNum"])
  }
};
</script>

<style>
#app {
  margin-bottom: 3.2rem;
  background-color: #de3030;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
