import {createI18n} from "vue-i18n";
import de from "../../public/locales/de.json";
import en from "../../public/locales/en.json";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {de, en}
});

export default i18n;
