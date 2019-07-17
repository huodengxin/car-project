<template>
    <div class="top">
        <span  v-for="(item,index) in yearArr" :key="index" @click="chengeList(item,index)" :class="{active:ind==index}">{{item}}</span>
    </div> 
</template>
<script>
import {mapState,mapMutations} from "vuex"
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            ind:0
        }
    },
    computed:{
        ...mapState({
            yearArr:state=>state.car.yearArr,
        })
    },
    methods:{
        ...mapMutations({
            changeYear:'car/changeYear'
        }),
        chengeList(item,index){
            this.changeYear(item)
            this.ind=index;
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.top{
    //border-top: .15rem solid #f4f4f4;
    border-top: 10px solid #f4f4f4;
    //padding: 0 .3rem;
    padding: 0 10px;
    //font-size: .32rem;
    font-size: 17px;
    //height: .77rem;
    height: 50px;
    line-height: 50px;
    background: #fff; 
    box-sizing: border-box; 
    span{
         padding-right: 20px;
        }
}
.active{
    color: #3aacff;
}
</style>