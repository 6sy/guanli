let mongoose = require('mongoose')
let Schema = mongoose.Schema
let commentsSchema = new Schema({
  //留言姓名
  name: {
    type: String,
    required: true,
  },
  //留言时间
  time: {
    type: Date,
    default: Date.now()
  },
  //留言内容
  text: {
    type: String,
    required: true
  },
  //留言认证 N 未审核  yes已通过 no未通过  
  isOk: {
    type: String,
    default: 'N'
  },
  img: {
    type: String,
    default: 'http://127.0.0.1:4000/users.jpg'
  }
})

let commentsModel = mongoose.model('commentItem', commentsSchema)
module.exports = commentsModel