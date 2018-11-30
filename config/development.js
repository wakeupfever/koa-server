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

    // DEBUG
    debug: true,
    origin: 'http://localhost:3001',
    logger: {
      template: '[${time_local}] "${request}" ${status} ${request_time}ms ${logs}'
  },
}