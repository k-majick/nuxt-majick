import { Vue } from 'vue-property-decorator';

interface Binding extends Object {
  value?: string;
}

export const hoverMessage = {
  bind(el: HTMLElement, binding: Binding) {
    const msgBox = el.children[0] as HTMLElement;
    const msg = binding.value;

    el.addEventListener('mouseenter', () => {
      msgBox.innerHTML = msg as string;
      msgBox.classList.add('show');
    });

    el.addEventListener('mousemove', e => {
      msgBox.style.top = `calc(${e.offsetY}px + 30px)`;
      msgBox.style.left = `calc(${e.offsetX}px + 30px)`;
    });

    el.addEventListener('mouseleave', () => {
      msgBox.innerHTML = '';
      msgBox.classList.remove('show');
    });
  }
}

Vue.directive('hover-message', hoverMessage);
