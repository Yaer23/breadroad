<template>
  <div class="shopcart">
    
    <!-- title bar -->
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />

    <!-- 判断是否为空 -->
    <div v-if="isEmpty" class="emptyShopcart">
      <img src="@/assets/images/shopcart.jpg" alt=""/>
      <p>购物车空空如也 </p>
    </div>

    <div v-if="isShow">
      <!-- shopcart item -->
      <shopcart-item :goods="item" v-for="(item,index) in goodsInShopcart" :key="index" @addGoodsNum="addGoodsNum(goodsId)" ></shopcart-item>

      <!-- bottom bar -->
      <van-submit-bar
        :price="currentPrice * 100"
        button-text="去结算"
        @submit="onSubmit"
      >
        <p class="totalNum">共：<span class="num">{{getNum}}</span>&nbsp;件</p>
      </van-submit-bar>
    </div>
   
  </div>
</template>

<script>
import url from "@/urlConfig.js";
import shopcartItem from "@/components/common/shopcartItem";
import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  data() {
    return {
      title: "购物车",
      shopcart: [],
      goodsInShopcart: [],
      isShow: false,
      isEmpty: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(mv => {
      mv.updateShopcart();
      if (mv.$store.getters.getShopcart.length !== 0) {
        mv.isEmpty = false;
        mv.isShow = true;
      }
    });
  },
  methods: {
    onSubmit() {},
    goBack() {
      this.$router.go(-1);
    },
    async updateShopcart() {
      var goodsId = [];
      this.goodsInShopcart = [];
      this.shopcart = this.$store.getters.getShopcart;
      //  获取购物车所有商品的goodsId
      this.shopcart.forEach(item => {
        goodsId.push(item.goodsId);
      });
      //  获取购物车中的商品信息并挂载到页面数据
      await this.$axios.get(url.getGoods).then(res => {
        res.data.message.forEach(item => {
          if (goodsId.indexOf(item.goodsId) !== -1) {
            this.goodsInShopcart.push(item);
          }
        });
      });
      //  初始化并添加num和isChecked字段
      this.goodsInShopcart.forEach(item => {
        this.shopcart.forEach(one => {
          if (item.goodsId === one.goodsId) {
            //  绑定数量num和isChecked属性
            this.$set(item, "num", one.num);
            this.$set(item, "isChecked", one.isChecked);
          }
        });
      });
    }
  },
  computed: {
    ...mapGetters(["getNum"]),
    currentPrice() {
      var currentPrice = 0;
      this.goodsInShopcart.forEach(item => {
        if (item.isChecked) {
          currentPrice += item.num * item.price;
        }
      });
      return currentPrice;
    }
  },
  beforeRouteLeave(to, from, next) {
    var username = this.$store.getters.getUsername;
    var shopcart = this.$store.getters.getShopcart;
    var query = { username: username, shopcart: shopcart };
    this.$axios
      .post(url.saveShopcart, query)
      .then(res => {
        if (res.data.code === 200) {
          next();
        }
      })
      .catch(err => {
        next(false);
      });
  },
  components: { shopcartItem }
};
</script>

<style scoped>
.shopcart {
  background-color: #F6F6F6;
}
.emptyShopcart {
  text-align: center;
  padding: 1rem;
}
.emptyShopcart img {
  margin-top: 1.25rem;
  width: 12.5rem;
}
.chooseAll {
  margin: 1.25rem;
}
.num {
  color: #de3030;
}
.totalNum {
  padding-left: .9375rem;
}
</style>