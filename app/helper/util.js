const options = {
  1: 200, // 成功
  '-': 400, // 异常
  '+': 300, // 没有
  0: 500 // 失败
}
const states = {
  1: 'ok!', // 成功
  '-': 'no!', // 异常
  '+': 'no!', // 没有
  0: 'no!' // 失败
}
module.exports = {
  initData: (data = [], status = '1') => {
    return {
      code: options[status],
      list: data,
      msg: states[status],
    }
  }
}