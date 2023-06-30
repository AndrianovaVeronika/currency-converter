<template>
  <v-theme-provider :theme="theme">
    <v-app>
      <v-main>
        <v-container>
          <v-btn @click="switchTheme" icon="mdi-theme-light-dark" variant="text"/>
          <v-btn @click="$i18n.locale = $i18n.locale === 'en' ? 'de' : 'en';" icon="mdi-translate" variant="text"/>
          <CurrencyConverter/>
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.vue';

export default {
  components: {
    CurrencyConverter,
  },
  data() {
    return {
      theme: "light",
      language: ""
    }
  },
  methods: {
    switchTheme(): never {
      this.theme = this.theme === "light" ? "dark" : "light";
    },
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
