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
      <button class="form-submit" @click.prevent="onSubmit">Отправить</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { QuestionItemData } from "@/types/questions";

@Component({
  name: "addQuestion",
})
export default class AddQuestion extends Vue {
  @Action("addQuestion", { namespace: "questions" })
  addQuestion!: ({
    question,
    theme,
  }: {
    question: QuestionItemData;
    theme: string;
  }) => Promise<void>;

  text = "";
  category = "";
  options: string[] = ["", "", "", ""];
  themes: string[] = ["javascript", "html", "css", "vue", "react", "python"];
  correct = 0;
  reward = 0;
  materials = "";

  onInputOption(e: InputEvent, i: number): void {
    const value = (e.target as HTMLInputElement).value;
    this.$set(this.options, i, value);
  }

  deleteOption(i: number): void {
    this.options.splice(i, 1);
  }

  async onSubmit(): Promise<void> {
    await this.addQuestion({
      question: {
        text: this.text,
        materials: this.materials,
        options: this.options,
        reward: this.reward,
        correctOption: this.correct,
      },
      theme: this.category,
    });
    this.resetData();
  }

  resetData(): void {
    this.text = "";
    this.options = ["", "", "", ""];
    this.correct = 0;
    this.reward = 0;
    this.materials = "";
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
