import Header from '@/components/header.vue';
import { mount } from '@vue/test-utils';

describe('Header', () => {
  it('is a Vue component', () => {
    const wrapper = mount(Header);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
