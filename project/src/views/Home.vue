<template>
  <div class="home">
       <Drawer :class="{'active':flag}" @changeFlag='change'/>
       <main ref='main'>
         <div>
            <div v-for="(item,index) in homeData" :key='index'>
              <div  key={item.id} ref='list'>
                <h4>{{item.code}}</h4>
                <div class="dlList">
                    <dl v-for="(el) in item.list" :key="el.Spelling" @click="gotoD(el.MasterID)">
                      <dt>
                        <img src="/loading.gif" :data-src='el.CoverPhoto' alt="" ref='img'>
                      </dt>
                      <dd>{{el.Name}}</dd>
                    </dl>
                </div>
              </div>
            </div>
         </div>
      </main>
      <ul class="fixed">
        <li>#</li>
        <li v-for="(item,index) in slideList" :key="item" @click='scrollto(index)'>{{item}}</li>
      </ul>
      <!-- <Loading v-show="isLoading"/> -->
      <img src="/骨架图.jpg" alt="" v-show="jpgFlag" class='jpg'>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapActions, mapState} from 'vuex'
import BScroll from 'better-scroll'
import Drawer from "../components/Drawer"
import Loading from "../components/Loading"
import LazyLoad from '../utils/lazyLoad.js'
import imitationShake from '../utils/optimization.js'
export default {
  name: "home",
  data() {
    return {
      flag:false,
      isLoading: true,
      jpgFlag:true
    }
  },
  components: {
    Drawer,
    Loading
  },
  computed: {
    ...mapState({
      slideList: state => state.home.slideList,
      homeData: state => state.home.homeData
    })
  },
  async created() {
    let data=await this.dataActions();
    if(data.code==1){
      // this.isLoading=false;
      this.jpgFlag=false;
      new LazyLoad(this.$refs.img)
    }
  },
  mounted() {
      this.bs=new BScroll(this.$refs.main,{
            probeType:3,
            click:true
      }),
      this.bs.on('scroll',pos=>{
         imitationShake(()=>{new LazyLoad(this.$refs.img,pos.y)})()
      })
  },
  methods: {
    ...mapActions({
      dataActions: "home/dataActions",
      drawerActions: "draw/drawerActions"
    }),
    scrollto(ind) {
      let el = this.$refs.list;
      this.bs.scrollToElement(el[ind], 500);
    },
    gotoD(id) {
      this.drawerActions(id);
      this.flag = true;
    },
    change() {
      this.flag = !this.flag;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  >.jpg{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 9999;
  }
  main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    >div {
      h4 {
        width: 100%;
        height: 30px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 30px;
        background: #eee;
        color: #ccc;
      }
      .dlList {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        dl {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          img {
            width: 45px;
            height: 45px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}

.drawer-box {
    position: fixed;
    top: 0;
    right: 0;
    width: 0;
    transition: all .2s ease;
    background: #fff;
    z-index: 100;
    height: 100%;
    box-shadow: 0 0 0.5rem #eee;
    &.active{
        width: 75%;
    }
}



.fixed {
  width: 20px;
  height: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 50%;
  right: 0;
  list-style-type: none;
  transform: translate(-50%, -50%);
}
.fixed li {
  flex: 1;
  color: #666;
  font-size: 14px;
}
</style>

