<template>
  <div class="cityContent" @click="$emit('showDraw')">
    <div>
      <ul>
        <li
          v-for="(item) in addressConList"
          :key="item.CityID"
          @click="getAddress(item.CityID,item.CityName)"
        >{{item.CityName}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["addressConList"],
  methods: {
    getAddress(CityID, CityName) {
      this.$bus.$emit("getAddressFn", CityID, CityName);
    }
  }
};
</script>
<style lang="scss" scoped>
.cityContent {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  > div {
    width: 70%;
    height: 100%;
    margin-left: 30%;
    overflow-y: auto;
    background: #fff;
    overflow-y: auto;
    box-sizing: border-box;
    ul {
      li {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 20px;
        position: relative;
        border-bottom: 1px solid #eee;
        margin-left: 10px;
      }
    }
  }
}
</style>
