let mongoose = require('mongoose')
let Schema = mongoose.Schema
let looksSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  //日期
  date: {
    type: String,
    required: true
  },
  // 浏览量
  looks: {
    type: Number,
    required: true
  }
})

let looksModel = mongoose.model('looksItem', looksSchema)
module.exports = looksModel