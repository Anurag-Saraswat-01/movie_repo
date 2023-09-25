<template>
  <q-page padding>
    <div class="form-container absolute-center">
      <h1 class="form-heading">LOGIN</h1>

      <q-banner class="form-banner" v-if="error" rounded dense>
        <template v-slot:avatar>
          <q-icon name="error" />
        </template>
        {{ errorMessage }}</q-banner
      >
      <q-form class="form" @submit="handleSubmit">
        <q-input
          class="form-input"
          standout
          color="primary"
          dark
          v-model="username"
          label="Username"
          :rules="error === false || [(val) => !!val || 'Username is required']"
        />
        <q-input
          class="form-input"
          standout
          color="primary"
          dark
          v-model="password"
          label="Password"
          type="password"
          :rules="error === false || [(val) => !!val || 'Password is required']"
        />
        <q-btn
          outline
          class="q-mx-auto"
          label="Submit"
          type="submit"
          color="primary"
          :disabled="disabled"
        />
      </q-form>
      <div>
        Don't have an account?
        <router-link class="form-link" to="/signup">Register here</router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
export { default } from "./LoginPage";
</script>

<style lang="scss" scoped>
@import "./LoginPage.scss";
</style>
