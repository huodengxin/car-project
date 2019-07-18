<template>
  <div class="mask">
    <div>
      <slot></slot>
      <p @click="$emit('emitMack')">好</p>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scope>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  > div {
    width: 270px;
    height: 100px;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -50px;
    margin-left: -135px;
    p {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      &:last-child {
        border-top: 1px solid #ccc;
        color: blue;
      }
    }
  }
}
</style>