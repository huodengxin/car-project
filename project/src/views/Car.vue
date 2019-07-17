<template>
  <div class="carBox">
    <div class="content">
      <div class="img" @click="gotoImg(obj.SerialID)">
        <img :src="obj.CoverPhoto" alt>
        <p class="count">{{obj.pic_group_count}}张照片</p>
      </div>
      <div class="info">
        <div class="left">
          <p class="money">{{dealer_price}}</p>
          <p class="price">指导价 {{official_refer_price}}</p>
        </div>
        <div class="right" @click='jump'>询问底价</div>
      </div>
      <div class="car-list">
        <classifyYear/>
        <classifyList/>
      </div>
    </div>
    <div class="footer">
      <p @click='jump'>询问底价</p>
      <p>本地经销商为你报价</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import classifyYear from "@/components/classifyYear";
import classifyList from "@/components/classifyList";
export default {
  props: {},
  components: {
    classifyYear,
    classifyList
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      obj: state => state.car.obj,
      dealer_price: state => state.car.dealer_price,
      official_refer_price: state => state.car.official_refer_price
    })
  },
  methods: {
    ...mapActions({
      carActions: "car/carActions",
      cityActions:'quotation/cityActions'
    }),
    jump(){
      this.$router.push({name:'quotation'})
    },
    gotoImg(SerialID){
      this.$router.push({name:'MyImg',params:{SerialID}})
    }
  },
  created() {
    this.carActions(this.$route.params.id);
    this.cityActions()
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.carBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content {
    width: 100%;
    flex: 1;
    overflow-y: scroll;
    .img {
      width: 100%;
      height: 165px;
      position: relative;
      .count {
        position: absolute;
        left: 75%;
        top: 75%;
        padding: 2px 8px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        border-radius: 15px;
        box-sizing: border-box;
        font-size: 12px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding: 20px 12px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .left {
        .money {
          font-size: .32rem;
          color: #f00;
        }
        .price {
          font-size: .26rem;
          color: silver;
        }
      }
      .right {
        width: 180px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3aacff;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    background: #3aacff;
    color: #fff;
    text-align: center;
  }
  .footer p:first-child {
    font-size: 16px;
    margin-top: 0.12rem;
  }
  .footer p:nth-child(2) {
    font-size: 14px;
  }
}
</style>