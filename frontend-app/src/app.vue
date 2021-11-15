<template>
  <v-app>
    <v-main>
      <header class="app-header">
        <img
          src="./assets/images/logo.jpg"
          alt="it trainer bot"
          class="app-header__logo"
        />
        <h1 class="app-header__title">IT Trainer</h1>
      </header>
      <div class="app-content">
        <nav class="app-content__nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link :to="{ name: 'dashboard' }" class="nav-item__link">
                Главная
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'questions' }" class="nav-item__link">
                Список вопросов
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'add-question' }"
                class="nav-item__link"
              >
                Добавить вопрос
              </router-link>
            </li>
          </ul>
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
.app-header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 10px solid #fff;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(113, 113, 113, 1) 100%
  );

  &__title {
    font-size: 60px;
    color: #fff;
  }

  &__logo {
    max-width: 100px;
    width: 100%;
    margin-right: 20px;
    display: block;
  }
}
.app-content {
  display: flex;

  &__nav {
    height: calc(100vh - 150px);
    margin-right: 50px;
    border-right: 4px solid #000;

    ul,
    li {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      &:hover {
        background-color: #eee;
      }
    }

    .nav-item__link {
      display: block;
      padding: 15px 50px;
      font-size: 20px;
      text-decoration: none;
      color: #000;
    }
  }
}
</style>
