<template>
  <div class="caregoryGoodsCart">
    <router-link :to="{name: 'GoodsDetail',params:{id:goods.goodsId}}">
      <img :src="goods.src" alt="" class="goodsImg">
      <p>{{ goods.title }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "caregoryGoodsCart",
  props:["goods"]
};
</script>

<style scoped>
.caregoryGoodsCart {
  display: inline-block;
  width: 170px;
  height: 180px;
  box-sizing: border-box;
  background-color: #fcc;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 5px 0px 5px 10px;
}
.caregoryGoodsCart p {
  text-align: center;
}
.goodsImg {
  height: 100px;
  width: 100px;
  padding: 5px;
  border: 1px solid #de3030;
  display: block;
  margin: 10px auto;
}
</style>