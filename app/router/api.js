module.exports = async function(router, controller, app) {
  router.use('/', async function (ctx, next) {
    await next()
  })
  router.post('/getArticle', controller.article.getArticle)
  router.post('/addArticle', controller.article.addArticle)
  router.post('/updataArticle', controller.article.updataArticle)
}