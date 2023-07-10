<template>
  <v-theme-provider :theme="theme">
    <v-app>
      <v-main>
        <v-container>
          <v-btn id="themeSwitchBtn" @click="switchTheme" icon="mdi-theme-light-dark" variant="text"/>
          <v-btn id="languageSwitchBtn" @click="$i18n.locale = $i18n.locale === 'en' ? 'de' : 'en';"
                 icon="mdi-translate" variant="text"/>
          <CurrencyConverter/>
        </v-container>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.vue';
import {ref, getCurrentInstance} from 'vue';

export default {
  components: {
    CurrencyConverter,
  },
  setup() {
    const theme = ref("light");
    const i18n = getCurrentInstance()?.appContext.config.globalProperties.$i18n;

    function switchTheme(): void {
      theme.value = theme.value === "light" ? "dark" : "light";
    }

    function toggleLocale(): void {
      i18n.locale.value = i18n.locale.value === 'en' ? 'de' : 'en';
    }

    return {
      theme,
      switchTheme,
      toggleLocale,
    };
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
