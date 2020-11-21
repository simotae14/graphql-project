import Vue from "vue";
import Vuex from "vuex";

import { gql } from "apollo-boost";
import { defaultClient as apolloClient } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
  },
  actions: {
    // to retrieve data from gql
    getPosts: ({ commit }) => {
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
          console.log(data.getPosts);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  modules: {},
  // to pass data from the state back to the component
  getters: {
    posts: (state) => state.posts,
  },
});
