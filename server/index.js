let koa = require('koa')
let Router = require('koa-router')
let db = require('./db/index')
var bodyParser = require('koa-bodyparser')
let jwt = require('koa-jwt')
let serve = require('koa-static')
let article = require('./router/api/article')
let comments = require('./router/api/comments')
let looks = require('./router/api/looks')
let roles = require('./router/api/power')
let user = require('./router/api/users')
let app = new koa()
let router = new Router()
const compress = require('koa-compress')
app.use(compress())
app.use(serve(__dirname + "/public"));
app.use(bodyParser())
// 坑，要使用async await 设置，否则响应不了数据
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', '*')
  ctx.set("Access-Control-Expose-Headers", '*')
  await next()
})

app.use(jwt({ secret: 'shhhh', passthrough: true }))
db.then(() => {
  // 配置路由地址
  // router.use('/api/users', users)
  // 配置文章
  router.use('/api/article', article)
  // 配置评论
  router.use('/api/comments', comments)
  // 用户
  router.use('/api/user', user)
  // 权限
  router.use('/api/role', roles)
  // 浏览量
  router.use('/api/look', looks)
})


app.use(router.routes()).use(router.allowedMethods())
app.listen(4000)