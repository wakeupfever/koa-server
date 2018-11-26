module.exports = async function(router, controller, app) {
  router.get('/main', controller.main.main)
}