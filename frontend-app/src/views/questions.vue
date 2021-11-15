<template>
  <div class="questions">
    <h1>Список вопросов</h1>
    <question-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const QuestionList = () =>
  import(
    /* webpackChunkName: "question-list" */ "@/components/questions/questions-list.vue"
  );

@Component({
  name: "Questions",
  components: {
    QuestionList,
  },
})
export default class Questions extends Vue {}
</script>
