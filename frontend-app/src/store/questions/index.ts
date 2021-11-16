import { Module } from "vuex";
import { QuestionsState } from "@/store/questions/types";
import { actions } from "./actions";
import { mutations } from "./mutations";
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
};

export default questions;
