/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// import '@mdi/font'
import '@mdi/js';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {createVuetify} from "vuetify/dist/vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light'
    // themes: {
    //   light: {
    //     colors: {
    //       primary: '#FFFFFF',
    //       secondary: '#5CBBF6',
    //     },
    //   },
    //   // dark: {
    //   //   colors: {
    //   //     primary: '#FFFFFF',
    //   //     secondary: '#1867C0',
    //   //   },
    //   // },
    // },
  },
})
