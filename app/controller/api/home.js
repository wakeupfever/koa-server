module.exports = app => class extends app.Controller {
  async test (ctx) {
		const reslut = await ctx.mongoDB.article.find()
    ctx.state = {
      params: ctx.params,
      reslut
    }
  }
}