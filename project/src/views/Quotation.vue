<template>
    <div>
        <p ref='header'>可向多个商家咨询最低价，商家及时回复<img src="http://h5.chelun.com/2017/official/img/icon-help.png" alt=""></p>
        <main class="quotationMain" ref='main'>
          <div v-for="(item, index) in quotationData" :key="index">
            <dl @click='jumpType'>
                <dt>
                    <img :src="item.details.serial.Picture" alt="">
                </dt>
                <dd>
                    <h5>{{item.details.serial.AliasName}}</h5>
                    <p>{{item.details.market_attribute.year}} {{item.details.car_name}}</p>
                </dd>
            </dl>
            <div class="self-info">
                <p class="tip">个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span>
                        <input type="text" maxlength='4' placeholder="输入你的真实中文姓名" v-model="user">
                    </li>
                     <li>
                        <span>手机</span>
                        <input type="text" placeholder="输入你的真实手机号码" maxlength='11' v-model="iphone">
                    </li>
                     <li>
                        <span>城市</span>
                        <span class="city" @click='getAddress'>{{CityName}}</span>
                    </li>
                </ul>
                <div class="quotation">
                    <button @click="clickMask">
                        询最低价
                    </button>
                </div>
            </div>
            <div class="dealer-info" ref="dealer">
                <p class="tip">选择报价经销商</p>
                <QuotationList :list='item.list'/>
            </div>
          </div>
        </main>
        <footer v-show="flag">
            <button @click="clickMask">
                询最低价
            </button>
        </footer>
        <my-City v-show="addressFlag" :addressArr='addressList' :carId='$route.query.carId'/>
        <my-Mask v-show="showMask" @emitMack='emitshowMask'>
            <p>{{text}}</p>
        </my-Mask>
        <Loading v-show="isLoading" />
        <mySuccess v-show="successFlag" @successEmit='successEmitFn'/>
    </div>
</template>
<script>
import myMask from '../components/Mask'
import myCity from '../components/City'
import mySuccess from '../components/Success'
import QuotationList from '../components/QuotationList'
import Loading from '@/components/Loading'
import {mapActions,mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            text:'请输入真实的中文姓名',
            flag:false,
            showMask:false,
            addressFlag:false,
            isLoading: true,
            successFlag:false,
            user:'',
            iphone:''
        }
    },
    components:{
        myMask,
        QuotationList,
        myCity,
        Loading,
        mySuccess
    },
    computed:{
        ...mapState({
            quotationData:state=>state.quotation.quotationData,
            cityId:state=>state.quotation.cityId,
            addressList:state=>state.quotation.addressList,
            CityName:state=>state.quotation.CityName,
            locationId:state=>state.quotation.locationId,
            dealerIdStr:state=>state.quotation.dealerIdStr
        })
    },
    async created(){
        let data=await this.dataActions({
            carId:localStorage.getItem('carId'),
            cityId:this.cityId,
            _1563275336259:null
        })
         if(data.code==1){
            this.isLoading=false;
            this.addressActions();
            this.$bus.$on('getAddressFn',(CityID,CityName)=>{
                this.addressFlag=false
                this.cityMu({
                    CityID:CityID,
                    CityName:CityName
                })
                this.dataActions({
                    carId:localStorage.getItem('carId'),
                    cityId:CityID,
                    _1563275336259:null
                })
            })
         }
    },
    mounted(){
        this.$refs.main.addEventListener('scroll', this.handleScroll)
    },
    methods:{
         ...mapActions({
             dataActions:'quotation/dataActions',
             addressActions:'quotation/addressActions',
             submitActions:'quotation/submitActions'
         }),
        ...mapMutations({
            cityMu:'quotation/cityMu'
        }),
        handleScroll () {
            var scrollTop = this.$refs.main.scrollTop;
            if(scrollTop+30<=350){
                this.flag=false
            }else{
                this.flag=true
            }
        },
        async clickMask(){
            //姓名 手机号验证
           var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
           var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
           if (!nameReg.test(this.user)||!phoneReg.test(this.iphone)) {
              this.showMask=true
           }else{
               if(this.quotationData[0].list.length==0){
                   this.text='请先选择报价经销商';
                   this.showMask=true;
                   return 
               }
              let data=await this.submitActions({
                   carid:localStorage.getItem('carId'),
                   mobile:this.iphone,
                   dealerids:this.dealerIdStr,
                   location:this.CityName,
                   carname:`${this.quotationData[0].details.market_attribute.year}${this.quotationData[0].details.car_name}`,
                   locationid:this.locationId,
                   name:this.user
               })
               if(data.code==1){
                   this.successFlag=true
               }
           }
        },
        successEmitFn(){
            this.successFlag=false
        },
        emitshowMask(){
            this.showMask=false
        },
        getAddress(){
            this.addressFlag=true;
        },
        //跳转type页面
        jumpType(){
            this.$router.push({name:'type',query:{curId:localStorage.getItem('carId')}})
        }
    }
}
</script>
<style lang="scss" scope>
#app>div{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
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
    >p{
        width:100%;
        height:30px;
        background:#79cd92;
        line-height: 30px;
        color:#fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        img{
            width:15px;
            height:15px;
            margin-left: 5px;
        }
    }
    .quotationMain{
        flex:1;
        width:100%;
        overflow-y: auto;
        >div{
            >dl{
                width:100%;
                height:100px;
                display: flex;
                box-sizing: border-box;
                padding:10px 30px 0px 10px;
                position: relative;
                &:after{
                    content: "";
                    display: inline-block;
                    padding-top: .16rem;
                    padding-right: .16rem;
                    border-top: 2px solid #ccc;
                    border-right: 2px solid #ccc;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                    position: absolute;
                    right: .26rem;
                    top: .9rem;
                }
                img{
                    width:115px;
                    height:70px;
                    border:1px solid #eee;
                    margin-right: 10px;
                }
               dd{
                   height:90%;
                   display: flex;
                   flex-direction:column;
                    h5{
                        font-size: 16px;
                        font-weight: 400;
                        flex:1;
                        padding-top: 10px;
                    }
                    p{
                        font-size: 17px;
                        flex:1;
                    }
               }
            }
        }
    }
    .self-info{
        width:100%;
        height:220px;
        display: flex;
        flex-direction: column;
        ul{
            flex:1;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            li{
                flex:1;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;
                justify-content: space-between;
                input{
                    margin-left: 20px;
                    flex:1;
                    height:100%;
                    border:none;
                    outline: none;
                    text-align: right;
                }
                .city{
                    flex:1;
                    text-align: right;
                    &:after{
                        content: "";
                        display: inline-block;
                        padding-top: .16rem;
                        padding-right: .16rem;
                        border-top: 1px solid silver;
                        border-right: 1px solid silver;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                    }
                }
            }
        }
        .quotation{
            height:64px;
            width:100%;
            display: flex;
            justify-content: center;
            align-items: center;
            button{
                font-size: .32rem;
                color: #fff;
                width: 80%;
                background: #3aacff;
                height: .7rem;
                border:none;
                border-radius: .1rem;
            }
        }
    }
    .dealer-info{
        ul{
            li:before {
                content: "";
                display: inline-block;
                width: 0.32rem;
                height: 0.32rem;
                border-radius: 50%;
                border: 2px solid #ccc;
                box-sizing: border-box;
                position: absolute;
                left: 0.12rem;
                top: 50%;
                transform: translate3d(0, -50%, 0);
            }
            li.active:before {
                background: #3aacff;
                border: none;
            }
            li:after {
                content: "";
                display: inline-block;
                padding-top: 0.17rem;
                padding-right: 0.1rem;
                border: 2px solid #fff;
                transform: rotate(40deg) translate3d(0, -50%, 0);
                position: absolute;
                left: 0.12rem;
                border-left: none;
                border-top: none;
                top: 47%;
            }
            li{
                height:82px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 10px 10px 20px 40px;
                border-bottom: 1px solid #eee;
                position: relative;
                p{
                    flex:1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        &:first-child{
                            width:230px;
                        }
                    }
                    .color{
                        color:crimson;
                        font-size: 12px;
                    }
                    &:last-child{
                        font-size: 12px;
                        color:#ccc;
                    }
                }
            }
        }
    }
    footer{
        height:50px;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
            font-size: .32rem;
            color: #fff;
            width: 100%;
            background: #3aacff;
            height: 100%;
            border:none;
        }
    }
}
</style>