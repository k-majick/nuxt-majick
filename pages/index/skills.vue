<template>
<section class="main__section" v-if="page.content">
  <div class="main__content" v-html="page.content.rendered"></div>
  <div class="main__content">
    <div class="skill" v-for="skill in page.acf.skills" :key="skill.title">
      <div class="skill__title">{{ skill.title }}</div>
      <div class="skill__bar" :style="skillStyle(skill.value)"></div>
      <div class="skill__percent">{{ skill.value }}%</div>
    </div>
  </div>
  <div class="main__content" v-html="page.excerpt.rendered"></div>
  <div class="technology__container" v-html="splitStr(this.page.acf.technologies)"></div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';
import GetPageMxn from "@/mixins/getPageMxn";
import Post from '@/types/Post';

@Component({
  mixins: [GetPageMxn]
})
export default class Skills extends Vue {
  public page: Post = [];

  skillStyle(v: number) {
    return {
      'width': v + '%'
    }
  }

  splitStr(str: string) {
    return str.split(' ').map(n => '<span class="technology">' + n + '</span>').join('');
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/components/_skills";
@import "../../assets/scss/components/_technology";
@keyframes skillBar {
    0% {
        width: 0;
    }
    100% {
        width: --max-width;
    }
}
.skill__bar {
    max-width: var(--max-width);
}
</style>
