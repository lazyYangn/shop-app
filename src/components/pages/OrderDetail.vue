<template>
    <div>
        <TopBar style="box-shadow: unset;backgroundColor:#f7f7f7">
           <div
        slot="left"
        class="iconfont icon-back"
        style="font-size: 24px"
        @click="goBack"
        ></div>
            <div slot="middle">订单明细</div>
        </TopBar>
        <my-content>
            <a-list :data-source="order.goodlist">
                    <a-list-item slot="renderItem" slot-scope="item" :key="item.id" @click="gotoGoodDetail(item)">
                    <div class="order">
                        <div class="pic" :style="imgStyle(item.imgpath)"></div>
                        <div class="content">
                            <div>{{item.name}}</div>
                            <div>数量:{{item.countbuy}}个</div>
                            <div>单价:￥ {{item.price}}</div>
                            <div>总价:￥ {{TotalPrice(item.countbuy,item.price)}}</div>
                        </div>
                    </div>
                </a-list-item>
            </a-list>
        </my-content>
        <FooterBar>
            <div slot="left" style="fontSize:15px;">
                <div  style="color: rgb(250, 100, 0);margin-bottom:3px">订单状态:{{order.status.name}}</div>
                <div>实时付款:￥{{order.price}}</div>
            </div>
            <FooterBarItem slot="right" name="提醒发货"></FooterBarItem>
        </FooterBar>
    </div>
</template>

<script>
import TopBar from '@/components/topbar/TopBar'
import MyContent from '@/components/content/MyContent'
import FooterBar from "@/components/footer/FooterBar";
import FooterBarItem from "@/components/footer/FooterBarItem";
import { Http, HttpGql, ImgUrl } from "@/kits/Http";

export default {
  name:"OrderDetail",
    data() {
        return {
            order:{}
        };
    },
    components:{
        TopBar,
        MyContent,
        FooterBar,
        FooterBarItem,
    },
    created() {
        this.order = this.$store.state.selectedOrder
    },
    computed: {
        imgStyle(){
            return (path)=>{
                return {
                    backgroundImage:`url(${path})`
                }
            }
        },
        TotalPrice(){
            return (count,price)=>{
                return count*price
            }
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        gotoGoodDetail(item){
            this.$store.commit("addSelectGoods",{
                id:item.id,
                type:item.type.id,
            })
            this.$router.push({
                path:"/gooddetail/"+item.id,
            })
        },
    },
};
</script>

<style scoped >
.order{
    width: 100%;
    display: flex;
    background-color: #fff;
    border-radius: 12px;
    padding: 8px;
   box-shadow: 0px 1px 8px rgb(40 40 40 /0.2);
}
.pic{
    background-color: #e5e5e5;
    border-radius: 8px;
    width: 100px;
    height: 95px;
    box-shadow: 0px 1px 8px rgb(40 40 40 /0.2);
    margin-right: 10px;
}
.content{
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
</style>
