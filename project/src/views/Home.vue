<template>
  <div class="home">
    <Drawer :class="{'active':flag}" @changeFlag="change"/>
    <main ref="main">
      <div>
        <div v-for="(item,index) in homeData" :key="index">
          <div key="{item.id}" ref="list">
            <h4>{{item.code}}</h4>
            <div class="dlList">
              <dl v-for="(el) in item.list" :key="el.Spelling" @click="gotoD(el.MasterID)">
                <dt>
                  <img :src="el.CoverPhoto" alt>
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
      <li v-for="(item,index) in slideList" :key="item" @click="scrollto(index)">{{item}}</li>
    </ul>
    <Loading v-show="isLoding"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import BScroll from "better-scroll";
import Drawer from "../components/Drawer";
import Loading from "../components/Loading";

export default {
  name: "home",
  data() {
    return {
      flag: false,
      isLoding: true
    };
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
    let data = await this.dataActions();
    console.log(data);
    if (data.code == 1) {
      this.isLoding = false;
    }
  },
  mounted() {
    this.bs = new BScroll(this.$refs.main, {
      probeType: 3,
      click: true
    });
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
  main {
    width: 100%;
    height: 100%;
    overflow: hidden;
    > div {
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
@keyframes draw {
  from {
    right: -70%;
  }
  to {
    right: 0%;
  }
}
.drawer-box {
  position: fixed;
  top: 0;
  right: -70%;
  z-index: 9999;
  &.active {
    animation: draw 1s forwards;
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

