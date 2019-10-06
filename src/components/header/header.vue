<template>
  <div class="m-header">
    <div class="message">
      <a>
        <span class="font_ligen icon-lingdang-xianxing message_zdy" ></span>
      </a>
    </div>
    <div  class="search">
      <span class="font_ligen  iconsousuo search_zdy" ></span>
      <input>
    </div>
    <div class="menu">
      <a >
        <span class="font_ligen iconliebiao-dian menu_zdy" ></span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .m-header
    position: fixed
    height: 60px
    width: 100%
    text-align: center
    left: 0
    top: 0
    display flex
    align-items:center
    justify-content center
    z-index:10
    background #CDC6B4
    /*background silver*/
    .message
      margin-right 10px
      display flex
      text-align center
      .message_zdy
        color: #fff
        font-size:35px
    .search
      width:80%
      height 60%
      position relative
      display flex
      align-items:center
      justify-content center
      input
        width:100%
        height:100%
        border-radius 10px
        background #E0DCD1
      .search_zdy
        position absolute
        color: #fff
        right:14px
        top:7px
        font-size:30px
    .menu
      display flex
      align-items center
      justify-content center
      margin-left 10px
      .menu_zdy
        color: #fff
        font-size:40px

</style>
