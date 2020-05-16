let Router = require('koa-router')
const router = new Router()
let qs = require('qs')
let looksModel = require('../../model/looks')

// 创建每日浏览量
router.post('/createLook', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  ctx.request.body.id = Number(ctx.request.body.id) + 1
  const result = await looksModel.create(ctx.request.body)
  if (result) {
    ctx.body = { success: true }
  }
})

// 获取一周访问量
router.post('/getData', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  let id = ctx.request.body.id
  const result = await looksModel.find({ id: { '$gt': id - 7, '$lte': id } })
  if (result) {
    ctx.body = { success: true, data: result }
  }
})


router.get('/getToday', async ctx => {
  const result = await looksModel.find()
  if (result) {
    ctx.body = { success: true, data: result[result.length - 1] }
  }
})

router.post('/addLookV', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await looksModel.find(ctx.request.body)
  if (result) {
    let arr = result[0].looks + 1
    const result1 = await looksModel.update(ctx.request.body, { 'looks': arr })
    if (result1) {
      ctx.body = { success: true }
    }
  }
})









module.exports = router.routes()