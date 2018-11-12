const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/addNewsToDatabase', (ctx) => {
  fs.readFile('./json/news.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let count = 0
    const NewsModel = mongoose.model('News')
    data.news.map((value, index) => {
      let News = new NewsModel(value)
      News.save().then((res) => {
        count++
        console.log("成功插入第：", count, "条记录")
      }).catch(err => {
        console.log("失败：", err)
      })
    })
  })
  ctx.body = "正在导入数据"
})

router.get('/getNews', async (ctx) => {
  try {
    const NewsModel = mongoose.model("News")
    let result = await NewsModel.find().exec()
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
