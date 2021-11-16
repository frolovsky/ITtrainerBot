<template>
  <div class="questions">
    <h1 class="questions-title">Список вопросов</h1>
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

<style lang="scss" scoped>
.questions-title {
  margin-bottom: 30px;
}
</style>
