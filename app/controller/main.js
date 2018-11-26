module.exports = app => class extends app.Controller {
  async main (ctx) {
    ctx.body = 'main';
  }
}