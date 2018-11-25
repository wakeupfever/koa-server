module.exports = async function(router, controller, app) {
  router.use('/', async function (ctx, next) {
    ctx.params = Object.assign({}, ctx.query, ctx.request.body, ctx.params)
    await next()
    ctx.body = {
      code: 200,
      msg: 'ok',
      data: ctx.state
    }
  })
  router.all('/test/:id', controller.home.test)
}