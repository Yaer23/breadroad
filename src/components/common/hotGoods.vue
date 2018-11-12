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
  display: inline-block;
  width: 11.25rem;
  height: 20rem;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #de3030;
  border-radius: .625rem;
  margin: .3125rem 0rem .3125rem .625rem;
  overflow: hidden;
}

.hotGoods .title {
  text-align: center;
  color: #999;
  margin-top: .3125rem;
}

.goodsImg {
  height: .3125rem;
}
</style>