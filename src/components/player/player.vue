<template>
  <div class="player"  v-show="playlist.length>0">
    <transition name="mini">
      <div class="mini-player" v-show="!fullscreen" @click="open">
        <div class="mini-box-container">
          <div class="left">
            <img :src="currentSong.image" class="left-image">
            <div class="left-title"></div>
          </div>
          <div class="right">
            <span @click.stop="togglePlaying" :class="miniIcon"></span>
            <span @click.stop="next" class="font_ligen i-miniplayer-next xys"></span>
            <span class="font_ligen i-list "></span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="normal">
      <div class="normal-player" v-show="fullscreen">
        <div class="image-wrapper">
          <img :src="currentSong.image">
        </div>
        <div class="progress-bar-container">
          <ProgressBar :percent="percent"  @percentChange="onProgressBarChange"></ProgressBar>
        </div>
        <div class="time-wrapper">
          <div class="current-time">{{format(currentTime)}}</div>
          <div class="total-time">{{format(currentSong.duration)}}</div>
        </div>
        <div class="control-wrapper">
          <span :class="iconMode" @click="changeMode"></span>
          <div class="icon"  :class="disableCls">
            <span @click="prev" class="font_ligen icon-step-backward "></span>
          </div>
          <span @click="togglePlaying" :class="playIcon"></span>
          <div class="icon"  :class="disableCls">
            <span @click="next" class="font_ligen icon-step-forward "></span>
          </div>
          <span class="font_ligen icon-aixin_ bfms"></span>
        </div>
        <div class="btn_back" @click="back">返回收听好故事</div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url"
           @timeupdate="updateTime"
           @canplay="ready"
           @ended="end"
    ></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import {playMode} from '../../common/js/config'
  import {shuffle} from '../../common/js/util'
  export default {
    data () {
      return {
        songReady: false,
        currentTime: 0,
        radius: 32
      }
    },
    computed: {
      playIcon () {
        return this.playing ? 'font_ligen i-icon-player-pause bofang' : 'font_ligen i-icon-player-play bofang'
      },
      miniIcon () {
        return this.playing ? 'font_ligen i-mini-fm-playing ' : 'font_ligen i-mini-fm-play '
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      iconMode() {
        return this.mode === playMode.sequence ? 'font_ligen i-list-looping bfms' : this.mode === playMode.loop ? 'font_ligen i-single-cycle bfms' : 'font_ligen i-loop bfms'
      },
      ...mapGetters([
        'fullscreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ])
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
        // dom 延时
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing (newPlaying) {
        const audio = this.$refs.audio
        // console.log(this.currentSong)
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    methods: {
      open () {
        this.setFullScreen(true)
      },
      back () {
        this.setFullScreen(false)
      },
      togglePlaying () {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      },
      next () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      prev () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      ready () {
        this.songReady = true
      },
      format (interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      onProgressBarChange(percent) {
        this.$refs.audio.currentTime = this.currentSong.duration * percent
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      changeMode() {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
          console.log(list)
        } else {
          list = this.sequenceList
        }
        this.resetCurrenIndex(list)
        this.setPlayList(list)
      },
      resetCurrenIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    components: {
      ProgressBar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .player
    .mini-player
      position fixed
      width 100%
      height: 80px
      z-index: 100
      background-color: #e5e2d9
      bottom 90px
      opacity: 0.95

      .mini-box-container
        width: 100%
        height: 80px
        position: relative
        /*padding: 5px 10px 10px 10px*/
        display: flex
        align-items: center
        justify-content: space-between
        z-index: 1
        overflow: hidden
        -webkit-box-pack: justify
        background #e5e2d9

        .left
          display: flex
          align-items: center
          justify-content: flex-start
          -webkit-box-pack: start
          -webkit-justify-content: flex-start
          -moz-box-pack: start
          -ms-flex-pack: start
          /*background blue*/

          .left-image
            width: 70px
            height: 70px
            border-radius: 1px
            margin-left: 70px

        .right
          font-size: 50px
          color: #d08d11
          /*text-overflow: ellipsis*/
          white-space: nowrap
          justify-content: flex-end
          align-items: center

          .xys
            font-size: 50px

          span
            margin-right 36px

    .normal-player
      width: 100%
      background-color: #e0dcd1
      position: fixed
      /*left: 0*/
      /*right: 0*/
      top: 0
      bottom: 0
      z-index: 150
      overflow: auto

      .image-wrapper
        /*background-color rebeccapurple*/
        height: 60%
        margin-top 80px
        display: flex
        align-items center
        justify-content center

        img
          width 86%
          height 86%
          border-radius 20px

      .text-wrapper1
        //background-color rebeccapurple
        height: 130px
        display: flex
        margin-top 10px
        justify-content center

        span
          font-size: 40px
          letter-spacing: 20px
          /*color #d08d11*/
          color: #333333

      .control-wrapper
        display: flex
        align-items center
        justify-content space-between
        padding-left 60px
        padding-right 60px
        margin-top 30px
        .icon
          font-size: 70px
          color: #333333
          &.disable
            color: #9b9b9b

        .bofang
          font-size: 100px
          color: #333333

        .zanting
          font-size: 70px
          color: #333333

        .bfms
          font-size: 50px
          color: #333333

      .time-wrapper
        display: flex
        justify-content: space-between
        align-items: center
        width: 86%
        margin: 0 auto
        font-size: 20px
        margin-top -10px
        color: #333333

      .btn_back
        text-align: center
        vertical-align baseline
        width: 86%
        background: #ffac2d
        height: 80px
        color: #fff
        display: flex
        margin: 0 auto
        margin-top 130px
        align-items center
        justify-content center
        border-radius 12px
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s

        .image-wrapper
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .control-wrapper
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .progress-bar-container
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .time-wrapper
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .btn_back
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .image-wrapper
          transform: translate3d(0, 100px, 0)
        .control-wrapper
          transform: translate3d(0, 100px, 0)
        .progress-bar-container
          transform: translate3d(0, 100px, 0)
        .time-wrapper
          transform: translate3d(0, 100px, 0)
        .btn_back
          transform: translate3d(0, 100px, 0)
</style>
