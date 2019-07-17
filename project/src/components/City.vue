<template>
  <div class="city">
    <div class="location">
      <p class="tip">自动定位</p>
      <p @click="getAddress(locationId,location)">{{location}}</p>
    </div>
    <div class="list">
      <p class="tip">省市</p>
      <ul>
        <li v-for="(item) in addressArr" :key="item.CityID" @click="drawFn">{{item.CityName}}</li>
      </ul>
    </div>
    <Citycontent v-show="conFlag" :addressConList="addressConList" @showDraw="showDrawFn"/>
  </div>
</template>
<script>
import Citycontent from "../components/Citycontent";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  props: ["addressArr", "carId"],
  data() {
    return {
      conFlag: false
    };
  },
  computed: {
    ...mapState({
      addressConList: state => state.quotation.addressConList,
      location: state => state.quotation.location,
      locationId: state => state.quotation.locationId
    })
  },
  components: {
    Citycontent
  },
  methods: {
    ...mapActions({
      addressConActions: "quotation/addressConActions"
    }),
    drawFn() {
      this.conFlag = true;
      this.addressConActions({
        provinceid: 1,
        _1563328028250: ""
      });
    },
    showDrawFn() {
      this.conFlag = false;
    },
    getAddress(CityID, CityName) {
      this.$bus.$emit("getAddressFn", CityID, CityName);
    }
  }
};
</script>
<style lang="scss" scoped>
.city {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #fff;
  z-index: 999;
  .tip {
    height: 20px;
    width: 100%;
    background: #eee;
    line-height: 20px;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 13px;
    color: #aaa;
  }
  .location {
    width: 100%;
    & p:last-child {
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      padding-left: 20px;
    }
  }
  .list {
    ul {
      li {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
        position: relative;
        border-bottom: 1px solid #eee;
        margin-left: 10px;
        &:after {
          content: "";
          display: inline-block;
          padding-top: 0.16rem;
          padding-right: 0.16rem;
          border-top: 1.5px solid #ccc;
          border-right: 1.5px solid #ccc;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          position: absolute;
          right: 0.26rem;
          top: 14px;
        }
      }
    }
  }
}
</style>
