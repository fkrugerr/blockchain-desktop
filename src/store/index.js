import Vue from 'vue';
import Vuex from 'vuex';
import desktopState from './modules/desktop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    desktop: {
      namespaced: true,
      ...desktopState,
    },
  },
});
