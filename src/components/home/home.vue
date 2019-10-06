<template>
  <div class="home">
    <Header></Header>
    <div class="slider-wrapper-wrapper">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends" :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
    </div>
    <Menu></Menu>
    <Newstory></Newstory>
    <Excellentstory></Excellentstory>
  </div>
</template>

<script>
  import Header from 'components/header/header'
  import Menu from 'components/menu/menu'
  import Newstory from 'components/new-story/new-story'
  import Excellentstory from 'components/excellent-story/excellent-story'
  import Slider from 'base/slider/slider'
  import {getHome} from 'api/slider'
  // import {getExcelentStory} from 'api/story'
  import {ERR_OK} from 'api/config'
  // import {createStory} from 'common/js/story'

  export default {
    watch: {
      data () {
        this.setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    data () {
      return {
        recommends: [],
        songList: []
      }
    },
    created () {
      this._getHome()
      // this._getExcelentStroy()
    },
    components: {
      Header,
      Slider,
      Menu,
      Newstory,
      Excellentstory
    },
    methods: {
      _getHome () {
        getHome().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.recommends = res.data
          }
        })
      },
      // _getExcelentStroy () {
      //   console.log('fff')
      //   getExcelentStory().then((res) => {
      //     if (res.code === ERR_OK) {
      //       console.log(res)
      //       console.log(this._normalizeSongs(res.data))
      //     }
      //   })
      // },
      // _normalizeSongs(list) {
      //   let ret = []
      //   list.forEach((item) => {
      //     ret.push(createStory(item))
      //   })
      //   return ret
      // },
      loadImage () {
        if (!this.checkloaded) {
          this.checkloaded = true
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home
    /*position: fixed*/
    width: 100%
    top: 0
    bottom: 0
    /*touch-action: none*/
    /*background #fff*/

    .slider-wrapper-wrapper
      /*background: red*/
      margin-top 60px
      margin-left 10px
      margin-right 10px
      height: 100%
      overflow: hidden

      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
        border-radius 10px
</style>
