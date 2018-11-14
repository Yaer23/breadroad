<template>
  <div class="goodsDetail">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- loading -->
    <van-loading color="white" v-if="loading" size="30px"/>
    
    <div v-if="isShow">
      <!-- goodsInfo -->
      <img :src="goodsInfo.src" alt="" @click="showPic" class="goodsImg">
      <div class="goodsInfo">
        <p class="title">{{ goodsInfo.title }}</p>
        <p class="price">{{ goodsInfo.price | priceFilter }}</p>
      </div>

      <!-- Tab -->
      <van-tabs v-model="active">
        <van-tab title="商品详情">
          <div v-html="goodsInfo.detail" class="goodsInfo"></div>
        </van-tab>
        <van-tab title="商品评论">内容 2</van-tab>
      </van-tabs>
    </div>

    <!-- 底部navbar -->
     <van-goods-action class="goodsAction">
      <van-goods-action-mini-btn icon="chat" text="客服" @click="service" />
      <van-goods-action-mini-btn icon="cart" text="购物车" @click="goToShopcart" />
      <van-goods-action-big-btn text="加入购物车" @click="addToShopcart" />
      <van-goods-action-big-btn text="立即购买" @click="goToBuy" primary />
    </van-goods-action>
  </div>
</template>

<script>
import url from "@/urlConfig.js";
import { ImagePreview, Toast, Loading } from "vant";

export default {
  name: "GoodsDetail",
  data() {
    return {
      goodsId: this.$route.params.id,
      goodsInfo: null,
      active: 0,
      isInShopcart: false,
      loading: false,
      isShow: false
    };
  },
  created() {
    this.getData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getData"
  },
  methods: {
    //  获取数据
    getData() {
      this.loading = true;
      this.$axios
        .get(url.getGoods)
        .then(res => {
          this.loading = false;
          this.isShow = true;
          res.data.message.forEach(item => {
            if (item.goodsId == this.goodsId) {
              this.goodsInfo = item;
            }
          });
        })
        .catch(err => {
          this.loading = false
        });
    },
    //  点击购物车
    goToShopcart() {
      this.rightControl();
    },
    //  加入购物车
    addToShopcart() {
      this.$store.commit("addToShopcart",this.goodsId)
      this.rightControl();
    },
    //  权限控制
    rightControl() {
      if (sessionStorage.getItem("access_token")) {
        this.$router.push("/shopcart");
      } else {
        Toast.fail("您还未登陆");
        this.$router.push("/login");
      }
    },
    //  立即购买
    goToBuy() {},
    //  返回上一步
    onClickLeft() {
      this.$router.go(-1);
    },
    //  点击客服
    service() {},
    //  点击图片预览
    showPic() {
      ImagePreview({
        images: [this.goodsInfo.src]
      });
    }
  }
};
</script>

<style scoped>
.goodsDetail {
  background-color: #fff;
}
.goodsInfo {
  padding: .625rem;
}
.goodsAction {
  z-index: 100;
}
.goodsImg {
  width: 15.625rem;
  margin-left: 4.0625rem;
}

.price {
  color: #de3030;
  font-size: 22px;
  font-weight: 500;
}
</style>