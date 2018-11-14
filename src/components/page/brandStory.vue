<template>
  <div class="brandStory">
    <van-nav-bar
      title="品牌故事"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="title">Brand<br/>&nbsp;&nbsp; Story</div>
    <div class="content">面包路起源在法国南部城市Cavaillon，这里有一个远近闻名的面包小镇，小镇古老的街道上有许多经营了几百年的家族式面包作坊，面包的烘焙与鉴赏在这里被奉为神圣，如同一门宗教。随着社会变迁，城市发展，人们已渐渐遗忘了那条街道的名字，而习惯称之为“面包路”。<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;携手欧洲顶级烘培大师开创，传承欧洲传统烘培工艺，甄选全球优质食材原料，打造健康，经典，唯美的天然无添加面包以及特色烘培产品。</div>
    <!-- <div class="bottom">沿袭欧洲百年经典烘培工艺，融合口味创新</div> -->
  </div>
</template>

<script>
export default {
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.brandStory {
  height: 40rem;
  width: 23.4375rem;
  background: #f4f4f4 url("../../assets/images/brandStory.png") no-repeat;
  background-size: 14.375rem 36rem;
  position: relative;
}
.brandStory .title {
  color: #AE0111;
  font-size: 1.875rem;
  position: absolute;
  right: 2.8125rem;
}
.brandStory .content {
  text-indent: 2rem;
  color: #AE0111;
  width: 10rem;
  height: 25rem;
  position: absolute;
  right: 0.3rem;
  top: 8rem;
}

.bottom {
  width: 100%;
  height: 3.8rem;
  background-color: #de3030;
  color: #fff;
  font-size: 1.125rem;
  text-align: center;
  line-height: 3.8rem;
  position: fixed;
  bottom: 3.125rem;
}
</style>