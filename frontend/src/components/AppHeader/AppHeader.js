export default {
  name: "AppHeader",
  inject: ["isLoggedIn", "user", "toggleLoggedIn", "setUser"],
  methods: {
    logout() {
      this.toggleLoggedIn();
      this.setUser(null);
      sessionStorage.removeItem("movie_repo_user");
    },
  },
};
