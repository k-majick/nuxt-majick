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
  <ul class="nav__social">
    <li class="nav__socialItem">
      <a class="nav__socialLink" href="https://github.com/k-majick" target="_blank" v-html="gitIcon" v-hover-message="msgGit"></a>
    </li>
    <li class="nav__socialItem">
      <a class="nav__socialLink" href="https://www.linkedin.com/in/maciej-klimowicz" target="_blank" v-html="linkedinIcon" v-hover-message="msgLinkedin"></a>
    </li>
  </ul>
  <nuxt-link :to="'inspiration'" class="cat" v-html="cat" />
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
import rawIconGit from '@/assets/gfx/icon-git-min.svg?raw';
import rawIconLinkedin from '@/assets/gfx/icon-linkedin-min.svg?raw';
import {
  hoverMessage
} from '../directives/hoverMessage';
import {
  MESSAGE_LINKEDIN,
  MESSAGE_GIT
} from '../app.settings';

@Component({
  directives: {
    hoverMessage,
  },
  mixins: [ScrollToMxn]
})
export default class Nav extends Vue {
  // eslint-disable-next-line
  private navItems: any[] = [];
  private cat = rawCat;
  private gitIcon = rawIconGit;
  private linkedinIcon = rawIconLinkedin;
  private msgLinkedin: string = MESSAGE_LINKEDIN;
  private msgGit: string = MESSAGE_GIT;

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

<style lang="scss">
@import "../assets/scss/components/_nav";
</style>
