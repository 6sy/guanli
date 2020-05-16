let Router = require('koa-router')
const router = new Router()
let userModel = require('../../model/users')
let tools = require('../../util/tools')
let bcrypt = require('bcryptjs')
const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
let qs = require('qs')
const multer = require('@koa/multer');
const upload = multer()
const fs = require('fs')
const path = require('path')
// login
router.post('/login', async ctx => {
  console.log(ctx.request.body)
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await userModel.find({ account: ctx.request.body.account })
  if (result.length == 0) {
    ctx.body = {
      success: false
    }
  } else {
    let www = await bcrypt.compareSync(ctx.request.body.password, result[0].password)
    // 验证通过
    if (www) {
      // 生成token
      let token = jsonwebtoken.sign({ user: ctx.request.body.account }, 'shhhh')
      ctx.response.set('my-token', token)
      ctx.body = { success: true, data: result[0] }
      ctx.res.setHeader('Access-Control-Expose-Headers', 'my-token')
    }
    // 密码错误
    else {
      ctx.body = {
        msg: '账号密码错误',
        success: false
      }
    }
  }
})
// register
router.post('/register', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  ctx.request.body.password = tools.enbcrypt(ctx.request.body.password)
  const result = await userModel.create(ctx.request.body)
  if (result) {
    ctx.body = { success: true }
  } else {
    ctx.body = { success: false }
  }
})

// get user
router.get('/getUsers', async ctx => {
  const result = await userModel.find()
  if (result) {
    ctx.body = { success: true, data: result }
  }
})

// delete user
router.post('/deleteUser', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await userModel.deleteOne(ctx.request.body)
  if (result) {
    ctx.body = { success: true }
  }
})
module.exports = router.routes()