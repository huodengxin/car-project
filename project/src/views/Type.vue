<template>
    <div class="typeView">
        <div class="type-top">
            <span v-for="(item,index) in yearArr" 
              :key="index" 
              @click="chengeList(item,index)" 
              :class="{active:ind==index}">{{item}}</span>
        </div>
        <div class="type-bottom">
            <div v-for="(val,ind) in newList" :key="ind" class='list'>
               <p class="tip">{{val.index}}</p>
                <ul  v-for="(item,index) in val.list" :key="index">
                    <li @click='jumpPuotation'>
                        <p>
                            <span>{{item.market_attribute.year}}款 {{item.car_name}}</span>
                            <span class="color">{{item.market_attribute.dealer_price_min}}起</span>
                        </p>
                        <p>
                            <span>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</span>
                            <span>指导价 {{item.market_attribute.official_refer_price}}</span>
                        </p>
                    </li>
                </ul>
            </div>
       </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            ind:0
        }
    },
    computed:{
        ...mapState({
            newList: state => state.car.newList,
            yearArr:state=>state.car.yearArr.slice(1)
        })
    },
    methods:{
        ...mapMutations({
            changeYear:'car/changeYear'
        }),
        chengeList(item,index){
            this.changeYear(item)
            this.ind=index;
        },
        jumpPuotation(){
            this.$router.push({name:'quotation'})
        }
    }
}
</script>
<style lang="scss" scoped>
.typeView{
    width:100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .type-top{
        width:100%;
        height:38px;
        line-height: 38px;
        padding-left: 10px;
        box-sizing: border-box;
        span{
            margin-right: 20px;
            float: left;
        }
        .active{
            color: #3aacff;
        }
    }
     .type-bottom{
        .tip{
            height: 20px;
            width:100%;
            background:#eee;
            line-height: 20px;
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 13px;
            color:#aaa;
        }
        ul{
            li{
                height:62px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding:0 10px;
                border-bottom: 1px solid #eee;
                p{
                    flex:1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    .color{
                        color:crimson;
                    }
                    &:last-child{
                        font-size: 14px;
                        color:#ccc;
                    }
                }
            }
        }
    }
}
</style>
