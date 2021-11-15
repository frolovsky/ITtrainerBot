<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-app-bar-title>
          IT trainer bot
        </v-app-bar-title>
      </v-app-bar>
      <div class="app-content">
        <nav class="app-content__nav">
          <v-list>
            <v-list-item link>
              <router-link :to="{ name: 'dashboard' }" exact>
                Главная
              </router-link>
            </v-list-item>
            <v-list-item link>
              <router-link :to="{ name: 'questions' }" exact>
                Список вопросов
              </router-link>
            </v-list-item>
            <v-list-item link>
              <router-link :to="{ name: 'add-question' }" exact>
                Добавить вопрос
              </router-link>
            </v-list-item>
          </v-list>
        </nav>
        <div class="content">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App",
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
.app-content {
  display: flex;

  &__nav {
    margin-right: 50px;
    border-right: 3px solid #eee;
  }
}
</style>
