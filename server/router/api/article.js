let Router = require('koa-router')
const router = new Router()
let article = require('../../model/article')
let qs = require('qs')
const multer = require('@koa/multer');
const upload = multer()
const fs = require('fs')
const path = require('path')

// 上传照片
router.post('/uploadImg', upload.single('file'), ctx => {
  console.log(ctx.request.file)
  let imgPath = 'C:\\Users\\Administrator\\Desktop\\boke\\backstage\\server\\public\\'
  fs.writeFile(imgPath + ctx.request.file.originalname, ctx.request.file.buffer, function (err) {
    console.log(err)
  })
  ctx.body = { url: ctx.request.file.originalname }
})

// 添加文章
router.post('/addArticle', async ctx => {

  let result1 = await article.find()
  if (result1.length === 0) {
    let id = 1
    ctx.request.body.id = id
  } else {
    let id = Number(result1.length) + 1
    ctx.request.body.id = id
  }
  let result = await article.create(ctx.request.body)

  if (result) {
    ctx.body = { success: true, data: { 'id': result['id'] } }
  }
})

// 获取编写文章列表
router.get('/getArticleList', async ctx => {
  let account = ctx.state.user.user
  const result = await article.find({ author: account, state: 'YN' })
  if (result) {
    ctx.body = { success: true, data: result }
  }
})

// 获取发布文章列表
router.get('/publishArticle', async ctx => {
  let account = ctx.state.user.user
  const result = await article.find({ state: 'Y' })
  if (result) {
    ctx.body = { success: true, data: result }
  }
})
// 获取单篇文章
router.post('/getOneArticle', async ctx => {
  const result = await article.find(ctx.request.body)
  if (result) {
    ctx.body = { success: true, data: { text: result[0].text, textMd: result[0].textMd, title: result[0].title } }
  }
})

// 保存更新文章
router.post('/updateArticle', async ctx => {
  const result = await article.update({ id: ctx.request.body.id }, ctx.request.body.data)
  if (result) {
    ctx.body = { success: true }
  }
})

// 删除编辑文章
router.post('/deleteArticle', async ctx => {
  const result = await article.updateOne(ctx.request.body, { state: 'N' })
  if (result) {
    ctx.body = { success: true }
  }
})

// 发布文章
router.post('/publishArticle', async ctx => {
  const result = await article.updateOne(ctx.request.body, { state: 'Y', time: new Date() })
  if (result) {
    ctx.body = { success: true }
  }
})

//添加文章到草稿箱
router.post('/editArticle', async ctx => {
  const result = await article.updateOne(ctx.request.body, { state: 'YN' })
  if (result) {
    ctx.body = { success: true }
  }
})



// 前端api  前端页面暂无
// 首页文章
router.post('/getArticleV', async ctx => {
  let num = ctx.request.body.num
  let size = ctx.request.body.size

  let result = await article.find({ state: 'Y' })
  if (result) {
    let resArray = result.slice(num * size - 5, size + num * size - 5)
    console.log(num, size)
    ctx.body = { success: true, data: resArray }
  }
})


router.get('/getAllNumV', async ctx => {
  console.log('1111')
  const result = await article.find({ state: 'Y' })
  if (result) {
    ctx.body = {
      success: true,
      data: result.length
    }
  }
})

router.post('/addArticleLookV', async ctx => {
  ctx.request.body = qs.parse(ctx.request.body)
  const result = await article.find(ctx.request.body)
  if (result) {
    let arr = result[0].looks + 1
    const result1 = await article.update(ctx.request.body, { 'looks': arr })
    if (result1) {
      ctx.body = { success: true }
    }
  }
})
module.exports = router.routes()
