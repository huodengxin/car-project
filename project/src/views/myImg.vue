<template>
  <div class="car-img">
    <div class="tit" v-show="!imgNewList.length">
      <p>
        <span @click="gotoMyColor">{{this.title}}</span>
      </p>
      <p>
        <span @click="gotoType">车款</span>
      </p>
    </div>
    <div v-if="!imgNewList.length">
      <ul class="imgBox" v-for="(item,index) in imgList" :key="index">
        <li v-for="(val,indx1) in item.List" :key="indx1" @click="changeImg(index,indx1)">
          <img src :style="{backgroundImage:'url('+val.Url+')'}">
          <div class="box" v-if="indx1===0">
            <p>{{item.Name}}</p>
            <p>{{item.Count}}张></p>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="imgNewList.length&&!flag">
      <ul class="imgBox">
        <li v-for="(item,index) in imgNewList" :key="index" @click="gotoSwiper(index)">
          <img src :style="{backgroundImage:'url('+item.Url+')'}">
        </li>
      </ul>
    </div>
    <div class="swiper-Box" v-show="flag" @click="flag=false">
      <div class="swiper-container swiperBox" ref="swiperBox">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in imgNewList" :key="index">
            <li>
              <img :src="item.Url" alt>
            </li>
          </div>
        </div>
      </div>
      <span>{{ind}}/{{Count}}</span>
      <button class="btn">询最低价</button>
    </div>
    <div v-if="!imgList.length">
      <p>还没有内容</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Swiper from "swiper";
import { nextTick } from "q";
export default {
  props: {},
  components: {},
  data() {
    return {
      title: "",
      flag: false,
      ind: ""
    };
  },
  computed: {
    ...mapState({
      imgList: state => state.myImg.imgList,
      imgNewList: state => state.myImg.imgNewList,
      Count: state => state.myImg.Count
    })
  },
  methods: {
    ...mapActions({
      changeImgs: "myImg/changeImgs"
    }),
    gotoMyColor() {
      let SerialID = this.$route.params.SerialID;
      this.$router.push({ name: "myColor", params: { SerialID } });
    },
    gotoType() {
      this.$router.push({ name: "type" });
    },
    changeImg(index, indx1) {
      let SerialID = this.$route.params.SerialID;
      let ImageID = this.imgList[index].Id;
      this.changeImgs({
        SerialID,
        ImageID,
        Page: 1,
        PageSize: 30
      });
      if (!indx1) {
        this.flag = false;
      } else {
        this.flag = true;
        this.mySwiper(indx1);
      }
    },
    mySwiper(ind) {
      this.ind = ind;
      const that = this;
      that.$nextTick(() => {
        this.bswiper = new Swiper(that.$refs.swiperBox, {
          on: {
            slideChangeTransitionEnd: function() {
              that.ind = this.activeIndex + 1;
            }
          }
        });
      });
      this.bswiper.slideTo(ind, 1);
    },
    gotoSwiper(ind) {
      this.flag = true;
      this.mySwiper(ind);
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
  .swiperBox {
    width: 100%;
    height: 100%;
    background: #000;
    li {
      height: 100%;
      width: 100%;
      display: flex;
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
  }
  .swiper-Box {
    width: 100%;
    height: 100%;
    span {
      position: absolute;
      bottom: 10px;
      color: #fff;
      z-index: 1;
      left: 50%;
      font-size: 0.24rem;
    }
    .btn {
      position: absolute;
      bottom: 10%;
      font-size: 0.24rem;
      padding: 0.08rem 0.15rem;
      right: 0.1rem;
      bottom: 0.1rem;
      background-color: #3aacff;
      border: none;
      z-index: 1;
      color: #fff;
    }
  }
}
</style>