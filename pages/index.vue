<template>
<div id="app">
  <Header ref="headerComponent" />
  <main class="main" ref="main">
    <div class="main__jungle"></div>
    <div class="main__burger burger" v-bind:class="{ active: isActive }" @click="isActive = !isActive">
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
    </div>
    <Nav v-bind:class="{ active: isActive }" ref="navComponent" />
    <div class="main__container" v-scroll-progress="this.$refs">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import Header from '@/components/header.vue';
import Nav from '@/components/nav.vue';
import {
  scrollProgress
} from '../directives/scrollProgress';

@Component({
  components: {
    Header,
    Nav
  },
  directives: {
    scrollProgress,
  }
})
export default class App extends Vue {
  private isActive = false;

  scrollListen() {
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });
  }

  mounted() {
    this.scrollListen();
    this.$router.push(this.localePath('index-start'));
  }

}
</script>

<style lang="scss">
@import "./assets/scss/_main";
@import "./assets/scss/components/_cat";
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 0.5s ease-out;
}
</style>
