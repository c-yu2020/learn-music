<template>
  <div>
    <h1 class="logo">
      <a href="#"></a>
    </h1>
    <ul class="register">
      <li>登录</li>
      <li>设置</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  width: 100%;
  height: 45px;
  overflow: hidden;
}

.header .logo a {
  display: inline-block;
  width: 78px;
  height: 21px;
  background: url(../assets/images/player_logo.png) no-repeat 0 0;
  float: left;
  margin-left: 20px;
  margin-top: 12px;
  opacity: 0.5;
}

.header .logo a:hover {
  opacity: 1;
}

.header .register {
  float: right;
  overflow: hidden;
  list-style: none;
  line-height: 45px;
}

.header .register li {
  float: left;
  margin-right: 20px;
  color: white;
  opacity: 0.5;
}

.header .register li:hover {
  opacity: 1;
}
</style>
