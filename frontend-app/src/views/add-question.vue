<template>
  <div class="add-question">
    <h1 class="questions-title">Добавить вопрос</h1>
    <form class="add-question-form">
      <div class="form-block">
        <label class="form-label">
          <span class="form-label__text">Категория: </span>
          <select v-model="category">
            <option v-for="(theme, i) in themes" :key="i" :value="theme">
              {{ theme }}
            </option>
          </select>
        </label>
      </div>
      <div class="form-block">
        <label class="form-label">
          <span class="form-label__text">Язык: </span>
          <select v-model="lang">
            <option v-for="(lang, i) in langList" :key="i" :value="lang">
              {{ lang }}
            </option>
          </select>
        </label>
      </div>
      <div class="form-block">
        <label class="form-label">
          <span class="form-label__text">Текст вопроса: </span>
          <textarea v-model="text"></textarea>
        </label>
      </div>
      <div class="form-block">
        <div class="options">
          <label class="form-label">
            <span class="form-label__text">Варианты ответа: </span>
          </label>
          <ul class="options-list">
            <li v-for="(option, i) in options" :key="i" class="options-item">
              <input
                type="radio"
                :value="i"
                v-model="correct"
                class="options-item__radio"
              />
              <input
                :value="option"
                type="text"
                @input="onInputOption($event, i)"
                class="options-item__input"
              />
              <button
                @click.prevent="deleteOption(i)"
                class="options-item__delete-btn"
              >
                Удалить
              </button>
            </li>
          </ul>
          <div class="options-controls">
            <button
              class="options-controls__add-btn"
              @click.prevent="options.push('')"
            >
              Добавить вариант ответа
            </button>
          </div>
        </div>
      </div>
      <div class="form-block">
        <label class="form-label">
          <span class="form-label__text">Награда EXP: </span>
          <input v-model.number="reward" />
        </label>
      </div>
      <div class="form-block">
        <label class="form-label">
          <span class="form-label__text">Материалы: </span>
          <textarea v-model="materials"></textarea>
        </label>
      </div>
      <div class="form-block">
        <label class="form-label">
          <span class="form-label__text">Изображения: </span>
          <input type="file" multiple @change="onChangeFileInput" />
        </label>
      </div>
      <button class="form-submit" @click.prevent="onSubmit">Отправить</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import {
  QuestionItemData,
  QuestionLang,
  QuestionThemes,
} from "@/types/questions";

@Component({
  name: "addQuestion",
})
export default class AddQuestion extends Vue {
  @Action("addQuestion", { namespace: "questions" })
  addQuestion!: (question: QuestionItemData) => Promise<void>;

  text = "";
  category = QuestionThemes.JAVASCRIPT;
  options: string[] = ["", "", "", ""];
  themes: QuestionThemes[] = [
    QuestionThemes.JAVASCRIPT,
    QuestionThemes.HTML,
    QuestionThemes.CSS,
    QuestionThemes.VUE,
    QuestionThemes.REACT,
    QuestionThemes.PYTHON,
  ];
  lang = QuestionLang.RUSSIAN;
  langList = [QuestionLang.RUSSIAN, QuestionLang.ENGLISH];
  correct = 0;
  reward = 0;
  materials = "";
  files: File[] = [];
  errors: string[] = [];

  onInputOption(e: InputEvent, i: number): void {
    const value = (e.target as HTMLInputElement).value;
    this.$set(this.options, i, value);
  }

  deleteOption(i: number): void {
    this.options.splice(i, 1);
  }

  onChangeFileInput(e: InputEvent) {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files[i]);
      }
    }
  }

  async onSubmit(): Promise<void> {
    this.checkForm();
    if (this.errors.length === 0) {
      await this.addQuestion({
        text: this.text,
        materials: this.materials,
        options: this.options,
        reward: this.reward,
        correctOption: this.correct,
        theme: this.category,
        lang: this.lang,
      });
      this.resetData();
    } else {
      alert(this.errors[0]);
    }
  }

  checkForm(): void {
    this.errors = [];
    if (!this.text) {
      this.errors.push('Не заполнен текст вопроса');
    } else if (!this.materials) {
      this.errors.push('Не указаны материалы к вопросу');
    } else if (this.options.length < 2) {
      this.errors.push('Укажите минимум 2 варианта ответа');
    }
    this.options.forEach((option, i) => {
      if (!option) {
        this.errors.push(`Пустой вариант ответа под номером ${i + 1}`);
      }
    })
  }

  resetData(): void {
    this.text = "";
    this.options = ["", "", "", ""];
    this.correct = 0;
    this.reward = 0;
    this.materials = "";
    this.files = [];
  }
}
</script>

<style lang="scss" scoped>
.questions-title {
  margin-bottom: 30px;
}
.add-question-form {
  max-width: 800px;
  width: 100%;
  padding: 15px 30px;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  .form-block {
    margin-bottom: 10px;
  }

  .form-label {
    display: flex;
    flex-direction: column;

    &__text {
      font-weight: bold;
      margin-bottom: 4px;
    }
  }

  textarea,
  input,
  select {
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #eee;

    &:focus {
      outline: none;
    }
  }

  .options-item {
    margin-bottom: 4px;
    display: flex;
    align-items: center;

    &__radio {
      margin-right: 10px;
    }

    &__input {
      border: 1px solid #eee;
      padding: 5px;
      border-radius: 5px;
      margin-right: 10px;
    }

    &__delete-btn {
      font-size: 13px;
      border: 1px solid indianred;
      height: 36px;
      padding: 0 10px;
      border-radius: 5px;
    }
  }

  .options-controls {
    padding: 10px 20px;

    &__add-btn {
      font-size: 14px;
      font-weight: bold;
      background-color: mediumseagreen;
      color: #fff;
      height: 36px;
      padding: 0 10px;
      border-radius: 5px;
    }
  }

  .form-submit {
    font-size: 14px;
    font-weight: bold;
    background-color: mediumseagreen;
    color: #fff;
    height: 36px;
    padding: 0 10px;
    border-radius: 5px;
  }
}
</style>
