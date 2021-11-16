<template>
  <div class="question-item">
    <p class="question-item__title">{{ item.text }}</p>
    <ul class="item-options">
      <li
        v-for="(option, i) in item.options"
        :key="i"
        class="item-option"
        :class="{ 'item-option--correct': i === item.correctOption }"
      >
        {{ option }}
      </li>
    </ul>
    <div class="item-materials">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header> Материалы </v-expansion-panel-header>
          <v-expansion-panel-content>
            <span>{{ item.materials }}</span>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="item-footer">
      <p class="item-reward">
        Reward: <span class="item-reward__text">{{ item.reward }}</span>
      </p>
      <p class="item-id">
        ID: <span class="item-id__text">{{ item._id }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { QuestionItemData } from "@/types/questions";

@Component({
  name: "QuestionItem",
})
export default class QuestionItem extends Vue {
  @Prop({ type: Object, default: () => ({}) }) item!: QuestionItemData;
}
</script>

<style lang="scss" scoped>
.question-item {
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .item-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2px;
    padding: 0;
    margin-bottom: 8px;
  }

  .item-option {
    list-style: none;
    border: 2px solid #eee;
    padding: 10px;

    &--correct {
      color: limegreen;
    }
  }

  .item-materials {
    margin-bottom: 8px;
  }

  .item-footer {
    .item-reward {
      margin-bottom: 4px;
    }
    .item-id {
      margin-bottom: 0;
    }
  }
}
</style>
