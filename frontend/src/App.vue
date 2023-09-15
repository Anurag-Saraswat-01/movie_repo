<template>
  <router-view />
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      user: null,
    };
  },
  mounted() {
    const user = sessionStorage.getItem("movie_repo_user");
    if (user) {
      this.toggleLoggedIn();
      this.setUser(JSON.parse(user));
    }
  },
  provide() {
    return {
      isLoggedIn: computed(() => this.isLoggedIn),
      user: computed(() => this.user),
      toggleLoggedIn: this.toggleLoggedIn,
      setUser: this.setUser,
    };
  },
  methods: {
    toggleLoggedIn() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    setUser(user) {
      this.user = user;
    },
  },
});
</script>
