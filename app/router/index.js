module.exports = async function(router, controller, app) {
  router.get('/test', controller.home.test)
}