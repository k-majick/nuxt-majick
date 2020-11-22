<template>
<header class="header" ref="header">
  <section class="header__container">
    <a class="main__anchor"></a>
    <a class="header__logo">
      <h1 class="header__title">{{ name }}</h1>
    </a>
    <div class="avatar">
      <h2 class="avatar__title">{{ name }}</h2>
      <div class="avatar__container" v-hover-message="message">
        <div class="avatar__message"></div>
        <div class="avatar__flipper">
          <div class="avatar__front"></div>
          <div class="avatar__back"></div>
        </div>
      </div>
      <div class="avatar__shadow"></div>
    </div>
    <div class="header__arrow"></div>
    <a class="chevron__container" @click="scrollTo('main')">
      <div class="chevron"></div>
    </a>
  </section>
</header>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';
import {
  NAME,
  MESSAGE
} from '../app.settings';
import {
  hoverMessage
} from '../directives/hoverMessage';
import ScrollToMxn from "~/mixins/scrollToMxn";

@Component({
  directives: {
    hoverMessage,
  },
  mixins: [ScrollToMxn]
})
export default class Header extends Vue {
  private name: string = NAME;
  private message: string = MESSAGE;
}
</script>

<style scoped lang="scss">
@import "../assets/scss/components/_header";
@import "../assets/scss/components/_avatar";
@import "../assets/scss/components/_chevron";
</style>
