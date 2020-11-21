<template>
  <v-app style="background: #E3E3EE">
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link style="cursor: pointer" to="/" tag="span">
          <h1 class="title pl-3">
            VueTaeShare
          </h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- Side Navbar Links -->
      <v-list>
        <v-list-item
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
          ripple
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- Horizontal Navbar -->
    <v-app-bar fixed dark color="primary">
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <!-- App Title -->
        <router-link style="cursor: pointer" to="/" tag="span"
          >VueTaeShare</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Search Input -->
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- App Content -->
    <main>
      <v-container class="mt-12">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        {
          icon: "chat",
          title: "Posts",
          link: "/posts",
        },
        {
          icon: "lock_open",
          title: "Sign In",
          link: "/signin",
        },
        {
          icon: "create",
          title: "Sign Up",
          link: "/signup",
        },
      ];
    },
    sideNavItems() {
      return [
        {
          icon: "chat",
          title: "Posts",
          link: "/posts",
        },
        {
          icon: "lock_open",
          title: "Sign In",
          link: "/signin",
        },
        {
          icon: "create",
          title: "Sign Up",
          link: "/signup",
        },
      ];
    },
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
