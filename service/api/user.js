const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "这是用户操作首页"
})

//  用户注册接口 （mongoose -- 查、增）
router.post('/register', async (ctx) => {
  //  取得Model --> 集合
  const User = mongoose.model('User')
  const {
    username
  } = ctx.request.body
  await User.findOne({
    username: username
  }).exec().then(async doc => {
    if (doc) {
      ctx.body = {
        code: 500,
        message: "用户已存在"
      }
    } else {
      //  把从前端接收的POST数据封装成一个新的user对象-->文档
      let newUser = new User(ctx.request.body)
      //  用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
      await newUser.save().then(() => {
        //  成功返回code=200，并返回成功信息
        ctx.body = {
          code: 200,
          message: '注册成功'
        }
      }).catch(error => {
        //  失败返回code=500，并返回错误信息
        ctx.body = {
          code: 500,
          message: error
        }
      })
    }
  })
})

//  用户登录接口 (mongoose -- 查)
router.post('/login', async (ctx) => {
  //  获取model
  let {
    username,
    password
  } = ctx.request.body
  //  创建user模型
  const user = mongoose.model("User")
  await user.findOne({
    username: username
  }).exec().then(async doc => {
    console.log(doc)
    //  doc为在数据库中查询的结果，如果doc存在说明该用户存在
    if (doc) {
      // 创建文档
      let newUser = new user()
      //  调用model自定义方法comparePassword比较提交的密码和数据库中的密码
      await newUser.comparePassword(password, doc.password)
        .then((res) => {
          // res是comparePassword中返回的比较结果true/false
          if (res) {
            ctx.body = {
              code: 200,
              message: "登陆成功"
            }
          } else {
            ctx.body = {
              code: 400,
              message: "密码错误"
            }
          }
        })
        .catch(err => {
          console.log(err)
          ctx.body = {
            code: 500,
            message: err
          }
        })
    } else {
      ctx.body = {
        code: 400,
        message: "用户不存在"
      }
    }
  })
})

//  用户添加商品进购物车 (mongoose -- 改)
router.post('/saveShopcart', async (ctx) => {
  let {
    username,
    shopcart
  } = ctx.request.body
  console.log(username, shopcart)
  //  创建user模型
  const user = mongoose.model("User")
  await user.update({
    username: username
  }, {
    shopcart: shopcart
  }, function (err, raw) {
    if (err) {
      ctx.body = {
        code: 500,
        msg: err
      }
    } else {
      if (raw.ok === 1) {
        ctx.body = {
          code: 200,
          msg: "保存成功"
        }
      }
    }
  })
})

//  登陆后获取用户shopcart信息 （mongoods -- 查）
router.get('/getShopcart', async (ctx) => {
  let username = ctx.url.split('=')[1]
  // console.log(username)
  const user = mongoose.model("User")
  await user.findOne({
    username: username
  }).exec().then(async doc => {
    console.log(doc)
    //  doc为在数据库中查询的结果，如果doc存在说明该用户存在
    if (doc) {
      ctx.body = {
        code: 200,
        message: doc.shopcart
      }
    } else {
      ctx.body = {
        code: 400,
        message: "用户不存在"
      }
    }
  })
})

module.exports = router;
