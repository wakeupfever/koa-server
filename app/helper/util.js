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
  }, 
  createDate: (time = false) =>{
    const date = new Date()
    const y = date.getFullYear() 
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    if (time) {
      let h = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      h = h < 10 ? ('0' + h) : h;
      minute = minute < 10 ? ('0' + minute) : minute;  
      second = second < 10 ? ('0' + second) : second;
      return h + '' + minute + second
    } 
    return y + '' + m + d
  }
}