module.exports = app => class extends app.Controller {
  async getArticle (ctx) {
    const data = ctx.request.body
    data.page > 0 ? data.page = data.page - 1 : data.page
    let date = data.a_time && new Date(data.a_time);
    const firstDay = data.a_time ? new Date(date.getFullYear(), date.getMonth(), 1) : '';
    const lastDay = data.a_time ? new Date(date.getFullYear(), date.getMonth() + 1, 0) : '';
    const result = await ctx.mongoDB.article.aggregate([
      {
        $lookup: { // 左连接
          from: "tabs", // 关联到tabs表
          localField: "a_lable", // article 表关联的字段
          foreignField: "_id", // tabs 表关联的字段
          as: "article_docs" // 聚合的字段集合
        }
      },
      { $unwind: "$article_docs" }, // 拆分article_docs字段集合
      {
        $addFields: { t_name: "$article_docs.t_name" } // 提到顶层
      },
      { 
        $match: { // 模糊匹配的字段集合
            $and: [
              // { a_lable: data.a_lable && ctx.helper.mongoose.Types.ObjectId(data.a_lable)},
              { t_name: {$regex: data.t_name || ''}},
              { a_state: '1' || '2' || '3' || '4'},
              { a_title: {$regex: data.a_title || ''} },
              { a_state: {$regex: data.a_state || ''} },
              { a_time: {'$gte': firstDay ? new Date(firstDay) : new Date('1970-01-01'), '$lt': lastDay ? new Date(lastDay) : new Date('2100-12-01')} },
            ]
          },
      },
      { $sort: { _id : -1 } }, // 根据id升序
      // { $skip: data.page * data.size >=0 ? data.page * data.size : 0 },
      // { $limit: data.size ? Number.parseInt(data.size) : 10 },
      {
        $project: { // 要显示的字段集
          'article_docs': 0
        }
      },
    ])
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
    console.log(result)
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
    if (params.a_lable) {
      params.a_lable = ctx.helper.mongoose.Types.ObjectId(params.a_lable)
    }
    const result = await ctx.mongoDB.article.findOneAndUpdate({
      _id: data._id
    }, {$set: params});
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
  async delArticle(ctx) {
    const data = ctx.request.body
    if (!data._id) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    const id = data._id
    const state = {a_state: 0}
    const result = await ctx.mongoDB.article.findOneAndUpdate({_id: id}, {$set, state})
    !!result ? (ctx.body = ctx.helper.util.initData(result, 1)) : (ctx.body = ctx.helper.util.initData(result, 0)) // 成功或者失败
  }
}