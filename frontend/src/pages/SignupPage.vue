<template>
  <div>
    <h4 class="flex flex-center">Sign Up</h4>
    <div class="flex flex-center">
      <q-form class="q-gutter-md flex column justify-center" @submit="handleSubmit">
        <q-input outlined v-model="username" label="Username" />
        <q-input outlined v-model="password" label="Password" type="password" />
        <q-btn label="Submit" type="submit" color="primary" />
        <div>
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>

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
</script>
