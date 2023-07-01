import {beforeEach, describe, expect, it, vi} from 'vitest';
import CurrencyConverter from './CurrencyConverter.vue';
import axios from "axios";
import {mount, Wrapper, config} from "@vue/test-utils";
import i18n from "../../plugins/i18n";
import vuetify from "../../plugins/vuetify";

vi.mock('axios');

//testing behavior of CurrencyConverter component
describe('CurrencyConverter', () => {
  let wrapper: Wrapper<CurrencyConverter>;

  beforeEach(() => {
    //mounting CurrencyConverter
    wrapper = mount(CurrencyConverter, {
      global: {
        plugins: [i18n, vuetify],
      }
    });
  })

  it('renders correctly', () => {
    expect(wrapper).toBeDefined();
  });

  it('updates the resultAmount when inputAmount changes', async () => {
    wrapper.setData({inputAmount: 10});
    //one tick is not enough
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.resultAmount).toBeGreaterThan(0);
  });

  it('updates the resultAmount when convertFrom changes', async () => {
    wrapper.setData({convertFrom: 'GBP'});
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.resultAmount).toBeGreaterThan(0);
  });

  it('updates the resultAmount when convertTo changes', async () => {
    wrapper.setData({convertTo: 'JPY'});
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.resultAmount).toBeGreaterThan(0);
  });

  it('swaps the convertFrom and convertTo currencies when swapCurrencies is called', () => {
    const initialConvertFrom = wrapper.vm.convertFrom;
    const initialConvertTo = wrapper.vm.convertTo;
    wrapper.vm.swapCurrencies();
    expect(wrapper.vm.convertFrom).toBe(initialConvertTo);
    expect(wrapper.vm.convertTo).toBe(initialConvertFrom);
  });
});

//testing convert method of CurrencyConverter
describe('CurrencyConverter: convert method', () => {
  let convert: ((amount: number, fromCurrency: string, toCurrency: string) => number) | undefined;

  beforeEach(() => {
    //retrieving convert method from CurrencyConverter component
    convert = CurrencyConverter.methods?.convert;
  });

  it('convert method defined', () => {
    expect(convert).toBeDefined();
  });

  it('returns the converted amount when a valid currency is selected', async () => {
    //defining mockedRates
    const mockedRates = {
      USD: 1.23,
      EUR: 0.89,
    };
    //creating mock responce for axios.get
    axios.get.mockResolvedValue({
      data: {
        rates: mockedRates,
      }
    });

    const amount = 10;
    const fromCurrency = 'USD';
    const toCurrency = 'EUR';
    const result = await convert?.(amount, fromCurrency, toCurrency);

    //checking if returned value is the one we were expecting
    expect(result).toBe((amount * mockedRates[toCurrency]).toFixed(2));
    //checking link which was used for axios.get to be the one we are expecting
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
  });

  it('convert returns Number.MIN_VALUE when error occurs', () => {
    //creating mock responce for axios.get
    axios.get.mockResolvedValue({data: {rates: {}}});

    expect(convert?.(10, "USD", "asdf"))
      .resolves.toEqual(Number.MIN_VALUE);
  });
});
