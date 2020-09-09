const baseUrl = 'http://localhost:8080'
let resData = {
  rode: '',
  msg: '',
  data: {},
}
export const Http = (api, params) => {
  return new Promise((resolve, reject) => {
    let url = baseUrl + api
    console.log(url, params)
    setTimeout(() => {
      let r = Math.random()
      if (r > 0.1 && r < 0.9) {
        switch (api) {
          case '/register':
            resData.rode = 'ok'
            resData.msg = '注册成功'
            break
          case '/login':
            resData.rode = 'ok'
            resData.msg = '登录成功'
            resData.data = {
              token: '123456',
              user: {
                username: '张三',
                email: 'zhangsan@qq.com',
              },
            }
            break

          default:
            break
        }
        resolve(resData)
      } else {
        resData.rode = 'faily'
        resData.msg = '失败信息'
        reject(resData.msg)
      }
    }, 1000)
  })
}
