const mongoose = require('mongoose') //  引入mongoose
const Schema = mongoose.Schema //  声明Schema
let ObjectId = Schema.Types.ObjectId //  声明Object类型

//  创建用户Schema  定义MongoDB中集合Collection里文档document的结构
const newsSchema = new Schema({
  newsId: {
    unique: true,
    type: Number
  },
  title: String,
  content: String,
  time: String,
  category: String,
  url: String,
  desc: String,
  comments: [Schema.Types.Mixed]
}, {
  timestamps: true, //  自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
  collection: 'news'
})

//  发布模型
mongoose.model('News', newsSchema)