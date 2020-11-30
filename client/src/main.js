import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

import "@babel/polyfill";

Vue.use(VueApollo);

// Setup Apollo client
export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // include auth token with request made to backend
  fetchOptions: {
    credentials: "include",
  },
  // we send to backend using the request pty
  request: (operation) => {
    // if we don't have token in localStorage, add it with empty value
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }

    // operation adds the token to the authorization header,
    // which is sent to backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[networkError]", networkError);
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  },
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: (h) => h(App),
  // add lifecycle methods, created
  created() {
    // when app is created we execute getCurrentUser query
    // in every page refresh
    this.$store.dispatch("getCurrentUser");
  },
}).$mount("#app");
