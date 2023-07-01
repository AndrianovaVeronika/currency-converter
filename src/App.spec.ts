import {beforeEach, describe, expect, it} from "vitest";
import App from "./App.vue";
import {mount, Wrapper} from "@vue/test-utils";
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
// import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.vue";

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
    const themeButton = wrapper.find('#themeSwitchBtn');
    expect(wrapper.vm.$data.theme).toEqual('light');

    themeButton.trigger('click');
    expect(wrapper.vm.$data.theme).toEqual('dark');

    themeButton?.trigger('click');
    expect(wrapper.vm.$data.theme).toEqual('light');
  });

  it('switches the locale on button click', () => {
    const localeButton = wrapper.find('#languageSwitchBtn');
    expect(wrapper.vm.$i18n.locale).toBe('en');

    localeButton.trigger('click');
    expect(wrapper.vm.$i18n.locale).toBe('de');

    localeButton.trigger('click');
    expect(wrapper.vm.$i18n.locale).toBe('en');
  });
});
