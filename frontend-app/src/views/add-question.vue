<template>
  <div class="add-question">
    <question-form :data="emptyQuestion" title="Добавить вопрос" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  QuestionItemData,
  QuestionLang,
  QuestionThemes,
} from "@/types/questions";
import QuestionForm from "@/components/questions/question-form/question-form.vue";

@Component({
  name: "addQuestion",
  components: {
    QuestionForm,
  },
})
export default class AddQuestion extends Vue {
  emptyQuestion: QuestionItemData = {
    text: "",
    theme: QuestionThemes.JAVASCRIPT,
    options: ["", "", "", ""],
    lang: QuestionLang.RUSSIAN,
    correctOption: 0,
    reward: 0,
    materials: "",
    images: [],
  };
}
</script>
