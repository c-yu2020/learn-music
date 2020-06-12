<template>
  <li :class="[status? 'cur' :  null]" aaa="111">{{item[1]}}</li>
</template>

<script>
export default {
  props: {
    item: Array,
    index: Number,
    currenttime: Number
  },
  data () {
    return {
      audiotime: 0,
      item1: 0,
      itemindex: 0
    }
  },
  methods: {
  },
  watch: {
    currenttime: function (value) {
      this.item1 = this.$parent.itemadd
      this.itemindex = this.$parent.itemindex
    }
  },
  computed: {
    status: {
      get () {
        return this.item1 > this.currenttime && (this.currenttime - this.item[0] >= 0 && this.index === this.itemindex - 1)
      }
    }
  }
}
</script>

<style scoped>
.cur {
  color: #31c27c !important;
}
</style>
