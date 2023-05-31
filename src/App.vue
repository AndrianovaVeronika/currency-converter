<template>
  <v-app>
    <v-main>
      <v-container>
        <CurrencyConverter />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.vue';

export default {
  components: {
    CurrencyConverter,
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
