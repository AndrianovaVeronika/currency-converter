import {beforeEach, describe, expect, it} from "vitest";
import App from "./App.vue";
import {mount, Wrapper} from "@vue/test-utils";
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
// import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.vue";

//testing behavior of App component
describe('App', () => {
  let wrapper: Wrapper<App>;

  beforeEach(() => {
    // Mounting App
    wrapper = mount(App, {
      global: {
        plugins: [i18n, vuetify],
      },
    } as any);
  });

  it('renders correctly', function () {
    expect(wrapper).toBeDefined();
  });

  it('switches the theme on button click', () => {
    //finding button with id=themeSwitchBtn
    const themeButton = wrapper.find('#themeSwitchBtn');
    expect(wrapper.vm.$data.theme).toEqual('light');

    //trigger click so that theme switches to 'dark'
    themeButton.trigger('click');
    expect(wrapper.vm.$data.theme).toEqual('dark');

    //trigger click one more time so that theme switches back to 'light'
    themeButton?.trigger('click');
    expect(wrapper.vm.$data.theme).toEqual('light');
  });

  it('switches the locale on button click', () => {
    //finding button with id=languageSwitchBtn
    const localeButton = wrapper.find('#languageSwitchBtn');
    expect(wrapper.vm.$i18n.locale).toBe('en');

    //trigger click so that language switches to 'de'
    localeButton.trigger('click');
    expect(wrapper.vm.$i18n.locale).toBe('de');

    //trigger click one more time so that language switches back to 'en'
    localeButton.trigger('click');
    expect(wrapper.vm.$i18n.locale).toBe('en');
  });
});
