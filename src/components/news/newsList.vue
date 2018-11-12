<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <ul>
          <li v-for="item in newsData" :key="item.newsId">
            <router-link :to="{name: 'NewsDetail',params: {id:item.newsId}}"> 
              <van-card
                :desc="item.desc"  
                :title="item.title"
                :thumb="item.url"
              />
            </router-link>
          </li>
        </ul>
      </van-tab>
      <van-tab title="面包说">
        <ul>
          <li v-for="item in breadTalk" :key="item.newsId">
            <router-link :to="{name: 'NewsDetail',params: {id:item.newsId}}"> 
              <van-card
                :desc="item.desc"  
                :title="item.title"
                :thumb="item.url"
              />
            </router-link>
          </li>
        </ul>
      </van-tab>
      <van-tab title="最新动态">
        <ul>
          <li v-for="item in recentNews" :key="item.newsId">
            <router-link :to="{name: 'NewsDetail',params: {id:item.newsId}}"> 
              <van-card
                :desc="item.desc"  
                :title="item.title"
                :thumb="item.url"
              />
            </router-link>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import url from "@/urlConfig.js";
export default {
  name: "NewsList",
  data() {
    return {
      active: 0,
      newsData: [],
      breadTalk: [],
      recentNews: []
    };
  },
  created() {
    this.$axios
      .get(url.getNews)
      .then(res => {
        this.newsData = res.data.message;
        this.breadTalk = res.data.message.filter(item => {
          return item.category === "breadTalk";
        });
        this.recentNews = res.data.message.filter(item => {
          return item.category === "recentNews";
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>