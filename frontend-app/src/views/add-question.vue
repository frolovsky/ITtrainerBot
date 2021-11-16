<template>
  <div class="add-question">
    <h1 class="questions-title">Добавить вопрос</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "addQuestion",
})
export default class AddQuestion extends Vue {}
</script>

<style lang="scss" scoped>
.questions-title {
  margin-bottom: 30px;
}
</style>
