
module.exports = app => class extends app.Controller {
  async getImg (ctx) {
    const IMG_PATHS = 'https://www.pexels.com/popular-searches.js'
    // const ATTR_NAME = 'h4.search-medium__title'
    const PAGES = [2, 3, 4, 5, 6, 7, 8]
    const { axios } = ctx.helper

    let res = PAGES.map(item => {
      let params = `?page=${item}&send=517569191&format=js&send=517569191`
      return axios.get(IMG_PATHS + params, {
        params: params
      })
    })

    const result = await Promise.all(res)
    
    let data = ''
    result.forEach(item => {
      data += item.data
    })
    const lastName = data.match(/img alt=\\"([^\"]*?)\\"/gi).join(',').match(/(?<=img alt=\\").*?(?=\\")/gi, '');
    ctx.body = lastName
  }
}