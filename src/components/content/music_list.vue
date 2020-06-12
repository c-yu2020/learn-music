<template>
  <li class="list_music" @mouseenter="enter" @mouseleave="leave">
    <div :class="['list_check',item.checked?'list_checked':null]" @click="checked">
      <i></i>
    </div>
    <div :class="[item.state?'list_number2':'list_number']">{{index+1}}</div>
    <div class="list_name">
      {{item.name}}
      <div :class="{'list_menu1':!listmenu,'list_menu':listmenu}">
        <a
          href="javascript:;"
          title="播放"
          @click="play_music"
          :class="[item.state?'list_menu_play2':null]"
        ></a>
        <a href="javascript:;" title="添加"></a>
        <a href="javascript:;" title="下载"></a>
        <a href="javascript:;" title="分享"></a>
      </div>
    </div>
    <div class="list_singer">{{item.singer}}</div>
    <div :class="{'list_time':!listtime,'list_time2':listtime}" ref="del">
      <span>{{item.time}}</span>
      <a href="javascript:;" title="删除" @click="list_del"></a>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
    playmusicurl: Function,
    listMusicDel: Function,
    changecheck: Function
  },
  data () {
    return {
      listtime: false,
      listmenu: false
    }
  },
  methods: {
    enter () {
      this.listmenu = true
      this.listtime = true
    },
    leave () {
      this.listmenu = false
      this.listtime = false
    },
    // 行内音乐播放按钮
    play_music () {
      // 修改footer播放状态
      this.playmusicurl(this.index)
    },
    list_del () {
      this.listMusicDel(this.index)
    },
    checked () {
      this.changecheck(this.index)
    }
  }
}
</script>

<style scoped>
li {
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}
/* li:first-child {
  border-top: none;
} */

.list_music {
  list-style: none;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  user-select: none;
}
.list_music div {
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
  background: url(../../assets/images/icon_sprite.png) no-repeat -60px -80px;
  opacity: 1;
}
.list_number {
  width: 20px;
  height: 100%;
}
.list_number2 {
  width: 20px;
  height: 100%;
  color: transparent !important;
  background: url("../../assets/images/wave.gif") no-repeat 0 center;
}
.list_name {
  width: 50%;
  min-width: 320px;
  height: 50px;
  position: relative;
}
.list_menu1 {
  margin-top: 7px;
  display: none;
  position: absolute;
  top: 0;
  right: 20px;
}
.list_menu {
  margin-top: 7px;
  position: absolute;
  top: 0;
  right: 20px;
}

.list_menu a {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url("../../assets/images/icon_list_menu.png") no-repeat 0 0;
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
.list_time span {
  display: inline-block;
}
.list_time a {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url("../../assets/images/icon_list_menu.png") no-repeat -120px -160px;
  margin-top: 5px;
  display: none;
  float: left;
  opacity: 0.5;
}
.list_time2 span {
  display: none;
}
.list_time2 a {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url("../../assets/images/icon_list_menu.png") no-repeat -120px -160px;
  margin-top: 5px;
  float: left;
  opacity: 0.5;
}
.list_time2 a:hover {
  opacity: 1;
}
</style>
