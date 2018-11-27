module.exports = app => class extends app.Controller {
  async setUpload(ctx) {
    try {
      const { fields, files } = await ctx.request.getFormidable({
        bytesExpected: 10 * 1024 * 1024,
        maxFieldsSize: 2 * 1024 * 1024,
        maxFields: 1000,
        multiples: false,
        hash: false,
        fileNum: 1,
        fileSize: 10 * 1024 * 1024,
        fileType: null,
        fileExt: '.jpg,.png,.git',
      })
    } catch (error) {
      return ctx.body = ctx.helper.util.initData('', '-')
    }
    
    console.log(fields, files)
  }
}