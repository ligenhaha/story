<template>
  <div class="excellent-story-wrapper">
    <div class="aside">
      <img src="../../assets/7.png">
    </div>
    <div class="content">
      <div class="content-item" @click="selectItem(index)" v-for="(item,index) in storyList" :key="index">
        <img v-lazy="item.image">
        <div class="status_wrapper">
          <div class="status_item">
            <span class="font_ligen iconnice nice" style="color: seagreen"></span>
            <p>193</p>
          </div>
          <div class="status_item">
            <span class="font_ligen iconhot hot" style="color: red"></span>
            <p>250℃</p>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!storyList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
  import {getExcelentStory} from 'api/story'
  import {ERR_OK} from 'api/config'
  import {createStory} from 'common/js/story'
  import {mapActions} from 'vuex'
  import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        storyList: []
      }
    },
    created () {
      this._getExcelentStroy()
    },
    methods: {
      selectItem (index) {
        console.log(this.storyList)
        // this.insertSong({
        //   song: this.storyList[index]
        // })
        this.selectPlay({
          list: this.storyList,
          index
        })
      },
      _getExcelentStroy () {
        // console.log('fff')
        getExcelentStory().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res)
            // console.log()
            this.storyList = this._normalizeSongs(res.data)
            console.log(this.storyList)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          ret.push(createStory(item))
        })
        return ret
      },
      ...mapActions([
        'insertSong',
        'selectPlay'

      ])
    },
    components: {
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .excellent-story-wrapper
    display flex
    margin-left 15px
    margin-top 10px
    margin-right 55px
    margin-bottom 144px

    .aside
      img
        width 36px
        height 190px

    .content
      display flex
      flex-direction: row
      flex-wrap: wrap
      margin-left 10px
      margin-top 30px
      justify-content space-between
      align-items: center
      /*background aqua*/
      width 100%
      /*margin-right 20px*/

      .content-item
        margin-bottom 10px
        /*background  red*/
        width: 310px
        height 360px

        img
          width: 310px
          height 310px

        /*border-bottom-left-radius 10px*/
        /*border-bottom-right-radius 10px*/

        .status_wrapper
          background #E0DCD1
          margin-top -6px
          border-bottom-left-radius 10px
          border-bottom-right-radius 10px
          height 50px
          display flex
          flex-direction row
          align-items center
          padding-top 10px

          .status_item
            display flex
            flex-direction row
            flex 1
            justify-content center
            align-items center
            padding-top 10px
            padding-bottom 10px

            p
              margin-left 4px
              font-size 20px
              color #939393

            .nice
              font-size: 34px
              margin-right 5px
              color #939393

            .hot
              font-size: 24px
              margin-right 5px
              color #939393
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
