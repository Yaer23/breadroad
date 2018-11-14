<template>
  <div class="shopcartItem">
    <van-swipe-cell :right-width="65" :left-width="65" :on-close="onClose">
      <van-cell-group>
        <van-icon name="close" class="close" click="delete"/>
        <van-switch v-model="goods.isChecked" class="switch" @input="onInput"/>
        <div class="goodsInfo">
          <div class="top">
            <router-link :to="{name: 'GoodsDetail',params:{id:goods.goodsId}}">
              <img :src="goods.src" class="img"/>
              <p class="title">{{goods.title}}</p>
            </router-link>
          </div>
          <div class="bottom">
            <span class="price">{{goods.price * goods.num | priceFilter}}</span>
            <van-stepper v-model="goods.num" class="stepper" @plus="addNum" @minus="reduceNum"/>
          </div>
        </div>
      </van-cell-group>
      <span slot="right" class="delete" >删除</span>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "shopcart-item",
  props: ["goods"],
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.delGoodsFromShopcart()
          break;
      }
    },
    //  添加
    addNum() {
      //  vuex中数据num进行加1
      if (this.goods.isChecked) {
        this.$store.commit("addGoodsNum", 1);
      }
      //  给vuex中的shopcart相应商品数量加一
      this.$store.commit("addGoodsById", { id: this.goods.goodsId, num: 1 });
    },
    //  减少
    reduceNum() {
      //  设置goodsNum-1
      if (this.goods.isChecked) {
        this.$store.commit("addGoodsNum", -1);
      }
      this.$store.commit("addGoodsById", { id: this.goods.goodsId, num: -1 });
    },
     //   从shopcart中删除该商品
     //   删除商品部分还没想好怎么体现到组件上，数据上完成了
    delGoodsFromShopcart(){
      this.$store.commit("delGoods",this.goods.goodsId)
      this.$store.commit("addGoodsNum",-this.goods.num)
    },
    //  点击switch开关
    onInput(checked) {
      if (checked) {
        this.$store.commit("addGoodsNum", this.goods.num);
      } else {
        this.$store.commit("addGoodsNum", -this.goods.num);
      }
      this.$store.commit("changeStatus", {
        isChecked: checked,
        id: this.goods.goodsId
      });
    },
  }
};
</script>

<style scoped>
.shopcartItem {
  position: relative;
  background-color: #fff;
  padding: .625rem;
  border: 1px solid #eee;
}
.close {
  position: absolute;
  top: .625rem;
  right: .625rem;
}
.close:hover {
  color: rgb(243, 26, 26);
  font-weight: bold;
}

.top {
  margin-left: 11.25rem;
}
.bottom {
  margin-left: 6.25rem;
}
.img {
  width: 7.5rem;
  height: 6.25rem;
}
.switch {
  margin-right: 3.125rem;
  position: absolute;
  top: 6.25rem;
}
.stepper {
  display: inline-block;
}

.price {
  color: #de3030;
  font-size: 18px;
  vertical-align: bottom;
  margin-right: .625rem;
}
.goodsInfo {
  display: inline-block;
}
.delete {
  background-color: #eee;
}
</style>