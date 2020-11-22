import { Vue, Component } from 'nuxt-property-decorator';

declare module 'vue/types/vue' {
  interface Vue {
    scrollTo(name: string, parentRefName: string): void;
  }
}

@Component
export default class ScrollToMxn extends Vue {

  scrollTo(name: string, parentRefName: string) {
    let target!: HTMLElement;

    if (parentRefName) {
      const parentRef = this.$parent.$refs[`${parentRefName}`] as Vue;
      target = parentRef.$refs[`${name}`] as HTMLElement;
    } else {
      target = this.$parent.$refs[`${name}`] as HTMLElement;
    }

    (target as HTMLElement).scrollIntoView({
      behavior: "smooth"
    });
  }

}
