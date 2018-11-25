module.exports = app => class extends app.Service {
  async render (value) {
    this.ctx.body = {
      query: this.ctx.query,
      value
    }
  }
}