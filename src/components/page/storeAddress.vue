<template>
  <div class="storeAddress">
    <van-nav-bar
      title="商店地址"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="title"><p>一个<span>面包</span>温暖一座城市</p></div>
    <div class="bottom">沿袭欧洲百年经典烘培工艺，融合口味创新</div>
    <div v-for="(item,index) in addressData" :key="index" class="address">
      <h3 class="city">【{{ item.city }}】</h3>
      <div v-for="(store,index) in item.store" :key="index">
        <p>{{store.name}}：{{store.address}}<br/>电话：{{ store.tel }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/urlConfig.js"
export default {
  name: "StoreAddress",
  data() {
    return {
      addressData: null
    };
  },
  created(){
      this.$axios.get(url.getStore)
      .then(res=>{
        console.log(res)
        this.addressData = res.data.message
      })
      .catch(err=>{
        console.log(err)
      })
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.storeAddress {
  background-color: #1c1f24;
  margin-bottom: 7.5rem;
  overflow: hidden;
  background-image: url("../../assets/images/bj.jpg");
  background-size: 23.75rem 20rem;
  /* background-position: center; */
  /* background-repeat: no-repeat; */
}
.storeAddress span {
  color: #de3030;
}
.title {
  color: #fff;
  font-size: 26px;
  text-align: center;
  line-height: 26px;
}
.bottom {
  width: 100%;
  height: 4.375rem;
  background-color: #de3030;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 4.375rem;
  position: fixed;
  bottom: 3.125rem;
}
.address {
  color: #fff;
  font-size: 15px;
  padding: .3125rem .9375rem;
}
.city {
  color: #de3030;
}
</style>