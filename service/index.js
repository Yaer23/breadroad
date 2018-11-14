const Koa = require("koa")
const app = new Koa()
const path = require('path')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser());
// const mongoose = require('mongoose')
const {
  connect,
  initSchemas
} = require('./init.js')

let user = require('./api/user.js')
let goods = require('./api/goods.js')
let news = require('./api/news.js')
let store = require('./api/store.js')
//  解决跨域
const cors = require('koa2-cors')
app.use(cors())


//  装载子路由
let router = new Router();
router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/news', news.routes())
router.use('/store', store.routes())

//   托管静态文件
// app.use(require('koa-static')(path.join(__dirname, 'public')))

//  加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
app.use(require('koa-static')(path.join(__dirname, '/public')))
;
(async () => {
  await connect()
  initSchemas()
})()

app.listen(8081, () => {
  console.log('[Server] starting at port 3000')
})

module.exports = app