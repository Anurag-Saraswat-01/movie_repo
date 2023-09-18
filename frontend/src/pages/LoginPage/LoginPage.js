export default {
  name: "LoginPage",
  inject: ["toggleLoggedIn", "setUser"],
  data() {
    return {
      username: "",
      password: "",
      error: null,
      errorMessage: "",
    };
  },
  computed: {
    disabled() {
      return this.username === "" || this.password === "";
    },
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
        this.error = false;
      } catch (error) {
        console.error(error);
        this.error = true;
        this.errorMessage = error.response.data.message;
      }
    },
  },
};
