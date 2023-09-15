<template>
  <div>
    <h4 class="flex flex-center">Sign Up</h4>
    <div class="flex column flex-center q-gutter-sm">
      <q-banner
        v-if="status !== null"
        class="text-white"
        :class="status === true ? 'bg-green' : 'bg-red'"
        rounded
        dense
      >
        <template v-slot:avatar>
          <q-icon :name="status === true ? 'check' : 'error'" />
        </template>
        <div>
          {{ message }}
          <router-link v-if="status" to="/login">Login</router-link>
        </div>
      </q-banner>
      <q-form
        class="q-gutter-sm flex column justify-center"
        @submit="handleSubmit"
      >
        <q-input
          outlined
          v-model="username"
          label="Username"
          :rules="status === true || [(val) => !!val || 'Username is required']"
        />
        <q-input
          outlined
          v-model="password"
          label="Password"
          type="password"
          :rules="status === true || [(val) => !!val || 'Password is required']"
        />
        <q-btn
          class="q-mx-auto"
          label="Submit"
          type="submit"
          color="primary"
          :disabled="disabled"
        />
        <div>
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export { default } from "./SignupPage";
</script>
