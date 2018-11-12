<template>
  <div class="newsDetail">
    <van-nav-bar
      title="新闻详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- loading -->
    <van-loading color="white" v-if="loading" size="30px"/>
    <div v-if="isShow">
      <div class="head">
        <h3 class="title">{{ newsInfo.title }}</h3>
        <p class="time">{{ newsInfo.time }}</p>
      </div>
      <div v-html="newsInfo.content" class="newsContent" ref="content"></div>    
    </div>
  </div>
</template>

<script>
import url from '@/urlConfig.js'
export default {
  name: "NewsDetail",
  data() {
    return {
      newsId: this.$route.params.id,
      newsInfo: null,
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
    getData(){
      this.loading = true;
      this.$axios.get(url.getNews)
      .then(res=>{
        this.loading = false;
        this.isShow = true;
        res.data.message.forEach(item=>{
          if(item.newsId == this.newsId){
            this.newsInfo = item
            console.log(this.newsInfo)
          }
        })
      })
      .catch(err=>{
        this.loading = false
        console.log(err)
      })
    },
    //  返回上一步
    onClickLeft() {
      this.$router.go(-1);
    },
  }
};
</script>

<style scoped>
.newsDetail{
  background-color: #fcc;
}
.newsContent {
  background-color: #fff;
  padding: 10px;
}
.newsContent img{
  width: 200px !important;
}
.title, .time {
  padding-left: 15px;
  color: #de3030;
}

</style>