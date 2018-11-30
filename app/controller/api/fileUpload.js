module.exports = app => class extends app.Controller {
  async setUpload(ctx) {
    const { fs, path, moment, util } = ctx.helper
    const { fields, files } = await ctx.request.getFormidable({
      bytesExpected: 10 * 1024 * 1024,
      maxFieldsSize: 2 * 1024 * 1024,
      maxFields: 1000,
      multiples: false,
      hash: false,
      fileNum: 1,
      fileSize: 10 * 1024 * 1024,
      fileType: null,
      fileExt: ['.jpg', '.png', '.jpeg']
    })

    const now = moment().format('YYYY-MM-DD')
    const dir = path.join(app.info.root, app.config.staticServer.dir, 'imgFile', now)
    const basename = path.basename(files.article.path)
    const ext = path.extname(files.article.name)
    const newPath = path.join(dir, `${basename}${ext}`)

    const exists = fs.existsSync(dir)
    if (!exists) fs.mkdirSync(dir)

    fs.renameSync(files.article.path, newPath)

    const src = path.relative(path.join(app.info.root, app.config.staticServer.dir), newPath)
    
    return ctx.body = util.initData(app.config.origin + '/' + src.split(path.sep).join('/'), 1)
  }
}