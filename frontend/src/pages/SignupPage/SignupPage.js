export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const res = await this.$api.post("user/register", {
          username: this.username,
          password: this.password,
        });
        console.log(res);
        alert(res.data.message);
        this.username = "";
        this.password = "";
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
      }
    },
  },
};
