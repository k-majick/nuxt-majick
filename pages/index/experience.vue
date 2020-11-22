<template>
<section class="main__section" v-if="page.content">
  <div class="main__content" v-html="page.content.rendered"></div>
  <div class="main__content">
    <table class="experience__table">
      <tbody>
        <span class="experience__bar">
          <span class="experience__tip"></span>
        </span>
      </tbody>
      <tbody>
        <tr v-for="workplace in page.acf.workplaces" :key="workplace.name" v-bind:class="{ hilite: workplace.highlighted }">
          <th scope="col" v-html="workplace.date"></th>
          <th scope="col">{{ workplace.name }}<br><i>{{ workplace.position }}</i></th>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="main__content">
    <div class="counter">
      <span class="counter__text">
        <span class="counter__value" v-html="counter('y')"></span>&nbsp;years
        <span v-if="counter('c')">and&nbsp;
          <span class="counter__value" v-html="counter('m')"></span>&nbsp;month
        </span>
        <span v-if="counter('d')">and&nbsp;
          <span class="counter__value" v-html="counter('m')"></span>&nbsp;months
        </span>
      </span>
    </div>
    <div v-html="page.excerpt.rendered"></div>
  </div>
</section>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import GetPageMxn from "@/mixins/getPageMxn";

@Component({
  mixins: [GetPageMxn]
})
export default class Experience extends mixins(GetPageMxn) {
  counter(what: string) {
    const now = new Date().valueOf();
    const countFrom = new Date('sep,01,2015,00:00:00').valueOf();
    const diff = (now - countFrom);
    const day = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / day);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);
    const diffMonths = Math.floor(months % 12) + 1;
    if (what == 'y') {
      return years
    } else if (diffMonths === 0) {
      return false
    } else if (diffMonths === 1 && what == 'c') {
      return true
    } else if (diffMonths > 1 && what == 'd') {
      return true
    } else if (what == 'm') {
      return diffMonths
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/components/_experience";
@import "../../assets/scss/components/_counter";
</style>
