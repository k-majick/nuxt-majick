import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/nav.vue';

// jest.mock('axios', () => ({
//   get: Promise.resolve('value')
// }))

describe('Nav', () => {
  const wrapper = shallowMount(Nav);

  it('is a Vue component', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // it('has method', () => {
  //   expect((wrapper.vm as any).getNav).toBeTruthy();
  // });

});
