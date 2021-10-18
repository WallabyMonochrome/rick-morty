import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const baseUrl = 'https://rickandmortyapi.com/api/character';

export default new Vuex.Store({
  state: {
    searchValue: '',
    characters: [],
    totalPage: 0,
    currentPage: 1,
    loadingCharacters: true,
    loadingCharacterDetails: true,
    filtering: 'All',
    selectedCharacterInfo: {},
  },
  getters: {
    getSearchValue: (state) => (state.searchValue),
    getCharacter: (state) => (state.characters),
    getLoaderCharacters: (state) => (state.loadingCharacters),
    getLoaderCharacterDetails: (state) => (state.loadingCharacterDetails),
    getTotalPage: (state) => (state.totalPage),
    getCurrentPage: (state) => (state.currentPage),
    getFiltering: (state) => (state.filtering),
    getSelectedCharacterInfo: (state) => (state.selectedCharacterInfo),
  },
  mutations: {
    setSearchValue(state, value) {
      state.searchValue = value;
    },
    setCharacters(state, value) {
      state.characters = value;
    },
    setLoader(state, value) {
      state.loadingCharacters = value;
    },
    setLoaderCharacterDetails(state, value) {
      state.loadingCharacterDetails = value;
    },
    setTotalPage(state, value) {
      state.totalPage = value;
    },
    setCurrentPage(state, value) {
      if (value >= 1 && value <= state.totalPage) {
        state.currentPage = value;
      }
    },
    setFiltering(state, value) {
      const correctValue = {
        All: true, Alive: true, Dead: true, unknown: true,
      };
      if (correctValue[value]) {
        state.filtering = value;
      }
    },
    setSelectedCharacterInfo(state, value) {
      state.selectedCharacterInfo = value;
    },
  },
  actions: {
    resetState({ commit }) {
      commit('setCurrentPage', 1);
      commit('setSearchValue', '');
    },
    setCurrentPage({ commit }, value) {
      commit('setCurrentPage', value);
    },
    setSearchValue({ commit }, value) {
      commit('setSearchValue', value);
    },
    fetchCharacters({ commit, state }) {
      commit('setLoader', true);
      axios.get(`${baseUrl}?name=${state.searchValue}&status=${state.filtering === 'All' ? '' : state.filtering}`).then((resp) => {
        commit('setLoader', false);
        commit('setCurrentPage', 1);
        commit('setCharacters', resp.data.results);
        commit('setTotalPage', resp.data.info.pages);
      }).catch((e) => {
        if (e.response.status === 404) {
          commit('setCharacters', []);
        } else {
          console.error('Error while getting characters', e);
        }
        commit('setLoader', false);
      });
    },
    getOtherPage({ commit, state }) {
      commit('setLoader', true);
      axios.get(`${baseUrl}?name=${state.searchValue}&page=${state.currentPage}&status=${state.filtering === 'All' ? '' : state.filtering}`).then((resp) => {
        commit('setLoader', false);
        commit('setCharacters', resp.data.results);
      });
    },
    setFiltering({ commit }, value) {
      commit('setFiltering', value);
    },
    fetchSelectedCharacterInfo({ commit }, id) {
      commit('setLoaderCharacterDetails', true);
      axios.get(`${baseUrl}/${id}`).then((resp) => {
        commit('setSelectedCharacterInfo', (resp.data));
        commit('setLoaderCharacterDetails', false);
      }).catch((e) => {
        console.error(e);
        commit('setLoaderCharacterDetails', false);
      });
    },
  },
  modules: {},
});
