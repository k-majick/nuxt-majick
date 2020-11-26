import { shallowMount } from '@vue/test-utils';
import Header from '@/components/header.vue';

describe('Header', () => {

  it('is a Vue component', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders name and message', () => {
    const wrapper = shallowMount(Header, {
      data: function() {
        return {
          name: "Johny Tester",
          message: "Test me!"
        }
      }
    });
    expect(wrapper.find(".header__title").text()).toBe("Johny Tester");
    expect(wrapper.find(".avatar__message--mobile").text()).toBe("Test me!");
  });

  it('has required headers', () => {
    const wrapper = shallowMount(Header, {
      data: function() {
        return {
          name: "Johny Tester",
          message: "Test me!"
        }
      }
    });
    expect(wrapper.findAll('h1').length).toEqual(1);
    expect(wrapper.findAll('h2').length).toEqual(2);
  });

});
