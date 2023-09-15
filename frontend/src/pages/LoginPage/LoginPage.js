export default {
  name: "LoginPage",
  inject: ["toggleLoggedIn", "setUser"],
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await this.$api.post("user/login", {
          username: this.username,
          password: this.password,
        });
        console.log(res.data);
        const user = { username: this.username, user_id: res.data.user_id };
        this.setUser(user);
        sessionStorage.setItem("movie_repo_user", JSON.stringify(user));
        this.toggleLoggedIn();
        // alert(res.data.message);
        this.$router.push("/");

        this.username = "";
        this.password = "";
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    },
  },
};
