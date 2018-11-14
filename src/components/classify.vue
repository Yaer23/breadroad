<template>
  <div class="classify">
    <van-tabs v-model="active" sticky>
      <van-tab title="面包">
        <van-swipe :autoplay="3000" :width="187.5">
          <van-swipe-item v-for="(item,index) in bread" :key="index" class="swipeItem">
            <img :src="item.src" alt="" :title="item.title" class="image" @click="imagePreview(index,bread)">
          </van-swipe-item>
        </van-swipe>
        <van-panel title="商品列表">
          <div>
              <category-goods-cart :goods="item"  v-for="(item,index) in bread" :key="index"/>
          </div>
        </van-panel>
      </van-tab>
      <van-tab title="蛋糕">
        <van-swipe :autoplay="3000" :width="375">
          <van-swipe-item v-for="(item,index) in cake" :key="index">
            <img v-lazy="item.src" alt="" :title="item.title" @click="imagePreview(item,cake)" class="cakeImg">
          </van-swipe-item>
        </van-swipe>
        <van-panel title="商品列表">
          <div>
            <category-goods-cart :goods="item"  v-for="(item,index) in cake" :key="index"/>
          </div>
        </van-panel>
      </van-tab>
      <van-tab title="甜点">
        <van-swipe :autoplay="3000" :width="300">
          <van-swipe-item v-for="(item,index) in dessert" :key="index">
            <img v-lazy="item.src" alt="" :title="item.title" @click="imagePreview(item,dessert)" class="cakeImg">
          </van-swipe-item>
        </van-swipe>
        <van-panel title="商品列表">
          <div>
            <category-goods-cart :goods="item"  v-for="(item,index) in dessert" :key="index"/>
          </div>
        </van-panel>
      </van-tab>
      <van-tab title="饮品">
        <van-swipe :autoplay="3000" :width="250">
          <van-swipe-item v-for="(item,index) in drink" :key="index">
            <img v-lazy="item.src" alt="" :title="item.title" @click="imagePreview(item,drink)" class="cakeImg">
          </van-swipe-item>
        </van-swipe>
        <van-panel title="商品列表">
          <div>
            <category-goods-cart :goods="item"  v-for="(item,index) in drink" :key="index"/>
          </div>
        </van-panel>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import url from '@/urlConfig.js'
import { ImagePreview } from "vant";
import categoryGoodsCart from "@/components/common/categoryGoodsCart";
export default {
  name: "Classify",
  data() {
    return {
      active: 0,
      bread: null,
      cake: null,
      drink: null,
      dessert: null
    };
  },
  methods: {
    imagePreview(index, data) {
      console.log(data);
      var url = data.map(item => item.src);
      console.log(url);
      ImagePreview({
        images: url,
        startPosition: index
        // showIndex: true
      });
    }
  },
  created() {
    this.$axios.get(url.getGoods).then(res => {
      console.log(res);
      this.bread = res.data.message.filter(item => {
        return item["category"] === "bread";
      });
      this.cake = res.data.message.filter(item => {
        return item["category"] === "cake";
      });
      this.drink = res.data.message.filter(item => {
        return item["category"] === "drink";
      });
      this.dessert = res.data.message.filter(item => {
        return item["category"] === "dessert";
      });
    });
  },
  components: { categoryGoodsCart }
};
</script>

<style scoped>
.classify {
  background-color: #fff;
}

.cakeImg {
  width: 14rem;
  margin-left: 4rem;
}
</style>