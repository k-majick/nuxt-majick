import { Vue } from 'vue-property-decorator';

interface Binding extends Object {
  // eslint-disable-next-line
  value?: any;
}

export const scrollProgress = {
  inserted: (el: HTMLElement, binding: Binding, vnode: any) => {
    const navComponent = binding.value.navComponent as Vue;
    const nav = navComponent.$refs.nav as HTMLElement;
    const handleScroll = () => {
      const progress = Math.round((window.pageYOffset / el.offsetHeight) * 100);
      progress > 90 ? nav.classList.add('activated') : nav.classList.remove('activated');

      if (progress > 5 && vnode.context.$route.path === '/') {
        vnode.context.$router.push({
          path: '/skills'
        });
      }

    }
    window.addEventListener('scroll', handleScroll);
  }
}

Vue.directive('hover-message', scrollProgress);
