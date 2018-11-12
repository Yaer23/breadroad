const mongoose = require('mongoose') //  引入mongoose
const Schema = mongoose.Schema //  声明Schema

//  创建用户Schema  定义MongoDB中集合Collection里文档document的结构
const storeSchema = new Schema({
  city: {
    unique: true,
    type: String
  },
  store: [Schema.Types.Mixed]
}, {
  timestamps: true, //  自动添加createdAt和updatedAt这两个字段，代表创建时间和更新时间
  collection: 'store'
})

//  发布模型
mongoose.model('Store', storeSchema)