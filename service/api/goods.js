const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/addGoodsToDatabase', (ctx) => {
  fs.readFile('./json/goods.json', 'utf8', (err, data) => {
    //  得到的是UTF-8文件的字节顺序标记头（BOM）。当JSON.parse看到这个时，它会给出语法错误（读取：“意外字符”错误）。
    //  您必须先从文件中删除字节顺序标记，然后再将其传递给JSON.parse
    data = JSON.parse(data.toString('utf8').replace(/^\uFEFF/, ''))
    let count = 0
    const GoodsModel = mongoose.model('Goods')
    data.goods.map((value, index) => {
      let Goods = new GoodsModel(value)
      Goods.save().then((res) => {
        count++
        console.log("成功插入第：", count, "条记录")
      }).catch(err => {
        console.log("失败：", err)
      })
    })
  })
  ctx.body = "正在导入数据"
})

router.get('/getGoods', async (ctx) => {
  try {
    const GoodsModel = mongoose.model("Goods")
    let result = await GoodsModel.find().exec()
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
