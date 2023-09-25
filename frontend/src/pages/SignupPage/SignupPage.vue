<template>
  <q-page padding>
    <div class="form-container absolute-center">
      <h1 class="form-heading">SIGNUP</h1>
      <q-banner
        class="form-banner"
        :class="status === true ? 'success' : 'error'"
        rounded
        dense
        v-if="status !== null"
      >
        <template v-slot:avatar>
          <q-icon :name="status === true ? 'check' : 'error'" />
        </template>
        <div>
          {{ message }}
          <router-link v-if="status" class="form-link" to="/login"
            >Login?</router-link
          >
        </div>
      </q-banner>
      <q-form class="form" @submit="handleSubmit">
        <q-input
          class="form-input"
          standout
          color="primary"
          dark
          v-model="username"
          label="Username"
          :rules="status === true || [(val) => !!val || 'Username is required']"
        />
        <q-input
          class="form-input"
          standout
          color="primary"
          dark
          v-model="password"
          label="Password"
          type="password"
          :rules="status === true || [(val) => !!val || 'Password is required']"
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
        Already have an account?
        <router-link class="form-link" to="/login">Login here</router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
export { default } from "./SignupPage";
</script>

<style lang="scss" scoped>
@import "./SignupPage.scss";
</style>
