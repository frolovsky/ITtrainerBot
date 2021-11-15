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
import api from "@/common/api";
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
  questions: QuestionItemData[] = [];

  async fetchQuestions(): Promise<void> {
    const { data } = await api.get<QuestionItemData[]>("/questions");
    this.questions = data;
  }

  async created(): Promise<void> {
    await this.fetchQuestions();
  }
}
</script>

<style scoped></style>
