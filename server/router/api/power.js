let Router = require('koa-router')
const router = new Router()
let qs = require('qs')
let powerModel = require('../../model/power')

router.post('/addRole', async ctx => {
  const result = await powerModel.create(ctx.request.body)
  if (result) {
    ctx.body = { success: true }
  }
})

router.get('/getRoles', async ctx => {
  const result = await powerModel.find()
  if (result) {
    ctx.body = { data: result, success: true }
  }
})

router.post('/deletePower', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await powerModel.find({ role: ctx.request.body.role })
  const newArray = result[0].power.filter((x) => {
    return x !== ctx.request.body.power
  })
  const result1 = await powerModel.update({ role: ctx.request.body.role }, { power: newArray })
  if (result1) {
    ctx.body = { success: true }
  }
})

router.post('/addPower', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await powerModel.find({ role: ctx.request.body.role })
  result[0].power.push(ctx.request.body.power)
  const result1 = await powerModel.update({ role: ctx.request.body.role }, { power: result[0].power })
  if (result1) {
    ctx.body = { success: true }
  }
})

router.post('/getPower', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await powerModel.find(ctx.request.body)
  if (result) {
    ctx.body = {
      success: true,
      data: result[0].power
    }
  }
})
module.exports = router.routes()