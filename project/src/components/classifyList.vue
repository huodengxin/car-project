<template>
  <div class="list">
    <div v-for="(val,ind) in newList" :key="ind">
           <p class="title">{{val.index}}</p>
    <ul class="lis" v-for="(item,index) in val.list" :key="index">
      <li>
        <p>{{item.market_attribute.year}}款 {{item.car_name}}</p>
        <p>{{item.horse_power}}马力{{item.gear_num}}档{{item.trans_type}}</p>
        <p>
          <span>指导价 {{item.market_attribute.official_refer_price}}</span>
          <span>{{item.market_attribute.dealer_price_min}}起</span>
        </p>
        <button :data-id="item.car_id" data-hover="hover" @click='jump(item.car_id)'>询问底价</button>
      </li>
    </ul>
    </div>
   
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      newList: state => state.car.newList
    })
  },
  methods: {
    jump(carId){
      this.$router.push({name:'quotation',params:{carId}})
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.list {
  background: #fff;
  .title {
    padding: 0 10px;
    //padding: 0 .2rem;
    //height: .5rem;
    height: 30px;
    line-height: 30px;
    //font-size: .26rem;
    font-size: 13px;
    color: #999;
    background: #f4f4f4;
    box-sizing: border-box;
  }
  .lis {
    li {
      background: #fff;
      border-bottom: 10px solid #f4f4f4;
      box-sizing: border-box;
      button {
        border: none;
        border-top: 1px solid #eee;
        width: 100%;
        //height: .8rem;
        height: 40px;
        font-size: 17px;
        color: #00afff;
        background: #fff;
        margin-left: -0.3rem;
      }
    }
    li p:first-child {
      padding: 10px;
      font-size: 16px;
      color: #3d3d3d;
      box-sizing: border-box;
    }
    li p:nth-child(2) {
      font-size: 13px;
      color: #bdbdbd;
      padding: 0 10px;
      box-sizing: border-box;
    }
    li p:nth-child(3) {
      text-align: right;
      padding: 5px 10px;
      box-sizing: border-box;
      span:first-child {
        color: #818181;
        font-size: 13px;
      }
      span:nth-child(2) {
        color: #f00;
        font-size: 15px;
      }
    }
  }
}
</style>