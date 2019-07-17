<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  }
}
</script>
<style lang="scss">
*{
  margin:0;
  padding:0;
}
html,body{
  width:100%;
  height:100%;
}
#app {
   width:100%;
   height:100%;
   font-size: 16px;
}

</style>
