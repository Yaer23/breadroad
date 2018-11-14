<template>
  <div class="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" width="100%" />
      </van-swipe-item>
    </van-swipe>
    <div class="navigation">
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <router-link class="grid" :to="{name: 'BrandStory'}">
            <van-icon name="brandStory" size="2.5rem" info=""/>
            <span>品牌故事</span>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link class="grid" :to="{name: 'NewsList'}">
            <van-icon name="news" size="2.5rem" info=""/>
            <span>最新资讯</span>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link class="grid" :to="{name: 'Classify'}">
              <van-icon name="classify" size="2.5rem" info=""/>
              <span>分类</span>
          </router-link>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <router-link class="grid" :to="{name: 'StoreAddress'}">
            <van-icon name="storeAddress" size="2.5rem" info=""/>
            <span>店面地址</span>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link class="grid" :to="{name: 'Home'}">
            <van-icon name="hotSale" size="2.4rem" info=""/>
            <span>敬请期待</span>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link class="grid" :to="{name: 'Home'}">
            <van-icon name="brandStory" size="2.5rem" info=""/>
            <span>敬请期待</span>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="hot">人气商品</div>
    <div class="hotGoods">
      <hotGoods v-for="(goods,index) in hotGoods" :key="index" :goods="goods"/>
    </div>
   
  </div>
</template>

<script>
import url from "@/urlConfig.js";
//  全局引入组件
import hotGoods from "./common/hotGoods";
export default {
  name: "Home",
  data() {
    return {
      images: [
        "http://pgy8w90g8.bkt.clouddn.com/swiper1.jpeg",
        "http://pgy8w90g8.bkt.clouddn.com/swiper2.png"
      ],
      hotGoods: null
    };
  },
  created() {
    this.$axios
      .get(url.getGoods)
      .then(res => {
        console.log(res);
        this.hotGoods = res.data.message.filter(item => {
          return item.hot === 1;
        });
        console.log(this.hotGoods);
      })
      .catch(err => {
        console.log("err");
      });
  },
  components: { hotGoods }
};
</script>

<style scoped>
.home {
  box-sizing: border-box;
}
.navigation {
  background-color: #fff;
}
.grid {
  display: inline-block;
  width: 5.8rem;
  height: 5.8rem;
  border: 0.25rem solid #de3030;
  color: #de3030;
  box-sizing: border-box;
  padding-top: 0.3rem;
  text-align: center;
}
.van-row {
  padding-top: 1rem;
  padding-bottom: 1rem;
  /* margin-top: 1rem; */
  /* margin: 1rem 0rem; */
}
.grid span {
  display: block;
  margin-top: 0.5rem;
}
/* hot */
.hot {
  height: 2.2rem;
  text-align: center;
  color: #fff;
  line-height: 2.2rem;
}
.hotGoods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
/* iconfont */

@font-face {
  font-family: "iconfont"; /* project id 882874 */
  src: url("//at.alicdn.com/t/font_882874_1j8gyzwk4h6.ttf") format("truetype");
}
.van-icon {
  font-family: "vant-icon", "iconfont" !important;
}

.van-icon-classify:before {
  content: "\e682";
}

.van-icon-hotSale:before {
  content: "\e663";
}

.van-icon-brandStory:before {
  content: "\e777";
}

.van-icon-storeAddress:before {
  content: "\e63c";
}

.van-icon-news:before {
  content: "\e6a7";
}

.van-icon-aa:before {
  content: "\e607";
}
</style>