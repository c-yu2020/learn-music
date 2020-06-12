<template>
  <div class="music_voice_info">
    <a
      href="javascript:;"
      :class="[voicestatus?'music_voice_icon2':'music_voice_icon']"
      @click="Notvoice"
    ></a>
    <div class="music_voice_bar" ref="bar" @click="voicebar">
      <div class="music_voice_line" ref="line">
        <div class="music_voice_dot" ref="dot" @mousedown="voicedot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      barLeft: '',
      barWidth: '',
      dotLeft: '',
      audio: null,
      status: false,
      voicestatus: false
    }
  },
  methods: {
    voicebar (e) {
      if (!this.status) {
        // 直接获取到鼠标对应父容器当前位置
        this.barWidth = this.$refs.bar.clientWidth
        const progressbar = e.offsetX
        this.dotmove(progressbar)
        this.voiceUpData(progressbar)
      }
    },
    // voicedot (e) {
    //   if (e.which === 1) {
    //     this.status = true
    //     this.barLeft = this.$refs.bar.getBoundingClientRect().left
    //     this.barWidth = this.$refs.bar.clientWidth
    //   }
    // },
    // voicemove (e) {
    //   if (this.status) {
    //     this.dotLeft = e.clientX
    //     const progressbar = this.dotLeft - this.barLeft
    //     if (progressbar >= 0 && progressbar <= this.barWidth) {
    //       this.dotmove(progressbar)
    //       this.voiceUpData(progressbar)
    //     }
    //   }
    // },
    // voiceup (e) {
    //   this.dotmove()
    //   this.status = false
    // },
    // voiceover (e) {
    //   if (e.which === 0) {
    //     this.status = false
    //   }
    // },
    voicedot () {
      this.status = true
      this.barLeft = this.$refs.bar.getBoundingClientRect().left
      this.barWidth = this.$refs.bar.clientWidth
      const that = this
      document.onmousemove = function (e) {
        that.dotLeft = e.clientX
        const progressbar = that.dotLeft - that.barLeft
        if (progressbar >= 0 && progressbar <= that.barWidth) {
          that.dotmove(progressbar)
          that.voiceUpData(progressbar)
        }
      }
      document.onmouseup = function (e) {
        document.onmousemove = document.mouseup = null
        setTimeout(() => {
          that.status = false
        }, 200)
      }
    },
    dotmove (widthLeft) {
      this.$refs.line.style.width = widthLeft + 'px'
      this.$refs.dot.style.left = widthLeft + 'px'
    },
    // 控制声音大小
    voiceUpData (progressbar) {
      this.audio.volume = (progressbar / this.barWidth).toFixed(1)
    },
    Notvoice () {
      this.voicestatus = !this.voicestatus
      this.audio.muted = this.voicestatus
    }
  },
  mounted () {
    //   获取父元素的audio元素
    this.audio = this.$parent.$refs.audio
  }
}
</script>

<style scoped>
.music_voice_info {
  display: inline-block;
  width: 140px;
  height: 40px;
  position: relative;
  top: 10px;
}
.music_voice_info .music_voice_icon {
  width: 26px;
  height: 21px;
  background: url('../../assets/images/player.png') no-repeat 0 0;
  background-position: 0 -144px;
  position: absolute;
  left: 0px;
  top: 10px;
}
.music_voice_icon2 {
  width: 26px;
  height: 21px;
  background: url('../../assets/images/player.png') no-repeat 0 0;
  background-position: 0 -182px;
  position: absolute;
  left: 0px;
  top: 10px;
}
.music_voice_info .music_voice_bar {
  width: 100px;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  position: relative;
  left: 30px;
  top: 18px;
  cursor: pointer;
}

.music_voice_bar .music_voice_line {
  width: 50px;
  height: 100%;
  background: #fff;
}

.music_voice_line .music_voice_dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: -3px;
  left: 50px;
  cursor: pointer;
}
</style>
