<template>
<nav class="nav" ref="nav">
  <ul class="nav__container">
    <li class="nav__item" @click.stop.prevent="scrollTo('header', 'headerComponent')">
      <a href="" class="nav__link">Intro</a>
    </li>
    <li class="nav__item" v-for="navItem in navItems" :key="navItem.title" @click.stop.prevent="scrollTo('main')">
      <nuxt-link :to="navItem.object_slug" class="nav__link">{{ navItem.title }}</nuxt-link>
    </li>
  </ul>
  <nuxt-link :to="'inspiration'"  class="cat" v-html="cat" />
</nav>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';
import NavService from '../services/NavService';
import Post from '../types/Post';
import ScrollToMxn from "~/mixins/scrollToMxn";
import rawCat from '@/assets/gfx/cat_1.svg?raw';

@Component({
  mixins: [ScrollToMxn]
})
export default class Nav extends Vue {
  // eslint-disable-next-line
  private navItems: any[] = [];
  private cat = rawCat;

  created() {
    this.getNav();
  }

  getNav() {
    NavService.getNav(this.$config.baseApi, '2').then((res: Post) => {
      this.navItems = res.data.items;
    });
  }
  
}
</script>

<style scoped lang="scss">
@import "../assets/scss/components/_nav";
</style>
