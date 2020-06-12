<template>
  <div class="content">
    <div class="content_in">
      <section class="section" ref="left">
        <contentLeft
          :List="List"
          :playmusicurl="playmusicurl"
          :listMusicDel="listMusicDel"
          :changecheck="changecheck"
          @changecheck="changecheck"
          :delChecked="delChecked"
          :delall="delall"
        />
      </section>
      <aside class="aside" ref="aside">
        <asideright
          :List="List"
          :Index="musicIndex"
          :currenttime="currenttime"
          :durationtime="durationtime"
        />
      </aside>
    </div>
    <footer class="footer">
      <foot
        @OneOrStopMusic="OneOrStopMusic"
        ref="foot"
        :List="List"
        @musicPre="musicPre"
        @musicNext="musicNext"
        :Index="musicIndex"
        @musiconly="musiconly"
      />
    </footer>
    <!-- <audio ref="audio" src>
      <source src="http://127.0.0.1:9096/source/告白气球.mp3" type='audio/mp3' />
    </audio>-->
  </div>
</template>

<script>
import contentLeft from './content_left'
import asideright from './asideright'
import foot from './footer'
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      List: [],
      musicIndex: -1,
      currenttime: 0,
      durationtime: 0,
      delchecked: []
    }
  },
  components: {
    contentLeft,
    asideright,
    foot
  },
  methods: {
    // ...mapActions(['changeState']
    // ),
    // 获取音乐数据
    async getList () {
      const { data: res } = await this.axios.get('/music')
      this.List = res.data
      this.List.forEach((item) => {
        this.$set(item, 'state', false)
        this.$set(item, 'checked', false)
      })
    },
    // 拿到音乐列表中点击播放的音乐的mp3路径
    playmusicurl (index) {
      this.musicIndex = index
      this.OneOrStopMusic(index)
    },
    // 上一首
    musicPre () {
      this.musicIndex--
      if (this.musicIndex < 0) {
        this.musicIndex = this.List.length - 1
      }
      this.OneOrStopMusic(this.musicIndex)
    },
    // 下一首
    musicNext () {
      this.musicIndex++
      if (this.musicIndex > this.List.length - 1) {
        this.musicIndex = 0
      }
      this.OneOrStopMusic(this.musicIndex)
    },
    // 删除
    listMusicDel (index) {
      this.List.splice(index, 1)
      if (this.List.length === 1 || this.List.length === 0) {
        this.List = []
        this.$store.dispatch('indexReduce')
        this.$refs.foot.music_play({ item: null, index: null })
        this.styleChange(index)
      } else {
        if (index < this.musicIndex) {
          // this.$store.state.musicIndex = null
          this.musicIndex = this.List.findIndex(item => {
            return item.state === true
          })
        }
        if (index === this.musicIndex) {
          this.$store.dispatch('indexReduce')
          this.$refs.foot.music_play({ item: this.List[index], index: index })
          this.styleChange(index)
        }
      }
    },
    // 播放暂停或第一次播放
    OneOrStopMusic (index) {
      if (index === -2) {
        this.styleChange(0)
        this.$refs.foot.music_play({ item: this.List[0], index: 0 })
        this.musicIndex = 0
        return
      }
      this.styleChange(index)
      this.$refs.foot.music_play({ item: this.List[index], index: index })
    },
    // 播放样式
    styleChange (index) {
      this.List.forEach((item, i) => {
        if (i === index) {
          item.state = !item.state
          this.$store.dispatch('changeState', item.state)
          return
        }
        item.state = false
      })
    },
    changecheck (index) {
      if (index === -1) {
        this.List.forEach(item => {
          item.checked = true
        })
        return
      }
      if (index === -2) {
        this.List.forEach(item => {
          item.checked = false
        })
        return
      }
      this.List[index].checked = !this.List[index].checked
    },
    delChecked () {
      // this.List.forEach((item, index) => {
      //   if (item.checked === true) {
      //     this.delchecked.push(item)
      //     // console.log(index, item.checked)
      //     // this.listMusicDel(index)
      //   }
      // })
      this.List.find((item, index) => {
        if (item.checked === true) {
          this.listMusicDel(index)
          this.delChecked()
        }
      })
    },
    // 清空列表
    delall () {
      this.List = []
      const index = -2
      this.listMusicDel(index)
    },
    audiotime (ctime, dtime) {
      this.currenttime = parseFloat(ctime.toFixed(2))
      this.durationtime = parseFloat(dtime.toFixed(2))
    },
    musiconly (index) {
      if (index === 2) {
        this.$refs.left.style.width = 0 + '%'
        this.$refs.left.style.display = 'none'
        this.$refs.aside.style.width = 100 + '%'
      }
      if (index === 1) {
        this.$refs.left.style.width = 80 + '%'
        this.$refs.left.style.display = 'block'
        this.$refs.aside.style.width = 20 + '%'
      }
    }
  },
  watch: {
    List: {
      deep: true,
      handler: function (value) {
        if (value.length <= 0) {
          this.$store.state.playState = false
        }
      }
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
@media (min-width: 1100px) {
  .content {
    margin: 0 8%;
  }
}
@media (max-width: 1400px) {
  .content {
    margin: 0 6%;
  }
}
@media (max-width: 1450px) {
  .content {
    margin: 0 4%;
  }
}
@media (max-width: 1300px) {
  .content {
    margin: 0 2%;
  }
}
@media (max-width: 1190px) {
  .content {
    margin: 0;
    width: 1190px;
  }
}
.content {
  position: relative;
  height: 100%;
}
.content_in {
  display: flex;
  min-height: 328px;
  position: absolute;
  top: 11%;
  bottom: 18%;
  width: 100%;
}
.section {
  width: 80%;
}
.aside {
  padding-left: 50px;
  width: 20%;
}
.footer {
  height: 11%;
  width: 100%;
  position: absolute;
  bottom: 0%;
}
</style>
