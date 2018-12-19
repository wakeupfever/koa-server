module.exports = app => class extends app.Controller {
  async getTab (ctx) {
    const result = await ctx.mongoDB.tab.find({}, {sort: {_id: -1}})
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
        t_name: data.t_name,
        t_state: '3',
        t_time: new Date()
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
    if (!data._id || !data.t_state) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const id = data._id
    const state = {t_state: data.t_state} 
    const result = await ctx.mongoDB.tab.findOneAndUpdate({
      _id: id
    }, {$set: state});
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
}