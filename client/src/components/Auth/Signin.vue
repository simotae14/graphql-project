<template>
  <v-container text-center mt-5 pt-5>
    <!-- Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>
          Welcome Back!
        </h1>
      </v-flex>
    </v-layout>
    <!-- Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form @submit.prevent="handleSigninUser">
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    prepend-icon="face"
                    label="Username"
                    type="text"
                    required
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="extension"
                    label="Password"
                    type="password"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-btn color="secondary" type="submit">Signin</v-btn>
                  <h3>
                    Already have an account?
                    <router-link to="/signup">Signup</router-link>
                  </h3>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Signin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  // to dispatch a signin user
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
