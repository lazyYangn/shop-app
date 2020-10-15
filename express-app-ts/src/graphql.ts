import { ApolloServer, gql } from 'apollo-server-express'
import * as gr from './graphqlResolvers'

const config = require('../config')

const typeDefs = gql`
  type Query {
    hello: String
    good(id: Int!): Good
    goods(start: Int!, count: Int!, type: String, name: String, desc: String): [Good]
    goodpop(count: Int!): [Good]
    categorys(type: [String]!): [Category]
    homeImgs: [String]
    user(id: String): User
    userVisited(userid: String!, start: Int!, count: Int!): [Good]
    userCart(userid:String!) : [Good]
    userOrder(userid:String!,start:Int!,count:Int!):[Order]
  }

  type Good {
    id: Int
    name: String
    price: Float
    gooddesc: String
    type: Dict
    imgpath: String
    visitedcount: Int
    countbuy: Int
  }

  type Dict {
    id: String
    dictid: String
    name: String
    sort: Int
  }
  type Category {
    id: String
    dictid: String
    name: String
    goods(count: Int!): [Good]
  }
  type User {
    id: String
    name: String
    visitedGoods(start: Int!, count: Int!): [Good]
  }
  type Order{
    id:String
    orderid:String
    price:Float
    goodcount:Int
    orderdate:String
    status:Dict
    goodlist:[Good]
  }
`
const resolvers = {
  Query: {
    hello: () => 'hello woody',
    good: gr.good,
    goods: gr.goods,
    categorys: gr.categorys,
    homeImgs() {
      let baseUrl = `${config.url}:${config.port}:${config.static_imgs_url}`
      return [baseUrl + '/home01.png', baseUrl + '/home02.png', baseUrl + '/home03.png']
    },
    user: gr.user,
    userVisited: gr.userVisited,
    goodpop: gr.goodpop,
    userCart:gr.userCart,
    userOrder:gr.userOrder,
  },
  Good: {
    type: gr.goodtype,
  },
  Category: {
    goods: gr.goodsCategory,
  },
  User: {
    visitedGoods: gr.visitedGoods,
  },
  Order:{
    orderdate:gr.formatOrderdate,
    price:gr.price,
    goodcount:gr.goodcount,
    status:gr.orderStatus,
    goodlist:gr.goodlist
  }
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: config.gql_playground,
})
