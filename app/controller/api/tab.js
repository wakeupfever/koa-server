module.exports = app => class extends app.Controller {
  async getTab (ctx) {
    const result = await ctx.mongoDB.tab.find()
    ctx.body = ctx.helper.util.initData(result, 1);
  }
  async addTab(ctx) {
    const data = ctx.request.body
    if (!data.t_name) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const findResult = await ctx.mongoDB.tab.findOne({
      t_name: data.t_name
    })
    let result = ''
    if (findResult == null) {
      result = await ctx.mongoDB.tab.insert({
        t_name: data.t_name
      })
      result._id ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
    } else {
      return ctx.body = ctx.helper.util.initData(result, '-')
    }
  }
  async updataTab(ctx) {
    const data = ctx.request.body
    if (!data._id || !data.t_name) {
      return ctx.body = ctx.helper.util.initData('', '-');
    }
    let prve = await ctx.mongoDB.tab.find({'t_name': data.t_name})
    let result = ''
    if (!prve.length) {
      result = await ctx.mongoDB.tab.update({'_id': data._id}, {$set: {'t_name': data.t_name}})
      result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
    } else {
      return ctx.body = ctx.helper.util.initData(result, '-')
    }
  }
  async delTab(ctx) {
    const data = ctx.request.body
    if (!data._id || data._id.length < 24) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const result = await ctx.mongoDB.tab.findOneAndDelete({
      _id: data._id
    });
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
}