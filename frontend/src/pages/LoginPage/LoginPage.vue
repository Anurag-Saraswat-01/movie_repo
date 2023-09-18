<template>
  <div>
    <h4 class="flex flex-center">Log In</h4>
    <div class="flex column flex-center q-gutter-sm">
      <q-banner v-if="error" class="bg-red text-white" rounded dense>
        <template v-slot:avatar>
          <q-icon name="error" />
        </template>
        {{ errorMessage }}</q-banner
      >
      <q-form
        class="q-gutter-sm flex column justify-center"
        @submit="handleSubmit"
      >
        <q-input
          outlined
          v-model="username"
          label="Username"
          :rules="error === false || [(val) => !!val || 'Username is required']"
        />
        <q-input
          outlined
          v-model="password"
          label="Password"
          type="password"
          :rules="error === false || [(val) => !!val || 'Password is required']"
        />
        <q-btn
          class="q-mx-auto"
          label="Submit"
          type="submit"
          color="primary"
          :disabled="disabled"
        />
        <div>
          Don't have an account?
          <router-link to="/signup">Register here</router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export { default } from "./LoginPage";
</script>
