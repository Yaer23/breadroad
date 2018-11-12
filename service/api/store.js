const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/addStoreToDatabase', (ctx) => {
  fs.readFile('./json/store.json', 'utf8', (err, data) => {
    data = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''))
    let count = 0
    const StoreModel = mongoose.model('Store')
    data.address.map((value, index) => {
      let Store = new StoreModel(value)
      Store.save().then((res) => {
        count++
        console.log("成功插入第：", count, "条记录")
      }).catch(err => {
        console.log("失败：", err)
      })
    })
  })
  ctx.body = "正在导入数据"
})

router.get('/getStore', async (ctx) => {
  try {
    const StoreModel = mongoose.model("Store")
    let result = await StoreModel.find().exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})

module.exports = router;
