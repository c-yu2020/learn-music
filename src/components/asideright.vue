<template>
  <div id="box">
    <div class="song_info">
      <a href="javascript:;" :class="bgc?'song_info_pic':'song_info_pic2'">
        <img :src="cover" alt />
      </a>
      <div class="song_info_name">
        歌曲名称:
        <a href="javascript:;">{{name||''}}</a>
      </div>
      <div class="song_info_singer">
        歌手名:
        <a href="javascript:;">{{singer||''}}</a>
      </div>
      <div class="song_info_album">
        专辑名:
        <a href="javascript:;">{{album||''}}</a>
      </div>
    </div>
    <div class="song_lyric_content">
      <ul class="song_lyric" ref="lyric">
        <lyric
          v-for="(item,index) in musictimeAndLyric"
          :key="index"
          :item="item"
          :index="index"
          :currenttime="currenttime"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import lyric from './aside/lyric'
export default {
  components:
  {
    lyric
  },
  props: {
    List: Array,
    Index: Number,
    currenttime: Number,
    durationtime: Number
  },
  data () {
    return {
      name: '',
      singer: '',
      album: '',
      cover: '',
      musictimeAndLyric: [],
      bgc: false,
      index: 0,
      itemadd: 0,
      itemindex: 0,
      array: []
    }
  },
  methods: {
    async getMusicLyric (value) {
      this.musictimeAndLyric = []
      const res = await this.axios.get(this.List[value].link_lrc)
      const array = res.data.split('\n')
      var Reg = /\[(\d*:\d*\.\d*)\]/
      array.forEach(ele => {
        const time = Reg.exec(ele)
        const lyric = ele.split(']')
        if (time === null || lyric[1].length <= 1) return
        this.musictimeAndLyric.push([this.changetime(time), lyric[1]])
      })
    },
    changetime (time) {
      // 00:00.20
      const mtime = time[1].split(':')
      const s = parseFloat(mtime[0]) * 60 + parseFloat(mtime[1])
      return parseFloat(s.toFixed(2))
    }
  },
  computed: {
    ...mapState([
      'musicIndex'
    ])
  },
  watch: {
    musicIndex: {
      deep: true,
      handler: function (value) {
        if (value >= 0) {
          console.log(value)
          this.bgc = true
          this.name = this.List[value].name
          this.singer = this.List[value].singer
          this.album = this.List[value].album
          this.cover = this.List[value].cover
          this.getMusicLyric(value)
          this.index = 0
        }
      }
    },
    currenttime: function (value) {
      if (this.musictimeAndLyric.length > 0) {
        if (value >= this.musictimeAndLyric[this.index][0]) {
          const width = (this.musictimeAndLyric.length - 1) * 30
          const top = parseInt(value / this.durationtime)
          this.array.push([this.index, width * top])
          if (this.index < this.musictimeAndLyric.length - 1) { this.index++ }
          this.itemadd = this.musictimeAndLyric[this.index][0]
          this.itemindex = this.index
          if (this.index <= 4) return
          //
          // console.log(this.index)
          this.$refs.lyric.style.top = (-this.index + 4) * 30 + 'px'
        }
        // if (value < this.musictimeAndLyric[this.index][0]) {
        //   this.$refs.lyric.children.forEach((item, index) => {
        //     if (item.className === 'cur') {
        //       console.log('2', index)
        //     }
        //   })
        // }
      }
    },
    List: {
      deep: true,
      handler: function (value) {
        if (value.length === 0) {
          this.bgc = false
          this.name = ''
          this.singer = ''
          this.album = ''
          this.cover = ''
          this.index = 0
          this.musictimeAndLyric = ''
        }
      }
    }
  }
}
</script>

<style scoped>
#box {
  height: 100%;
  width: 100%;
}
.song_info {
  position: relative;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  line-height: 30px;
}
.song_info_pic {
  display: inline-block;
  background: url(../assets/images/album_cover_player.png) no-repeat 0 0;
  width: 201px;
  height: 180px;
  text-align: left;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.song_info_pic img {
  width: 180px;
  height: 180px;
  box-sizing: border-box;
}

.song_info_pic2 {
  display: inline-block;
  background: rgba(255, 255, 255, 0.5);
  width: 201px;
  height: 180px;
  text-align: left;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.song_info_pic2 img {
  width: 180px;
  height: 180px;
  box-sizing: border-box;
}
.song_info div a {
  text-decoration: none;
  color: #fff;
  opacity: 0.5;
}

.song_info div a:hover {
  opacity: 1;
}
.song_lyric_content {
  height: 45%;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
}
.song_lyric {
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
}
.song_lyric li {
  list-style: none;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  text-align: center;
}
</style>
