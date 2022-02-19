<template>
  <div>
      <m-header :style="{'position':'fixed','top':'0','z-index':'100'}"></m-header>
      <router-view :style="{'margin-top':'200px'}"></router-view>
      <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from '../common/MHeader'
import MFooter from '../common/MFooter.vue'
export default {
  components:{
    MHeader,
    MFooter
    } 
}
</script>

<style lang='scss' scoped>

</style>