module.exports = async function(router, controller, app) {
  router.use('/', async function (ctx, next) {
    ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
    ctx.set('Access-Control-Allow-Methods', 'GET,POST');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Allow-Headers', 'content-type');
    await next()
  })
  router.post('/getArticle', controller.article.getArticle) // 文章方法
  router.post('/addArticle', controller.article.addArticle)
  router.post('/updataArticle', controller.article.updataArticle)
  router.post('/delArticle', controller.article.delArticle)

  router.post('/getTab', controller.tab.getTab) // 类别方法
  router.post('/addTab', controller.tab.addTab)
  router.post('/updataTab', controller.tab.updataTab)
  router.post('/delTab', controller.tab.delTab)

  router.post('/setUpload', controller.fileUpload.setUpload) // 图片上传方法
}