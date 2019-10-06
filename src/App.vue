<template>
  <div id="app">
    <router-view/>
    <Tabbar></Tabbar>
    <Player></Player>
  </div>
</template>

<script>
  import Tabbar from 'components/tabbar/tabbar'
  import Player from 'components/player/player'
  export default {
    components: {
      Tabbar,
      Player
    }
  }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/reset"
  #app {
  }
</style>
