<template>
<section class="main__section main__section--projects">
  <span v-if="page">
    <span v-if="page.content.rendered" v-html="page.content.rendered"></span>
  </span>
  <div v-if="page" class="projects">
    <div class="project" v-for="post in filteredPosts" :key="post.id">
      <div class="project__title" @click.self="toggleModal(post.id, true)">{{ post.title.rendered }}</div>
      <img class="project__image" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url" :alt="post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered">
      <transition name="modal">
        <Modal v-show="openModal(post.id)" @close="toggleModal(post.id, true)" :modalType="'project'">
          <div slot="content" class="modal__content">
            <div class="modal__details">
              <img class="modal__logo" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url" :alt="post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered">
              <div class="modal__details--text">
                <h3 class="modal__title" v-html="post.title.rendered"></h3>
                <div class="modal__date" v-html="post.acf.project_date"></div>
                <div class="modal__content" v-html="post.content.rendered"></div>
              </div>
            </div>
            <img class="modal__image" :src="post.acf.project_img.sizes.medium_large" :alt="post.acf.project_img.alt || post.title.rendered">
          </div>
          <a slot="action" class="modal__action" :href="post.acf.project_url" target="_blank">Go to site</a>
        </Modal>
      </transition>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';
import Modal from "@/components/modal.vue";
import GetPageMxn from "@/mixins/getPageMxn";
import ToggleModalMxn from "@/mixins/toggleModalMxn";
import Post from '@/types/Post';
import {
  mapGetters,
} from 'vuex';

@Component({
  components: {
    Modal
  },
  mixins: [GetPageMxn, ToggleModalMxn],
  computed: {
    ...mapGetters({
      filterPosts: '_posts/filterPosts',
      allPosts: '_posts/allPosts',
      getPage: '_page/getPage'
    })
  }
})
export default class Projects extends Vue {
  private filteredPosts: Post = [];
  private filterPosts: any;
  private getPage: any;
  private page: any = null;
  private isOpenModal = false;
  public activeModal = 0;

  created() {
    this.$store.dispatch('_posts/loadPosts', this.$config.baseApi)
      .then(res => {
        this.filteredPosts = this.filterPosts(3);
      });
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/_projects";
@import "../../assets/scss/components/_modal";
</style>
