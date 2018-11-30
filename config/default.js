/**
 * @Author: zfowed
 * @Date: 2017-12-20 14:58:02
 * @Last Modified by: zfowed
 * @Last Modified time: 2018-02-21 21:27:21
 */



'use strict';

module.exports = {
    // 监听端口
    port: 3001,
    
    origin: 'http://www.onefour.top',
    // DEBUG
    debug: false,

    // Cookie 加密的KEY 默认随机
    keys: ['cookie-key'],

    logger: {
        dir: '/logs',
        template: '{${concurrency}} ${remote_addr} ${remote_user} [${time_local}] "${request}" ${status} ${body_bytes_sent} ${request_time}ms "${http_referer}" "${http_user_agent}" ${logs}'
    },
    
    // Session 配置
    session: {
        key: 'heiner:sass',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
    },

    // // Sequelize 关系型ORM数据库配置
    // sequelize: {

    //     // 文件夹路径
    //     dir: '/app/sequelize',

    //     // 挂载到app、ctx的属性
    //     key: 'database',

    //     // 默认配置属性
    //     defaultOptions: {
    //         dialect: 'mysql',
    //         operatorsAliases: '$${key}',
    //         port: 3306,
    //         logging: null,
    //         define: {
    //             createdAt: false,
    //             updatedAt: false
    //         },
    //     },

    //     // 数据库配置
    //     database: {}

    // },

    // 工具集
    helper: {

        // 文件夹路径
        dir: '/app/helper',
        
        // 挂载到app、ctx的属性
        key: 'helper',

        // 挂载第三方模块
        require: {
            uuidv1: 'uuid/v1',
            uuidv4: 'uuid/v4',
            uuidv5: 'uuid/v5',
            lodash: 'lodash',
            mongoose: 'mongoose',
            moment: 'moment',
            path: 'path',
            fs: 'fs'
        }

    },

    // 服务
    service: {

        // 文件夹路径
        dir: '/app/service',

        // 挂载到app、ctx的属性
        key: 'service',

        // 自定义一些Service的this属性
        bindSelf: {
            config: 'app.config',
            helper: 'ctx.helper',
            service: 'ctx.service',
            lodash: 'app.helper.lodash',
            database: 'app.database'
        },

    },

    // 解析request.query
    requestQuery: {

        // 解析模式
        mode: 'extended'

    },

    // 解析request.body
    requestBodyParser: {
        enableTypes: ['json', 'form'],
        encode: 'utf-8',
        formLimit: '56kb',
        jsonLimit: '1mb',
        textLimit: '1mb',
        extendTypes: {
            // json: ['application/x-javascript']
        },
    },

    // 解析formidable
    requestFormidable: {

        // 存放上传文件的文件夹路径
        dir: '/temp',

        // 限制最大字节预期
        bytesExpected: 10 * 1024 * 1024,

        // 限制最大属性字节预期
        maxFieldsSize: 2 * 1024 * 1024,

        // 限制最大属性长度
        maxFields: 1000,

        // 是否允许一个属性接收多个文件
        multiples: false,

        // 是否需要hash值
        hash: false,

        // 限制最大接收文件数
        fileNum: 1,

        // 限制单个文件大小
        fileSize: 10 * 1024 * 1024,

        // 限制接收的文件类型
        fileType: null,

        // 限制接收的文件的后缀名
        fileExt: null

    },

    // 中间件
    middleware: {

        // 中间件文件夹路径
        dir: '/app/middleware',

        // 使用中间件
        use: ['mongoDB'],

        // 中间件配置
        options: {
            mongoDB: {
                url: '118.24.248.213/blog'
            }
        }
    },

    // 路由
    router: {

        // 路由文件夹路径
        dir: '/app/router',

        // 控制器
        controller: {

            // 控制器文件夹路径
            dir: '/app/controller',

            // 自定义一些Controller的this属性
            bindSelf: {
                config: 'app.config',
                helper: 'app.helper',
                lodash: 'app.helper.lodash',
                database: 'app.database'
            }

        },

        // 视图
        view: {

            // 视图文件夹路径
            root: '/app/view',

            // 默认视图类型
            extension: 'ejs',

            // 根据不同后缀名使用不同解析类型
            map: {
                "ejs": 'ejs',
                "pug": 'pug',
            }
        }
    },

    // 静态文件服务
    staticServer: {

        // 文件夹路径
        dir: '/app/public',

        // 缓存周期
        maxage: 86400000,

        // 是否输出隐藏文件
        hidden: false,

        // 索引文件
        index: "index.html",

        // 延缓
        defer: false,

        // Gzip
        gzip: true,

        // 扩展
        extensions: false

    }
}