import { Module } from "vuex";
import { QuestionsState } from "@/store/questions/types";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { RootState } from "@/types";

const state: QuestionsState = {
  questions: [],
};

const namespaced = true;

const questions: Module<QuestionsState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};

export default questions;
