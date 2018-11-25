module.exports = app => class extends app.Controller {
  async test (ctx) {
    ctx.body = 1;
    ctx.state = {
      title: '123'
    }
    return ctx.render('index')
  }
}