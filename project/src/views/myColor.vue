<template>
  <div class="color">
    <p class="title">全部颜色</p>
    <div class="box">
      <p>
        <span
          v-for="(value,key,index) in colorList"
          :key="index"
          :class="{active:index==ind}"
          @click="change(index,key)"
        >{{key}}</span>
      </p>
      <ul class="list">
        <li v-for="(item,index) in arr" :key="index" @click="gotoImgCar(item.ColorId)">
          <span :style="{backgroundColor:item.Value}"></span>
          {{item.Name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      ind: 0,
      arr: []
    };
  },
  computed: {
    ...mapState({
      colorList: state => state.myImg.colorList
    })
  },
  methods: {
    ...mapActions({
      colorActions: "myImg/colorActions",
      ColorCar: "myImg/ColorCar"
    }),
    change(ind, key) {
      this.ind = ind;
      this.arr = this.colorList[key];
    },
    gotoImgCar(ColorId) {
      this.ColorCar({
        SerialID: this.$route.params.SerialID,
        ColorId,
        _1563366250444: null
      });
    }
  },
  created() {
    this.colorActions(this.$route.params.SerialID);
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.color {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow: hidden;
  .title {
    margin: 0.15rem 0;
    font-size: 0.34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: 0.8rem;
    height: 0.8rem;
  }
  .box {
    p {
      margin-top: 0.15rem;
      padding-left: 0.2rem;
      font-size: 0.3rem;
      line-height: 0.76rem;
      height: 0.76rem;
      background: #fff;
      overflow-x: scroll;
      span {
        margin-right: 0.6rem;
      }
    }
    .list {
      margin-top: 0.15rem;
      padding: 0 0.2rem;
      overflow: hidden;
      background: #fff;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        float: left;
        width: 3.45rem;
        font-size: 0.32rem;
        line-height: 0.68rem;
        border: 1px solid #3aacff;
        box-sizing: border-box;
        margin: 0.2rem 0;
        border-radius: 0.05rem;
        span {
          display: inline-block;
          width: 0.4rem;
          height: 0.4rem;
          margin-left: 0.2rem;
          vertical-align: -12%;
        }
      }
    }
  }
  .active {
    color: #00afff;
  }
}
</style>