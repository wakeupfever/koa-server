
const monk = require('monk')

module.exports = function(options, app) {
  const db = monk(options.url)
  return async function(ctx, next) {
    ctx.mongoDB = {
      _db: db,
      article: db.get('article'),
      tab: db.get('tabs'),
      linkman: db.get('linkmans'),
    }
    return next()
  }
}