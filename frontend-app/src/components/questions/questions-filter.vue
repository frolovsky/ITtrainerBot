<template>
  <div class="questions-filter">
    <div class="filter-block">
      <label class="filter-label">
        <span class="filter-label__text">Категория: </span>
        <select v-model="category">
          <option v-for="(theme, i) in themes" :key="i" :value="theme">
            {{ theme }}
          </option>
        </select>
      </label>
    </div>
    <div class="filter-block">
      <label class="filter-label">
        <span class="filter-label__text">Язык: </span>
        <select v-model="lang">
          <option v-for="(lang, i) in langList" :key="i" :value="lang">
            {{ lang }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { QuestionLang, QuestionThemes } from '@/types/questions';

@Component({
  name: "QuestionsFilter",
})
export default class QuestionsFilter extends Vue {
  lang = QuestionLang.RUSSIAN;
  langList = [QuestionLang.RUSSIAN, QuestionLang.ENGLISH];
  category = QuestionThemes.JAVASCRIPT;
  themes: QuestionThemes[] = [
    QuestionThemes.JAVASCRIPT,
    QuestionThemes.HTML,
    QuestionThemes.CSS,
    QuestionThemes.VUE,
    QuestionThemes.REACT,
    QuestionThemes.PYTHON,
  ];

  @Watch('lang', { immediate: true })
  onLangChange() {
    this.applyFilters();
  }

  @Watch('category')
  onCategoryChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.$emit('applyFilters', { lang: this.lang, category: this.category });
  }
}
</script>

<style lang="scss" scoped>
.questions-filter {
  padding: 10px;
  border: 2px solid #111111;
  display: flex;
  width: 100%;
  margin-bottom: 50px;

  .filter-block {
    margin-right: 20px;
    padding: 10px;
    border: 2px solid #eee;
  }

  select {
    padding: 2px 10px;
    border: 2px solid #eee;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
}
</style>
