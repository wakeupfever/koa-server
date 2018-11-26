
const heiner = require('heiner');
heiner(__dirname, {   
    configDir: '/config',
}).then(function (app) {
    console.log('项目启动成功：http://localhost:' + app.config.port)
}, function (error) {
    console.log(error)
});
