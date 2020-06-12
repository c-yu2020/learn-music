<template>
  <div class="content_toolbar">
    <span>
      <i></i>收藏
    </span>
    <span>
      <i></i>添加到
    </span>
    <span>
      <i></i>下载
    </span>
    <span @click="del">
      <i></i>删除
    </span>
    <span @click="delAll">
      <i></i>清空列表
    </span>
  </div>
</template>

<script>
export default {
  props: { delChecked: Function,
    delall: Function },
  methods: {
    del () {
      this.delChecked()
    },
    delAll () {
      this.delall()
    }
  }
}
</script>

<style>
.content_toolbar {
  margin-top: 1px;
  width: 100%;
  height: 40px;
}
.content_toolbar span {
  margin-left: 10px;
  display: inline-block;
  width: 122px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  opacity: 0.5;
}
.content_toolbar span:hover {
  opacity: 1;
}
.content_toolbar span i {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("../../assets/images/icon_sprite.png") no-repeat 0 0;
  margin-right: 10px;
  vertical-align: -5px;
}
.content_toolbar span:nth-child(1) i {
  background-position: -60px -20px;
}

.content_toolbar span:nth-child(2) i {
  background-position: -20px -20px;
}

.content_toolbar span:nth-child(3) i {
  background-position: -40px -240px;
}

.content_toolbar span:nth-child(4) i {
  background-position: -100px -20px;
}

.content_toolbar span:nth-child(5) i {
  background-position: -40px -300px;
}
</style>
