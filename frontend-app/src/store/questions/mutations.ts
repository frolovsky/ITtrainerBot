import { MutationTree } from "vuex";
import { QuestionsState } from "@/store/questions/types";
import { QuestionItemData } from "@/types/questions";

export const mutations: MutationTree<QuestionsState> = {
  setQuestions(state, questions: QuestionItemData[]) {
    state.questions = questions;
  },
};
