<template>
<section class="main__section main__section--projects" v-if="page.content">
  <span v-if="page">
    <span v-if="page.content.rendered" v-html="page.content.rendered"></span>
  </span>
  <div v-if="page" class="projects projects--inspiration">
    <div class="project" v-for="post in filteredPosts" :key="post.id">
      <div class="project__title">{{ post.title.rendered }}</div>
      <img class="project__image" :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url" :alt="post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered">
      <transition name="modal">

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
import Post from "@/types/Post";
import {
  mapGetters,
} from 'vuex';

@Component({
  mixins: [GetPageMxn],
  computed: {
    ...mapGetters({
      filterPosts: '_posts/filterPosts',
      allPosts: '_posts/allPosts',
      getPage: '_page/getPage'
    })
  }
})
export default class Inspiration extends Vue {
  private filteredPosts: Post = [];
  private filterPosts: any;
  private getPage: any;
  private page: any = null;

  created() {
    this.$store.dispatch('_posts/loadPosts').then(res => {
      this.filteredPosts = this.filterPosts(5);
    });
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/_projects";
</style>
