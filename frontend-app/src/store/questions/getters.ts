import { GetterTree } from "vuex";
import { QuestionsState } from "@/store/questions/types";
import { RootState } from "@/types";

export const getters: GetterTree<QuestionsState, RootState> = {
  getQuestions(state) {
    return state.questions;
  },
};
