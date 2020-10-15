<template>
    <my-content :refreshFunc="refresh" pull>
    <div class="title">
        订单信息
    </div>
    <a-list size="large" style="margin-top:24px;" :data-source="listData">
        <a-list-item slot="renderItem" slot-scope="item" @click="goto('orderdetail',item)">
            <div class="order">
                <div class="first-row">
                    <div>{{item.status.name}}</div>
                </div>
                <div class="row">
                   <div>订单号:</div>
                   <div>{{item.id}}</div>
                    
                </div>
                <div class="row">
                   <div>创建订单时间:</div>
                   <div>{{item.orderdate}}</div>
                    
                </div>
                <div class="row">
                   <div>购买了几种商品:</div>
                    <div>{{item.goodcount}} 种</div>
                </div>
                <div class="row">
                   <div>订单总价:</div>
                     <div>￥ {{item.price}}</div>
                </div>
            </div>
        </a-list-item>
    </a-list>
    </my-content>
</template>

<script>
import MyContent from '@/components/content/MyContent'
import {HttpGql} from '@/kits/Http'
import {getCachVal} from '@/kits/LocalStorage'
export default {
  name:"Order",
    data() {
        return {
            listData:[],
            start:0,
            count:5
        };
    },
    components:{
        MyContent
    },
    created() {
        this.getData()
    },
    methods: {
        async getData(){
            try {
                let gql = {
                    query:`
                        {
                            userOrder(userid:"${getCachVal('userid')}",start:${this.start},count:${this.count}){
                            id
                            orderdate
                            price
                            goodcount
                            status{
                                name
                            }
                            goodlist{
                                name
                                id
                                price
                                type{
                                id
                                }
                                countbuy
                                gooddesc
                                imgpath
                            }
                            }
                            
                        }
                    `
                }
                let res = await HttpGql(gql)
                this.listData = res.data.userOrder
                return true
            } catch (error) {
                return false
            }
        },
        refresh(){
            this.start = 0
           return this.getData()
        },
        goto(name,params){
            console.log(params)
            this.$store.commit("setSelectedOrder",params)
            this.$router.push({name})
        }
    }
};
</script>

<style scoped >
.title {
    margin-top:36px;
    color:rgb(0 0 0 / 0.5);
    font-size:16px;
    font-weight: bold;
}
.order{
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0px 1px 8px #e3e3e3;
    border-radius: 12px;
}
.row{
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 13px;
}
.first-row{
    display: flex;
    justify-content: flex-end;
    font-size: 15px;
    color: rgb(250, 100, 0);
    margin-top: 8px;
}
</style>
