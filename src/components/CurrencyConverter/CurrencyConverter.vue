<template>
  <v-container>
    <v-card class="d-inline-flex flex-column card">
      <v-card-title>
        <h2>{{ $t('currencyConverter.title') }}</h2>
      </v-card-title>
      <div class="d-flex flex-column align-center">
        <div class="d-flex flex-row">
          <v-text-field
            v-model="inputAmount"
            :label="$t('currencyConverter.inputFieldTitle')"
            class="card-content-field"
            type="number"
          />
          <v-select
            v-model="convertFrom"
            :items="currencies"
            :label="$t('currencyConverter.fromCurrencySelectTitle')"
            class="card-content-field"
          />
        </div>
        <v-btn @click="swapCurrencies()" icon="mdi-swap-vertical" variant="text"/>
        <div class="d-flex flex-row">
          <v-text-field
            v-model="resultAmount"
            :label="$t('currencyConverter.outputFieldTitle')"
            readonly
            class="card-content-field"
            type="number"
          />
          <v-select
            v-model="convertTo"
            :items="currencies"
            :label="$t('currencyConverter.toCurrencySelectTitle')"
            class="card-content-field"
          />
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const inputAmount = ref(0);
    const resultAmount = ref(0);
    const convertFrom = ref('USD');
    const convertTo = ref('EUR');
    const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

    async function convert(amount: number, fromCurrency: string, toCurrency: string): number {
      console.log('convert invoked')
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const rates = response.data.rates;
        if (toCurrency in rates) {
          return (amount * rates[toCurrency]).toFixed(2);
        } else {
          throw new Error('Invalid currency selected.');
        }
      } catch (error) {
        return Number.MIN_VALUE;
      }
    }

    function swapCurrencies() {
      const temp = convertFrom.value;
      convertFrom.value = convertTo.value;
      convertTo.value = temp;
    }

    watch([inputAmount, convertFrom, convertTo], async ([newInputAmount, newConvertFrom, newConvertTo]) => {
      if (!newInputAmount) {
        inputAmount.value = 0
      }
      resultAmount.value = await convert(newInputAmount, newConvertFrom, newConvertTo);
    });

    return {
      inputAmount,
      resultAmount,
      convertFrom,
      convertTo,
      currencies,
      swapCurrencies,
    };
  },
  // watch: {
  //   async inputAmount(newInputAmount) {
  //     if (!newInputAmount) this.inputAmount = 0;
  //     this.resultAmount = await this.convert(newInputAmount, this.convertFrom, this.convertTo);
  //   },
  //   async convertFrom(newConvertFrom) {
  //     this.resultAmount = await this.convert(this.inputAmount, newConvertFrom, this.convertTo);
  //   },
  //   async convertTo(newConvertTo) {
  //     this.resultAmount = await this.convert(this.inputAmount, this.convertFrom, newConvertTo);
  //   }
  // },
});
</script>

<style>
@import "./style.css";
</style>
