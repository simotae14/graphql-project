import Vue from "vue";
import Vuex from "vuex";

import { gql } from "apollo-boost";
import { defaultClient as apolloClient } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    // to retrieve data from gql
    getPosts: ({ commit }) => {
      // trigger loading
      commit("setLoading", true);
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
              }
            }
          `,
        })
        .then(({ data }) => {
          // Get data from the actions and save into the state via mutations
          // commit passes data from actions to the mutation function
          commit("setPosts", data.getPosts);
          // disabled loading
          commit("setLoading", false);
        })
        .catch((err) => {
          // disabled loading
          commit("setLoading", false);
          console.error(err);
        });
    },
  },
  modules: {},
  // to pass data from the state back to the component
  getters: {
    posts: (state) => state.posts,
    loading: (state) => state.loading,
  },
});
