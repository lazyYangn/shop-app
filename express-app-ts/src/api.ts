import crypto from 'crypto'
import { Do, DoNoConn, DoTx, FindFrist } from './mysql'

export const rootApi = (req: any, resp: any) => {
  console.log(req.query.a)
  resp.send('hello world!')
}
export const defaultApi = (req: any, resp: any) => {
  resp.send('hello api')
}

export const login = async (req: any, resp: any) => {
  let p = req.body
  let res = await FindFrist('select * from user where id = ? ', [p.id])
  /**
   userid password
  userid 去数据库查询 查看是否存在这个用户
      存在: 拿到数据库中存储的密码，然和发送来的参数中的密码进行比较
          相同: 需要把用户的一些完整信息和token(身份认证)返回给前台
          不相同: 直接返回前端 并发送消息“密码错误”
      不存在：直接返回前端 并发送消息“无此用户/请注册”
  */
  if (res) {
    let jsonObj = JSON.parse(JSON.stringify(res))
    if (p.pwd === jsonObj.pwd) {
      let md5 = crypto.createHash('md5')
      let token = md5.update(jsonObj.id + jsonObj.pwd).digest('hex')
      resp.json({
        code: 1,
        msg: '登陆成功',
        data: {
          userId: jsonObj.id,
          userName: jsonObj.name,
          token,
        },
      })
    } else {
      resp.json({
        code: 2,
        msg: '密码不正确',
        data: '',
      })
    }
  } else {
    resp.json({
      code: 3,
      msg: '无此用户',
      data: '',
    })
  }
}

export const register = async (req: any, resp: any) => {
  let p = req.body
  try {
    let res = await Do('insert into user values (?,?,?) ', [p.mail, p.username, p.pwd])
    let jsonObj = JSON.parse(JSON.stringify(res))
    if (jsonObj.affectedRows === 1) {
      resp.json({
        code: 1,
        msg: '注册成功',
        data: '',
      })
    } else {
      resp.json({
        code: 2,
        msg: '注册失败(未知原因)',
        data: '',
      })
    }
  } catch (error) {
    resp.json({
      code: 3,
      msg: '注册失败',
      data: {
        error,
      },
    })
  }
}

export const goods = async (req: any, resp: any) => {
  let p = req.body
  try {
    let res = await Do("select * from goods where type = ? and name like '%" + p.name + "%' and gooddesc like '%" + p.desc + "%' ", [p.type])
    resp.json({
      code: 1,
      msg: '',
      data: res,
    })
  } catch (error) {
    resp.json({
      code: 3,
      msg: '失败',
      data: {
        error,
      },
    })
  }
}

export const visited = async (req: any, resp: any) => {
  const p = req.body
  const res = await FindFrist('select * from user_actions where userid =? and goodid =? and type = 1 ', [p.userid, p.goodid])
  let jsonObj = JSON.parse(JSON.stringify(res))
  if (jsonObj && jsonObj.visitedcount) {
    let visitedcount = jsonObj.visitedcount + 1
    Do('update user_actions set visitedcount = ? where userid =? and goodid =? and type = 1  ', [visitedcount, p.userid, p.goodid])
  } else {
    Do('insert into user_actions (userid,goodid,type,visitedcount,sysdate) values (?,?,?,?,(select now())) ', [p.userid, p.goodid, 1, 1])
  }
  resp.json({
    code: 3,
    msg: '成功',
    data: {},
  })
}
export const test2main = async (req: any, resp: any) => {
  const p = req.body

  try {
    let res = await DoTx((conn) => {
      let a = DoNoConn({
        conn,
        sql: 'insert into test_main1 values (?,?) ',
        params: [p.table1.id, p.table1.name],
      })
      let b = DoNoConn({
        conn,
        sql: 'insert into test_main2 values (?,?) ',
        params: [p.table2.id, p.table2.name],
      })
      return [a, b]
    })
    resp.json(res)
  } catch (e) {
    resp.json(e)
  }
}

export const testmainlist = async (req: any, resp: any) => {
  const p = req.body

  try {
    let res = await DoTx((conn) => {
      let md5 = crypto.createHash('md5')
      let id = md5.update(p.main).digest('hex')
      let a = DoNoConn({
        conn,
        sql: 'insert into test_main values (?,?) ',
        params: [id, p.main],
      }).then(() => {
        let arr: any[] = []
        for (let item of p.list) {
          arr.push(
            DoNoConn({
              conn,
              sql: 'insert into test_main_list values (?,?,?) ',
              params: [item.id, id, item.name],
            })
          )
        }
        return Promise.all(arr)
      })
      return [a]
    })
    resp.json(res)
  } catch (e) {
    resp.json(e)
  }
}

export const goodaddcart = async (req: any, resp: any) => {
  let p = req.body
  if (p.num === 0) {
    Do("delete from user_actions where userid= ? and goodid=? and type = 2 ",[p.userid,p.goodid])
  }else{
  DoTx((conn) => {
    const a = DoNoConn({
      conn,
      sql:"delete from user_actions where userid= ? and goodid=? and type = 2 ",
      params:[p.userid,p.goodid],
    }).then(() => {
      return DoNoConn({
        conn,
        sql:"insert into user_actions (userid,goodid,type,num,sysdate) values (?,?,?,?,(select now())) ",
        params:[p.userid,p.goodid,2,p.num]
    })
    })
    return [a]
  })
}
  resp.json({
    code: 1,
    msg: '添加成功',
    data: {},
  })
}

export const createorder = async (req:any,resp:any) => {
  const p = req.body
  try {
      let md5 = crypto.createHash('md5')
      let date = new Date()
      let id = md5.update(date.getUTCMilliseconds().toString()).digest('hex');
      await DoTx((conn)=>{
          return [DoNoConn({
              conn,
              sql:"insert into `order` values (?,?,?,(select now())) ",
              params:[id,p.userid,1]
          }).then(()=>{
              let arr : Promise<any>[]= []
              for(let t of p.orderlist){
                  arr.push(DoNoConn({
                      conn,
                      sql:"insert into order_list (orderid,goodid,countbuy,name,gooddesc,price,type,imgpath) values (?,?,?,?,?,?,?,?) ",
                      params:[id,t.id,t.countbuy,t.name,t.gooddesc,t.price,t.type,t.imgpath]
                  }))
              }
              return Promise.all(arr)
          })]
      })
      resp.json({
          code:1,
          msg:"创建成功",
          data:{}
      })
  } catch (e) {
      resp.json({
          code:2,
          msg:"创建订单失败",
          data:{}
      })
  }
}
export const resetcart = async (req:any,resp:any)=>{
  let p = req.body
  try {
      let res = await Do("delete from user_actions where userid= ? and type = 2 ",[p.userid])
      resp.json({
          code:1,
          msg:"操作成功",
          data:res
      })
  } catch (error) {
      resp.json({
          code:3,
          msg:"操作失败",
          data:{
              error
          }
      })
  }
  
}


