import { ActionTree } from "vuex";
import { QuestionsState } from "@/store/questions/types";
import api from "@/common/api";
import { QuestionItemData } from "@/types/questions";
import { RootState } from "@/types";

export const actions: ActionTree<QuestionsState, RootState> = {
  async fetchQuestions({ commit }) {
    const { data } = await api.get<QuestionItemData[]>("/questions");
    commit("setQuestions", data);
  },

  async addQuestion(_context, question: QuestionItemData) {
    const response = await api.post(`/questions`, question);
    console.log(response);
  },
};
