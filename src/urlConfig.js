const localURL = "http://localhost:3000/"
// const baseURL = "https://www.easy-mock.com/mock/5bd6772de6c8e77249e2fb73/breadRoad/"

const url = {
  register: localURL + 'user/register',
  login: localURL + 'user/login',
  getGoods: localURL+ 'goods/getGoods',
  getNews: localURL + 'news/getNews',
  saveShopcart: localURL + 'user/saveShopcart',
  getShopcart: localURL + 'user/getShopcart',
  getStore: localURL + 'store/getStore'
}

module.exports = url