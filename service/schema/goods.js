const mongoose = require('mongoose') //  引入mongoose
const Schema = mongoose.Schema //  声明Schema
let ObjectId = Schema.Types.ObjectId //  声明Object类型

//  创建用户Schema  定义MongoDB中集合Collection里文档document的结构
const goodsSchema = new Schema({
  goodsId: {
    unique: true,
    type: Number
  },
  category: String,
  price: Number,
  originPrice: Number,
  hot: Number,
  title: String,
  src: String,
  detail: String
}, {
  timestamps: true, //  自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
  collection: 'goods'
})

//  发布模型
mongoose.model('Goods', goodsSchema)