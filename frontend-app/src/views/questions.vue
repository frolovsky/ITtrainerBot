<template>
  <div class="questions">
    <h1 class="questions-title">Список вопросов</h1>
    <questions-filter @applyFilters="filters = $event" />
    <questions-list :filters="filters" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { QuestionsFilters } from "@/types/questions";

const QuestionsList = () =>
  import(
    /* webpackChunkName: "questions-list" */ "@/components/questions/questions-list.vue"
  );
const QuestionsFilter = () =>
  import(
    /* webpackChunkName: "questions-filter" */ "@/components/questions/questions-filter.vue"
  );

@Component({
  name: "Questions",
  components: {
    QuestionsList,
    QuestionsFilter,
  },
})
export default class Questions extends Vue {
  filters: QuestionsFilters = {
    category: "",
    lang: "",
  };
}
</script>

<style lang="scss" scoped>
.questions-title {
  margin-bottom: 30px;
}
</style>
