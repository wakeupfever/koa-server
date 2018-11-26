module.exports = app => class extends app.Controller {
  async getArticle (ctx) {
    const result = await ctx.mongoDB.article.find()
    // const result = await ctx.mongoDB.article.aggregate([
    //   {
    //     $lookup: { // 左连接
    //       from: "tabs", // 关联到tabs表
    //       localField: "a_lable", // article 表关联的字段
    //       foreignField: "_id", // tabs 表关联的字段
    //       as: "article_docs"
    //     }
    //   },
    //   {
    //     $unwind: "$article_docs"
    //   },
    //   {
    //     $addFields: {  name: "$article_docs.a_lable" }
    //   },
    //   {
    //     $project: {
    //       'a_code': 1,
    //       '_id': 1,
    //       'a_title': 1,
    //       'a_content': 1,
    //       'a_time': 1,
    //       'a_state': 1,
    //       'a_lable': 1,
    //     }
    //   }
    // ])
    
    ctx.body = ctx.helper.util.initData(result, 1);
  }
  async addArticle (ctx) {
    const data = ctx.request.body
		if (!data.a_title || !data.a_content || !data.a_state || !data.a_lable) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const result = await ctx.mongoDB.article.insert({
      a_title: data.a_title,
      a_content: data.a_content,
      a_time: data.a_time,
      a_code: data.a_code,
      a_state: data.a_state,
      a_lable: ctx.helper.mongoose.Types.ObjectId(data.a_lable),
    })
    let state = 1
    result._id ? state = 1 : state = 0;
    ctx.body = ctx.helper.util.initData(result, state);
  }
  async updataArticle(ctx) {
    const data = ctx.request.body
    if (!data._id) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const params = Object.assign({}, data)
    const result = await ctx.mongoDB.article.findOneAndUpdate({
      _id: data._id
    }, {$set: params});
    console.log(result)
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
  async delArticle(ctx) {
    const data = ctx.request.body
    if (!data._id) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
  }
}