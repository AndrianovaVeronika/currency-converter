<template>
  <v-theme-provider :theme="theme">
    <v-app>
      <v-main>
        <v-container>
          <v-btn @click="switchTheme" icon="mdi-theme-light-dark" variant="text"/>
          <CurrencyConverter/>
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.vue';
// import { useTheme } from 'vuetify'

export default {
  components: {
    CurrencyConverter,
  },
  data() {
    return {
      theme: "light"
    }
  },
  methods: {
    switchTheme() {
      // this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark'
      switch (this.theme) {
        case "light":
          this.theme = "dark";
          break;
        case "dark":
          this.theme = "light";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
