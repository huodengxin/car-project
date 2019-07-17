<template>
    <div class="car-img">
        <div class="tit">
            <p>
                <span>颜色</span>
            </p>
            <p>
                <span>车款</span>
            </p>
        </div>
        <ul class="imgBox" v-for="(item,index) in imgList" :key="index">
            <li v-for="(val,indx1) in item.List" :key='indx1'>
                <img src="" :style="{backgroundImage:'url('+val.Url+')'}"/>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
           imgList:state=>state.myImg.imgList 
        })
    },
    methods:{
        ...mapActions({
            imgActions:'myImg/imgActions'
        })
    },
    created(){
        this.imgActions(this.$route.params.SerialID)
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
    .car-img{
        width: 100%;
        height: 100%;
        background: #f4f4f4;
        .tit{
            width: 100%;
            height: .8rem;
            display: flex;
            align-items: center;
            background: #fff;
            p{
                flex:1;
                text-align: center;
                box-sizing:border-box;
                color:#454545;
                display: inline-block;
                &:after{
                    content: "";
                    display: inline-block;
                    padding-top: .16rem;
                    padding-right: .16rem;
                    border-top: 2px solid #ccc;
                    border-right: 2px solid #ccc;
                    transform: rotate(135deg);
                    margin-left: .2rem;
                    vertical-align: 5%;
                }
                span{
                    font-size:.28rem;

                }
               
            }
        }
        .imgBox{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li{
                height: 123px;
                width: 33%;
                img{
                    width:100%;
                    height:100%;
                    background-size:cover
                }
            }
        }
    }
</style>