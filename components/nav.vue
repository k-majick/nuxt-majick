<template>
<div>
  <nav class="nav" ref="nav">
    <ul class="nav__container">
      <li class="nav__item" @click.stop.prevent="scrollTo('header', 'headerComponent')">
        <a href="" class="nav__link">Intro</a>
      </li>
      <li class="nav__item" v-for="navItem in navItems" :key="navItem.title" @click.stop.prevent="scrollTo('main')">
        <nuxt-link :to="navItem.object_slug" class="nav__link">{{ navItem.title }}</nuxt-link>
      </li>
    </ul>
    <ul class="nav__container nav__container--social">
      <li class="nav__item">
        <a class="nav__link" href="https://github.com/k-majick" target="_blank" v-html="gitIcon" v-hover-message="msgGit"></a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="https://www.linkedin.com/in/maciej-klimowicz" target="_blank" v-html="linkedinIcon" v-hover-message="msgLinkedin"></a>
      </li>
      <li class="nav__item">
        <span class="nav__link" v-html="userIcon"></span>
        <span class="nav__icon nav__icon--logged" v-if="logged">&check;</span>
        <ul class="nav__submenu">
          <li class="nav__item">
            <button class="nav__link" @click.self="toggleModal(1, true)">Login</button>
          </li>
          <li class="nav__item">
            <nuxt-link :to="{ path: 'register' }" class="nav__link">Register</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
    <nuxt-link :to="'inspiration'" class="cat" v-html="cat" />
  </nav>
  <transition name="modal">
    <Modal v-show="openModal(1)" @close="toggleModal(1, true)" :modalType="'login'" ref="loginForm">
      <h3 slot="header" class="modal__title" v-html="'Login'"></h3>
      <div slot="content" class="modal__content">
        <LoginForm></LoginForm>
      </div>
    </Modal>
  </transition>
</div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'nuxt-property-decorator';
import Modal from "@/components/modal.vue";
import LoginForm from "@/components/login-form.vue";
import ToggleModalMxn from "@/mixins/toggleModalMxn";
import NavService from '../services/NavService';
import Post from '../types/Post';
import ScrollToMxn from "~/mixins/scrollToMxn";
import rawCat from '@/assets/gfx/cat_1.svg?raw';
import rawIconGit from '@/assets/gfx/icon-git-min.svg?raw';
import rawIconLinkedin from '@/assets/gfx/icon-linkedin-min.svg?raw';
import rawIconUser from '@/assets/gfx/icon-user.svg?raw';
import {
  hoverMessage
} from '../directives/hoverMessage';
import {
  MESSAGE_LINKEDIN,
  MESSAGE_GIT
} from '../app.settings';


interface RefInterface extends Vue {
  resetLoginForm(): void;
}

@Component({
  directives: {
    hoverMessage,
  },
  mixins: [ScrollToMxn, ToggleModalMxn]
})
export default class Nav extends Vue {
  // eslint-disable-next-line
  private navItems: any[] = [];
  private cat = rawCat;
  private gitIcon = rawIconGit;
  private linkedinIcon = rawIconLinkedin;
  private userIcon = rawIconUser;
  private msgLinkedin = MESSAGE_LINKEDIN;
  private msgGit = MESSAGE_GIT;
  private logged = false;
  private isOpenModal = false;
  public activeModal = 0;

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
@import "../assets/scss/components/_modal";
</style>
