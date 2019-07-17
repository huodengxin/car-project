<template>
  <div class="drawer-box" @click="$emit('changeFlag')">
    <div v-for="(item,index) in drawerData" :key="index" class="box">
      <p class="title">{{item.GroupName}}</p>
      <dl v-for="(val,index1) in item.GroupList" :key="index1" @click="gotoCar(val)">
        <dd>
          <img :src="val.Picture" alt>
        </dd>
        <dt>
          <p class="name">{{val.AliasName}}</p>
          <p class="price">{{val.DealerPrice}}</p>
        </dt>
      </dl>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      drawerData: state => state.draw.drawerData
    })
  },
  methods: {
    gotoCar(val) {
      this.$router.push({ name: "car", params: { id: val.SerialID } });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.drawer-box {
  width: 70%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  overflow-y: auto;
  box-sizing: border-box;
  .box {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    .title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 17px;
      color: #717171;
      background: #f2f2f2;
      padding: 0 10px;
      box-sizing: border-box;
    }
    dl {
      display: flex;
      padding: 5px;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
      dd {
        margin-right: 5px;
        img {
          width: 90px;
          height: 60px;
        }
      }
      .name {
        color: #5f687a;
        font-size: 18px;
      }
      .price {
        color: #f00;
        font-size: 15px;
      }
    }
  }
}
</style>