<template>
  <div id="app">
    <header class="header">
      <Header />
    </header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/header.vue'
export default {
  components: {
    Header
  }
}
</script>

<style>
#app {
  background-color: rgba(0, 0, 0, 0.4);
}
.header {
  width: 100%;
  position: absolute;
  left: 0px;
  z-index: 3333;
}
</style>
