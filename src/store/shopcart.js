export default {
  state: {
    num: 0,
    username: "",
    shopcart: []
  },
  getters: {
    getNum(state) {
      return state.num
    },
    getUsername(state) {
      return state.username
    },
    getShopcart(state) {
      return state.shopcart
    }
  },
  mutations: {
    addGoodsNum(state, num) {
      state.num += num
    },
    setGoodsNum(state, num) {
      state.num = num
    },
    setUsername(state, name) {
      state.username = name
    },
    setShopcart(state, shopcart) {
      state.shopcart = shopcart
    },
    addGoodsById(state, payload) {
      state.shopcart.forEach(item => {
        if (item.goodsId === payload.id) {
          item.num += payload.num
        }
      })
    },
    changeStatus(state, payload) {
      state.shopcart.forEach(item => {
        if (item.goodsId === payload.id) {
          item.isChecked = payload.isChecked
        }
      })
    },
    addToShopcart(state, id) {
      var isInShopcart = false
      state.shopcart.forEach(item => {
        if (item.goodsId == id) {
          isInShopcart = true
          item.num++
          if (!item.isChecked) {
            item.isChecked = true;
            state.num += item.num
          } else {
            state.num++
          }
        }
      })
      if (!isInShopcart) {
        state.shopcart.push({
          goodsId: id,
          num: 1,
          isChecked: true
        })
        state.num++;
      }
    },
    delGoods(state,id){
      state.shopcart = state.shopcart.filter(item=>{
        return item.goodsId !== id
      })
      console.log(state.shopcart)
    }
  },
}