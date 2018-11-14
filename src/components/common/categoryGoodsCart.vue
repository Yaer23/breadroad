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
  width: 10.625rem;
  height: 11.25rem;
  box-sizing: border-box;
  background-color: #fcc;
  border: 1px solid #eee;
  border-radius: .3125rem;
  margin: 5px 0px 5px 10px;
}
.caregoryGoodsCart p {
  text-align: center;
}
.goodsImg {
  height: 6.25rem;
  width: 6.25rem;
  padding: .3125rem;
  border: 1px solid #de3030;
  display: block;
  margin: .625rem auto;
}
</style>