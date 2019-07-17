<template>
  <div class="quotationList">
      <ul>
        <li :class="{'active':item.addActive}" v-for="(item, index) in list" :key="index" @click='changeActive(index)'>
            <p>
                <span>{{item.dealerShortName}}</span>
                <span class="color">{{item.price}}万</span>
            </p>
            <p>
                <span>{{item.address}}</span>
                <span>售{{item.saleRange}}</span>
            </p>
        </li>
    </ul>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return {

        }
    },
    props:['list'],
    methods:{
      ...mapMutations({
          changeActiveMu:'quotation/changeActiveMu'
      }),
      changeActive(ind){
          this.changeActiveMu(ind)
      }
    }
}
</script>
<style lang="scss" scope>
.quotationList>ul{
    li{
         &.active:before{
            background: #3aacff;
            border:none;
        }
    }
}
</style>