const mongoose = require('mongoose')
//  数据库的连接
const db = "mongodb://breadRoadUser:123456@127.0.0.1:27017/breadRoad"
const glob = require('glob')
const { resolve } = require('path')

//  connect 数据库连接功能export
exports.connect = () => {
  //  1、连接数据库
  mongoose.connect(db)

  let connectTimes = 0;

  //  Promise异步 必须确保先连接数据库后，再作其他事情  异步执行
  return new Promise((resolve, reject) => {
    //  数据库监听事件 disconnect 连接断开时
    mongoose.connection.on('disconnected', () => {
      console.log('-----------数据库断开-----------')
      //  最大连接3次 3次之后连接失败就拒绝连入
      if (connectTimes < 3) {
        connectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    //  数据库监听事件 error  连接出错时
    mongoose.connection.on('error', err => {
      console.log('----------数据库错误-----------')
      if (connectTimes < 3) {
        connectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    //  数据库监听事件 connected, 链接打开时
    mongoose.connection.once('connected', () => {
      console.log('MongoDB connected successfully')
      resolve()
    })
  })
}

//  schema 将所有schema同步export
exports.initSchemas = () =>{
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}