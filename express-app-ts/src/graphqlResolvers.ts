import { Do, FindFrist } from './mysql'
import moment  from 'moment'

export const good = async (parent: any, args: any, context: any, info: any) => {
  try {
    let res = await FindFrist('select * from goods where id = ? ', [args.id])
    return res
  } catch (e) {
    return e
  }
}

export const goodtype = async (parent: any, args: any, context: any, info: any) => {
  try {
    let res = await FindFrist('select * from dict_son where id = ? ', [parent.type])
    return res
  } catch (e) {
    return e
  }
}

export const goods = async (parent: any, args: any, context: any, info: any) => {
  try {
    let sql = 'select * from goods where 1=1 '
    sql += args.type ? " and type = '" + args.type + "' " : ''
    sql += ' and ( 1=1 '
    sql += args.name ? " and name like '%" + args.name + "%' " : ''
    sql += args.desc ? " or gooddesc like '%" + args.desc + "%' " : ''
    sql += ' ) '
    sql += ' limit ?,?'
    let res = await Do(sql, [args.start, args.count])
    return res
  } catch (e) {
    return e
  }
}

export const categorys = async (parent: any, args: any, context: any, info: any) => {
  try {
    let sql = 'select * from dict_son where id in (?) '
    let res = await Do(sql, [args.type])
    return res
  } catch (e) {
    return e
  }
}

export const goodsCategory = async (parent: any, args: any, context: any, info: any) => {
  try {
    let res = await Do('select * from goods where type = ? limit ? ', [parent.id, args.count])
    return res
  } catch (e) {
    return e
  }
}
export const user = async (parent: any, args: any, context: any, info: any) => {
  try {
    let res = await FindFrist('select * from user where id = ?', [args.id])
    return res
  } catch (e) {
    return e
  }
}
const userVisitedGoods = 'select b.*,a.visitedcount from user_actions a,goods b where a.goodid = b.id and a.userid = ? and a.type = 1  order by a.sysdate desc limit ?,? '
export const visitedGoods = async (parent: any, args: any, context: any, info: any) => {
  try {
    let res = await Do(userVisitedGoods, [parent.id, args.start, args.count])
    return res
  } catch (e) {
    return e
  }
}

export const userVisited = async (parent: any, args: any, context: any, info: any) => {
  try {
    let res = await Do(userVisitedGoods, [args.userid, args.start, args.count])
    return res
  } catch (error) {
    return error
  }
}
export const goodpop = async (parent: any, args: any, context: any, info: any) => {
  try {
    let sql = `select b.id,b.name,b.price,b.imgpath,b.gooddesc,sum(a.visitedcount) visitedcount,b.type
     from user_actions a,goods b 
     where a.goodid = b.id group by b.id,b.name,b.price,b.imgpath,b.gooddesc,b.type
     order by sum(a.visitedcount) desc limit ?`
    let res = await Do(sql, [args.count])
    return res
  } catch (error) {
    return error
  }
}
export const userCart = async (parent:any,args:any,context:any,info:any) => {
  try {
      const sql = "select b.*,a.num as countbuy from user_actions a,goods b where a.goodid = b.id and a.userid = ? and a.type = 2  order by a.sysdate desc ";
      let res = await Do(sql,[args.userid]);
      return res
  } catch (e) {
      return e
  }
}
export const userOrder = async (parent:any,args:any,context:any,info:any) => {
  try {
      // let res = await Do('select id,status,sysdate orderdate from `order` where userid = ? order by sysdate desc limit ? , ?',[args.userid,args.start,args.count]);
      let res = await Do('select id,status,sysdate orderdate from `order` where userid = ? order by sysdate desc limit ? , ?',[args.userid,args.start,args.count]);
      return res
  } catch (e) {
      return e
  }
}
export const price = async (parent:any,args:any,context:any,info:any) => {
  try {
      let res = await FindFrist('select sum(price*countbuy) price from order_list where orderid = ?',[parent.id]);
      let jsonObj = JSON.parse(JSON.stringify(res))
      return jsonObj.price
  } catch (e) {
      return e
  }
}
export const goodcount = async (parent:any,args:any,context:any,info:any) => {
  try {
      let res = await FindFrist('select sum(1) num from order_list where orderid = ?',[parent.id]);
      let jsonObj = JSON.parse(JSON.stringify(res))
      return jsonObj.num
  } catch (e) {
      return e
  }
}
export const formatOrderdate = (parent:any,args:any,context:any,info:any)=>{
  return moment(parent.orderdate).format('yyyy-MM-DD HH:mm:ss')
}

export const orderStatus =async (parent:any,args:any,context:any,info:any)=>{
  try {
    let res = await FindFrist('select * from dict_son where id = ?',[parent.status])
    return res
  } catch (error) {
    
  }
}
export const goodlist =async (parent:any,args:any,context:any,info:any)=>{
  try {
    let res = await Do("select id as orderid, goodid as id,countbuy,name,gooddesc,price,type,imgpath from order_list where orderid = ? ",[parent.id])
    return res
  } catch (error) {
    
  }
}
