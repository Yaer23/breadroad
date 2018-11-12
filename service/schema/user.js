const mongoose = require('mongoose') //  引入mongoose
const Schema = mongoose.Schema //  声明Schema
const bcrypt = require('bcrypt') //  bcrypt
const saltRounds = 10
let ObjectId = Schema.Types.ObjectId

//  创建用户Schema  定义MongoDB中集合Collection里文档document的结构
const userSchema = new Schema({
  userId: {
    type: ObjectId
  },
  username: {
    unique: true,
    type: String
  },
  password: String,
  shopcart:[Schema.Types.Mixed],
}, {
  timestamps: true, //  自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
  collection: 'user' //  设置{collection: user}集合确保了集合的名称user，否则默认会为复数users
})

//  在执行save()方法之前执行pre()方法进行加盐加密操作，save是mongoose的内置方法
userSchema.pre('save', function (next) {
  // 产生一个salt
  console.log("明文密码：", this.password)
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)
    console.log("salt: ", salt)
    //  结合salt产生新的hash
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      // 使用hash覆盖明文密码
      this.password = hash
      console.log("加盐加密后密码：", hash)
      next()
    })
  })
})

//  自定义方法compare() 进行密码的校验
userSchema.methods.comparePassword = function (postedPassword,dbPassword) {
  //  bcrypt.compare 检查数据库中的密码和用户输入的密码是否匹配
  return new Promise((resolve,reject)=>{
    bcrypt.compare(postedPassword,dbPassword,(err,res)=>{
      if(err){
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

//  发布模型
mongoose.model('User', userSchema)
