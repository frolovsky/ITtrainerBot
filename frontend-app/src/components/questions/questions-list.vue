<template>
  <div class="questions-list">
    <question-item
      v-for="question in questions"
      :key="question._id"
      :item="question"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { QuestionsState } from "@/store/questions/types";
import { QuestionItemData } from "@/types/questions";

const QuestionItem = () =>
  import(
    /* webpackChunkName: "question-item" */ "@/components/questions/question-item.vue"
  );

@Component({
  name: "QuestionsList",
  components: {
    QuestionItem,
  },
})
export default class QuestionsList extends Vue {
  @State("questions") questionsState!: QuestionsState;
  @Action("fetchQuestions", { namespace: "questions" })
  fetchQuestions!: () => Promise<void>;

  get questions(): QuestionItemData[] {
    return this.questionsState.questions;
  }

  async created(): Promise<void> {
    if (!this.questions.length) {
      await this.fetchQuestions();
    }
  }
}
</script>

<style scoped></style>
