import { createStore } from 'vuex'
import codRAOjson from "./db/codRAO.json"
import nuclidsjson from "./db/nuclids.json"
import typeRAOjson from "./db/typeRAO.json"
import classTROjson from "./db/classTRO.json"
import classGROjson from "./db/classGRO.json"



export default createStore({
  state: {
    cols: 'auto',
    myCodRAOjson: codRAOjson,
    myNuclidsjson: nuclidsjson,
    myTypeRAOjson: typeRAOjson,
    myClassTROjson: classTROjson,
    myClassGROjson: classGROjson,
		udAsSum: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
  
  },
  mutations: {
    setUdAsSum (state, payload) {
      state.udAsSum = payload
    },
    setPhotoCurrentPage (state, payload) {
      state.photoCurrentPage = payload
    },
    setAlbum (state, payload) {
      // console.log(payload);
      state.album = payload
    },
    setAlbumName (state, payload) {
      // console.log(payload);
      state.albumName = payload
    },
    setFontSize (state, payload) {
      state.fontSize = payload;
    },
    setFZ (state, payload) {
      state.fz = payload;
    },
    setLH (state, payload) {
      state.lh = payload;
    },
  },
  actions: {
    updatePhotoCurrentPage ({ commit }, page) {
      return commit('setPhotoCurrentPage', page)
    },
    updateUdAsSum ({ commit }, udAsSum) {
      // console.log(view);
      return commit('setUdAsSum', udAsSum)
    },
    updateAlbum ({ commit }, album) {
      // console.log('updateAlbum ' + album);
      return commit('setAlbum', album)
    },
    updateAlbumName ({ commit }, albumName) {
      return commit('setAlbumName', albumName)
    },
    updateFontSize ({ commit}, fontSize) {
      return commit('setFontSize', fontSize)
    },
    updateFZ ({ commit}, fz) {
      return commit('setFZ', fz)
    },
    updateLH ({ commit}, lh) {
      return commit('setLH', lh)
    }
},
  getters: {
    getCodRAO: state => state.myCodRAOjson,
    getNuclids: state => state.myNuclidsjson,
    getTypeRAO: state => state.myTypeRAOjson,
    getClassTRO: state => state.myClassTROjson,
    getClassGRO: state => state.myClassGROjson,
    getUdAsSum: state => state.udAsSum
  }
})
