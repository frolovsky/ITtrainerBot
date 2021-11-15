<template>
  <div class="question-item">
    <p>{{ item.text }}</p>
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
