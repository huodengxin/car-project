<template>
  <div class="quotationList">
    <ul>
      <li class v-for="(item, index) in list" :key="index">
        <p>
          <span>{{item.dealerShortName}}</span>
          <span class="color">{{item.price}}万</span>
        </p>
        <p>
          <span>{{item.address}}</span>
          <span>售{{item.saleRange}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["list"]
};
</script>
<style lang="scss" scope>
.quotationList > ul {
  li {
    &.active:before {
      background: #3aacff;
      border: none;
    }
  }
}
</style>