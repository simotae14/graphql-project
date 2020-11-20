import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import it from "vuetify/es5/locale/it";

Vue.use(Vuetify, {
  theme: {
    primary: "#03a9f4",
    secondary: "#00bcd4",
    accent: "#2196f3",
    error: "#f44336",
    warning: "#CDDC39",
    info: "#3f51b5",
    success: "#4caf50",
  },
});

export default new Vuetify({
  lang: {
    locales: { it },
    current: "it",
  },
  icons: {
    iconfont: "md",
  },
});
