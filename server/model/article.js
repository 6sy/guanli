let mongoose = require('mongoose')
let Schema = mongoose.Schema
let articleSchema = new Schema({
  // 文章唯一标识
  id: {
    type: Number,
    required: true
  },
  // 文章作者
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  describle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  textMd: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: 'http://127.0.0.1:4000/vue.jpg'
  },
  type: {
    type: String,
    required: true
  },
  looks: {
    type: Number,
    default: 0
  },
  //Y 标识发布，N标识删除，YN编辑中
  state: {
    type: String,
    default: 'YN'
  },
  time: {
    type: String,
    default: ''
  }
})

let articleModel = mongoose.model('articleItem', articleSchema)
module.exports = articleModel