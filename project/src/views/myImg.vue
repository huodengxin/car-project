<template>
  <div class="car-img">
    <div class="tit">
      <p>
        <span @click="gotoMyColor">{{this.title}}</span>
      </p>
      <p>
        <span @click="gotoType">车款</span>
      </p>
    </div>
    <ul class="imgBox" v-for="(item,index) in imgList" :key="index">
      <li v-for="(val,indx1) in item.List" :key="indx1">
        <img src :style="{backgroundImage:'url('+val.Url+')'}">
        <div class="box" v-if="indx1===0">
          <p>{{item.Name}}</p>
          <p>{{item.Count}}张></p>
        </div>
      </li>
    </ul>
    <div v-if="!imgList.length">
      <p>还没有内容</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapState({
      imgList: state => state.myImg.imgList
    })
  },
  methods: {
    ...mapActions({}),
    gotoMyColor() {
      let SerialID = this.$route.params.SerialID;
      this.$router.push({ name: "myColor", params: { SerialID } });
    },
    gotoType() {
      this.$router.push({ name: "type" });
    }
  },
  created() {
    this.title = this.$route.params.title || "颜色";
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.car-img {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  .tit {
    width: 100%;
    height: 0.8rem;
    display: flex;
    align-items: center;
    background: #fff;
    p {
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      color: #454545;
      display: inline-block;
      &:after {
        content: "";
        display: inline-block;
        padding-top: 0.16rem;
        padding-right: 0.16rem;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        transform: rotate(135deg);
        margin-left: 0.2rem;
        vertical-align: 5%;
      }
      span {
        font-size: 0.28rem;
      }
    }
  }
  .imgBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      height: 123px;
      width: 33%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
      .box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(56, 90, 130, 0.5);
        color: #fff;
        font-size: 0.28rem;
        p:first-child {
          margin-top: 0.8rem;
        }
      }
    }
  }
}
</style>