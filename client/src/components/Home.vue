<template>
  <v-container>
    <h1>Home</h1>
    <div v-if="$apollo.loading">Loading...</div>
    <ul v-else v-for="post in posts" :key="post._id">
      <li>
        {{ post.title }}
        {{ post.imageUrl }}
        {{ post.description }}
      </li>
      <li>{{ post.likes }}</li>
    </ul>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      posts: [],
    };
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `,
      // to manipulate the data coming from the query
      result({ data, loading, networkStatus }) {
        if (!loading) {
          this.posts = data.getPosts;
        }
      },
      error(err) {
        console.error("[ERROR!!]", err);
        console.dir(err);
      },
    },
  },
};
</script>
