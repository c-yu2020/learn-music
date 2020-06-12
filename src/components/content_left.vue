<template>
  <div class="list_box">
    <!-- 导入工具栏 -->
    <section class="list_toolbar">
      <toolbar :delChecked="delChecked" :delall="delall" />
    </section>
    <div class="music_list parent-dom">
      <vue-scroll :ops="ops">
        <div class="list_title child-dom">
          <div :class="['list_check',ischeckedall?'list_checked':null]" @click="checkedall">
            <i></i>
          </div>
          <div class="list_number"></div>
          <div class="list_name">歌曲</div>
          <div class="list_singer">歌手</div>
          <div class="list_time">时长</div>
        </div>
        <ul class="child-dom">
          <musiList
            v-for="(item , index ) in List"
            :item="item"
            :index="index"
            :key="index"
            :playmusicurl="playmusicurl"
            :listMusicDel="listMusicDel"
            :changecheck="changecheck"
            ref="musiclist"
          />
        </ul>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
import toolbar from './content/toolbar.vue'
import musiList from './content/music_list.vue'
export default {
  data () {
    return {
      ops: {
        vuescroll: {
          sizeStrategy: 'number'
        },
        scrollPanel: {
          verticalNativeBarPos: 'right'
        },
        rail: {
          gutterOfSide: '7px',
          gutterOfEnds: '5px'
        },
        bar: {
          background: '#e1e1e1',
          opacity: 0.5,
          minSize: 0.2
        }
      },
      rList: [],
      ischeckedall: false,
      num: -2
    }
  },
  props: ['List', 'playmusicurl', 'listMusicDel', 'changecheck', 'delChecked', 'delall'],
  components: {
    toolbar,
    musiList
  },
  methods: {
    checkedall () {
      this.ischeckedall = !this.ischeckedall
      // -1全选
      if (this.ischeckedall) {
        this.num = -1
        // -2全不选
      } else {
        this.num = -2
      }
      this.$emit('changecheck', this.num)
    }
  },
  watch: {
    List: {
      deep: true,
      handler: function (value) {
        if (value.length === 0) {
          this.ischeckedall = false
        }
      }
    }
  }
}
</script>

<style scoped>
.list_box {
  height: 100%;
}
.list_toolbar {
  width: 100%;
  margin-bottom: 19px;
}
.music_list {
  width: 100%;
  /* 解决原生的滚动条隐藏不全的问题 */
  height: 87%;
}
.list_title {
  list-style: none;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  user-select: none;
}
.list_title div {
  float: left;
  line-height: 50px;
  color: rgba(255, 255, 255, 0.5);
}
.list_check {
  width: 50px;
  height: 100%;
  text-align: center;
  margin-right: 10px;
}
.list_check i {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  opacity: 0.5;
  margin-top: 50%;
  transform: translate(0, -50%);
}
.list_checked i {
  background: url(../assets/images/icon_sprite.png) no-repeat -60px -80px;
  opacity: 1;
}
.list_number {
  width: 20px;
  height: 100%;
}
.list_number2 {
  color: transparent !important;
  background: url("../assets/images/wave.gif") no-repeat 0 center;
}
.list_name {
  width: 50%;
  min-width: 320px;
  height: 50px;
}
.list_menu {
  margin-top: 7px;
  float: right;
  margin-right: 20px;
  display: none;
}
.list_menu a {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url("../assets/images/icon_list_menu.png") no-repeat 0 0;
  opacity: 0.5;
}
.list_menu a:hover {
  opacity: 1;
}
.list_menu a:nth-child(1) {
  background-position: -120px 0;
}

.list_menu a:nth-child(2) {
  background-position: -120px -80px;
}

.list_menu a:nth-child(3) {
  background-position: -120px -120px;
}

.list_menu a:nth-child(4) {
  background-position: -120px -40px;
}

.list_menu_play2 {
  background-position: -80px -200px !important;
}

.list_singer {
  width: 20%;
  height: 100%;
}
.list_time a {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url("../assets/images/icon_list_menu.png") no-repeat -120px -160px;
  margin-top: 5px;
  display: none;
  float: left;
  opacity: 0.5;
}

.list_time a:hover {
  opacity: 1;
}
</style>
