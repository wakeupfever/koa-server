module.exports = app => class extends app.Controller {
  async getLinkman(ctx) {
    const result = await ctx.mongoDB.linkman.find({}, {sort: {_id: -1}})
    ctx.body = ctx.helper.util.initData(result, 1);
  }
  async addLinkman(ctx) {
    const data = ctx.request.body
    if (!data.l_name || !data.l_link) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const hasData = await ctx.mongoDB.linkman.findOne({
      l_name: data.l_name
    })
    let result = ''
    if (!hasData) {
      result = await ctx.mongoDB.linkman.insert({
        l_name: data.l_name,
        l_link: data.l_link,
        l_time: new Date(new Date().setHours(new Date().getHours() + 8))
      })
      result._id ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
    } else {
      return ctx.body = ctx.helper.util.initData(result, '-')
    }
  }
  async updataLinkman(ctx) {
    const data = ctx.request.body
    if (!data.l_name && !data.l_link && !data._id) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    let params = Object.assign({}, data)
    params.l_time = new Date(new Date().setHours(new Date().getHours() + 8))
    const result = await ctx.mongoDB.linkman.findOneAndUpdate({
      _id: params._id
    }, {$set: params})
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
  async delLinkman(ctx) {
    const data = ctx.request.body
    if (!data._id) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const id = data._id
    const result = await ctx.mongoDB.linkman.findOneAndDelete({
      _id: id
    })
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
}