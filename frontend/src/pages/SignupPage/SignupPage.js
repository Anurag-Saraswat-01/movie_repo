export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      password: "",
      status: null,
      message: "",
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
        const res = await this.$api.post("user/register", {
          username: this.username,
          password: this.password,
        });
        console.log(res);
        // alert(res.data.message);
        this.status = true;
        this.message = res.data.message;
        this.username = "";
        this.password = "";
      } catch (error) {
        console.error(error);
        // alert(error.response.data.message);
        this.status = false;
        this.message = error.response.data.message;
      }
    },
  },
};
