import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playState: false,
    musicIndex: -2,
    listLength: 0
  },
  mutations: {
    changeState (state, { playStatus }) {
      state.playState = playStatus
    },
    // 音乐播放
    // musicPlay (state, { items }) {
    //   if (state.musicIndex === items.index) {
    //     // paused返回如果不是暂停返回false 是暂停返回true
    //     if (state.audio.paused) {
    //       state.audio.play()
    //     } else {
    //       state.audio.pause()
    //     }
    //   } else {
    //     state.musicIndex = items.index
    //     state.audio.src = items.item.link_url
    //     state.audio.play()
    //   }
    // },
    indexAdd (state) {
      state.musicIndex++
    },
    indexReduce (state) {
      state.musicIndex--
    }
  },
  actions: {
    changeState ({ commit }, playStatus) {
      commit('changeState', { playStatus })
    },
    musicPlay ({ commit }, items) {
      commit('musicPlay', { items })
    },
    indexAdd ({ commit }) {
      commit('indexAdd')
    },
    indexReduce ({ commit }) {
      commit('indexReduce')
    }
  },
  modules: {}
})
