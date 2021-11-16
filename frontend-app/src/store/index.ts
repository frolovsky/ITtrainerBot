import Vue from "vue";
import Vuex from "vuex";
import questions from "@/store/questions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "",
  },
  mutations: {},
  actions: {},
  modules: {
    questions,
  },
});
