let Router = require('koa-router')
const router = new Router()
let qs = require('qs')
let commentModel = require('../../model/conments')
// 上传评论
router.post('/upload', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await commentModel.create(ctx.request.body)
  if (result) {
    ctx.body = { success: true }
  }
})
router.get('/getComments', async ctx => {
  const result = await commentModel.find()
  ctx.body = {
    success: true,
    data: result
  }
})
// 发布评论
router.post('/publishComment', async ctx => {
  const result = await commentModel.updateOne(ctx.request.body, { isOk: 'yes' })
  if (result) {
    ctx.body = {
      success: true
    }
  }
})

// 删除评论
router.post('/deleteComment', async ctx => {
  const result = await commentModel.updateOne(ctx.request.body, { isOk: 'no' })
  if (result) {
    ctx.body = {
      success: true
    }
  }
})

// 获取评论
router.get('/getCommentsV', async ctx => {
  const result = await commentModel.find({ isOk: 'yes' })
  ctx.body = {
    success: true,
    data: result
  }
})



module.exports = router.routes()