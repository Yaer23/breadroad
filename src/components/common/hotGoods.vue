<template>
  <div class="hotGoods">
    <router-link :to="{name: 'GoodsDetail',params:{id:goods.goodsId}}">
      <img :src="goods.src" alt="" class="goodsImg">
      <p class="title">{{goods.title}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "hotGoods",
  props:["goods"]
};
</script>

<style scoped>
.hotGoods {
  width: 10.5rem;
  height: 18rem;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #de3030;
  border-radius: .625rem;
  margin-bottom: .8rem;
  overflow: hidden;
}

.hotGoods .title {
  text-align: center;
  color: #999;
  margin-top: .3125rem;
}

.goodsImg {
  width: 10.5rem;
  height: 15.5rem;
}
</style>