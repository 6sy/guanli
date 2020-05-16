let mongoose = require('mongoose')
let Schema = mongoose.Schema
let powerSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  power: {
    type: Array
  },
  allPower: {
    type: Array,
    default: ['用户管理', '权限分配', '文章管理', '浏览管理', '日志管理', '写作']
  }
})

let powerModel = mongoose.model('powerItem', powerSchema)
module.exports = powerModel