<template>
  <div class="footer_in">
    <a href="javascript:;" class="music_pre" @click="music_pre()"></a>
    <a
      href="javascript:;"
      :class="[$store.state.playState ? 'music_play2' : 'music_play']"
      @click="foot_play"
    ></a>
    <a href="javascript:;" class="music_next" @click="music_next()"></a>
    <a href="javascript:;"></a>
    <div class="music_progress_info">
      <div class="music_progress_top">
        <span class="music_progress_name">{{ name != "" ? nameAndSinger : "" }}</span>
        <span class="music_progress_time">{{ currentTime != "" ? time : "" }}</span>
      </div>
      <div class="music_progress_bar" ref="bar" @click.prevent="bar">
        <div class="music_progress_line" ref="line">
          <div class="music_progress_dot" ref="dot" @mousedown.prevent="dotdown" draggable="true"></div>
        </div>
      </div>
    </div>
    <a
      href="javascript:;"
      :class="mode===0?'music_mode':mode===1?'music_mode2':mode===2?'music_mode3':'music_mode4'"
      @click="changemode"
    ></a>
    <a href="javascript:;" :class="fav===1?'music_fav':'music_fav2'" @click="musicfav"></a>
    <a href="javascript:;" class="music_down"></a>
    <a href="javascript:;" class="music_comment"></a>
    <a href="javascript:;" :class="only===1?'music_only':'music_only2'" @click="musiconly"></a>
    <voicebar />
    <audio src ref="audio" @timeupdate="timeupdata"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import voicebar from './foot/voicebar'
export default {
  components: {
    voicebar
  },
  props: {
    List: Array,
    Index: Number
  },
  data () {
    return {
      name: '',
      singer: '',
      dotstatus: false,
      barLeft: null,
      dotLeft: null,
      barWidth: null,
      currentTime: '',
      durationTime: '',
      ctime: '',
      dtime: '',
      mode: 0,
      fav: 1,
      only: 1
    }
  },
  methods: {
    // 播放
    music_play (items) {
      const audio = this.$refs.audio
      if (items.item === null && items.index === null) {
        audio.src = ''
      }
      if (this.musicIndex === items.index) {
        // paused返回如果不是暂停返回false 是暂停返回true
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
        }
      } else {
        this.$store.state.musicIndex = items.index
        audio.src = items.item.link_url
        audio.play()
      }
      // this.$emit('OneOrStopMusic', this.musicIndex)
    },
    foot_play () {
      this.$emit('OneOrStopMusic', this.musicIndex)
    },
    // 上一首
    music_pre () {
      this.$emit('musicPre')
    },
    // 下一首
    music_next () {
      this.$emit('musicNext')
    },
    bar (e) {
      if (!this.dotstatus) {
        // 直接获取到鼠标对应父容器当前位置
        this.barWidth = this.$refs.bar.clientWidth
        const progressbar = e.offsetX
        this.dotmove(progressbar)
        this.music_bar(progressbar, this.barWidth)
      }
    },
    dotdown () {
      // 改变状态
      this.dotstatus = true
      // this.dotstatus = true
      // 拿到bar元素与屏幕的距离
      this.barLeft = this.$refs.bar.getBoundingClientRect().left
      this.barWidth = this.$refs.bar.clientWidth
      const that = this
      document.onmousemove = function (e) {
        e.preventDefault()
        that.dotLeft = e.clientX
        const progressbar = that.dotLeft - that.barLeft
        if (progressbar >= 0 && progressbar <= that.barWidth) {
          that.dotmove(progressbar)
        }
      }
      document.onmouseup = function () {
        const progressbar = that.dotLeft - that.barLeft
        that.music_bar(progressbar, that.barWidth)
        document.onmousemove = document.mouseup = null
        setTimeout(() => {
          that.dotstatus = false
        }, 200)
      }
    },
    // 控制条
    dotmove (widthLeft) {
      this.$refs.line.style.width = widthLeft + 'px'
      this.$refs.dot.style.left = widthLeft + 'px'
    },
    timeupdata () {
      const audio = this.$refs.audio
      // 获取缓冲 视屏或音频的缓冲进度
      if (audio.buffered.length) {
        console.log(audio.buffered.start(0) + '---' + audio.buffered.end(0))
      }
      const barWidth = this.$refs.bar.clientWidth
      if (isNaN(audio.currentTime) || isNaN(audio.duration)) {
        return
      }
      this.ctime = audio.currentTime
      this.dtime = audio.duration
      this.currentTime = this.timechange(audio.currentTime)
      this.durationTime = this.timechange(audio.duration)
      // 进度条和音乐同步
      const widthLeft =
        (Number(audio.currentTime) / Number(audio.duration)) * Number(barWidth)
      // 移动时音乐正常播放
      if (this.dotstatus) {
        return
      }
      this.dotmove(widthLeft)
      if (widthLeft === barWidth && audio.currentTime === audio.duration) {
        this.music_next()
      }
    },
    // 音乐跟进度条同步
    music_bar (progressbar, barwidth) {
      if (this.playState) {
        this.$refs.audio.currentTime =
          (parseInt(progressbar) / parseInt(barwidth)) *
          parseInt(this.$refs.audio.duration)
      }
    },
    timechange (time) {
      if (isNaN(time)) {
        return null
      }
      const mtime =
        parseInt(time / 60) < 10
          ? '0' + parseInt(time / 60)
          : parseInt(time / 60)
      const stime =
        parseInt(time % 60) < 10
          ? '0' + parseInt(time % 60)
          : parseInt(time % 60)
      return `${mtime}:${stime}`
    },
    changemode () {
      if (this.mode === 3) {
        this.mode = 0
        return
      }
      this.mode++
    },
    musicfav () {
      if (this.fav === 2) {
        this.fav = 1
        return
      }
      this.fav++
    },
    musiconly () {
      if (this.only === 2) {
        this.only = 1
        this.$emit('musiconly', this.only)
        return
      }
      this.only++
      this.$emit('musiconly', this.only)
    }
  },
  watch: {
    musicIndex: {
      deep: true,
      handler: function (value) {
        this.name = this.List[value].name
        this.singer = this.List[value].singer
        this.overtime = this.List[value].time
      }
    },
    dotstatus: function (value) {
      if (value) {
        // 暂时暂停音乐等待拖动结束
      } else {
      }
    },
    ctime: function (value) {
      this.$parent.audiotime(value, this.dtime)
    },
    List: {
      deep: true,
      handler: function (value) {
        if (value.length === 0) {
          this.name = ''
          this.currentTime = ''
        }
      }
    }
  },
  computed: {
    ...mapState(['musicIndex', 'playState']),
    nameAndSinger: {
      get () {
        return `${this.name} / ${this.singer}`
      }
    },
    time: {
      get () {
        return `${this.currentTime} / ${this.durationTime}`
      }
    }
  },
  mounted () { }
}
</script>

<style scoped>
.footer_in {
  width: 100%;
  height: 100%;
}
.footer_in a {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background: url("../assets/images/player.png") no-repeat 0 0;
  margin-right: 2%;
}

.footer_in .music_pre {
  width: 19px;
  height: 20px;
  margin-right: 3%;
  background-position: 0 -30px;
}

.footer_in .music_play {
  width: 21px;
  height: 29px;
  background-position: 0 0;
  margin-right: 3%;
  vertical-align: -5px;
}

.footer_in .music_play2 {
  background-position: -30px 0;
  width: 21px;
  height: 29px;
  margin-right: 3%;
  vertical-align: -5px;
}

.footer_in .music_next {
  width: 19px;
  height: 20px;
  background-position: 0 -52px;
  margin-right: 2%;
}

.footer_in .music_progress_info {
  display: inline-block;
  width: 45%;
  height: 40px;
  position: relative;
  top: 10px;
}

.music_progress_info .music_progress_top {
  width: 100%;
  height: 30px;
  color: white;
}

.music_progress_top .music_progress_name {
  float: left;
  opacity: 0.5;
}

.music_progress_top .music_progress_time {
  float: right;
  opacity: 0.5;
}

.music_progress_info .music_progress_bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  position: relative;
  cursor: pointer;
}

.music_progress_bar .music_progress_line {
  width: 0;
  height: 100%;
  background: #fff;
  position: absolute;
}

.music_progress_line .music_progress_dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: -3px;
  left: 0;
  cursor: pointer;
}

.footer_in .music_mode {
  margin-left: 30px;
  width: 26px;
  height: 22px;
  background-position: 0 -205px;
}

.footer_in .music_mode2 {
  margin-left: 30px;
  width: 26px;
  height: 22px;
  background-position: 0 -260px;
}

.footer_in .music_mode3 {
  width: 26px;
  height: 22px;
  margin-left: 30px;
  background-position: 0 -74px;
}

.footer_in .music_mode4 {
  margin-left: 30px;
  width: 26px;
  height: 22px;
  background-position: 0 -232px;
}

.footer_in .music_fav {
  width: 24px;
  height: 21px;
  background-position: 0 -96px;
}

.footer_in .music_fav2 {
  width: 24px;
  height: 21px;
  background-position: -30px -96px;
}

.footer_in .music_down {
  width: 22px;
  height: 21px;
  background-position: 0 -120px;
}

.footer_in .music_comment {
  width: 24px;
  height: 24px;
  background-position: 0 -400px;
}

.footer_in .music_only {
  width: 74px;
  height: 27px;
  background-position: 0 -281px;
}

.footer_in .music_only2 {
  width: 74px;
  height: 27px;
  background-position: 0 -310px;
}
</style>
