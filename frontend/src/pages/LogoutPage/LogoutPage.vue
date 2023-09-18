<template>
  <div class="logout-container">
    <h1 class="logout-header">Logged out successfully.</h1>
    <router-link class="login-link" to="/login">Login again?</router-link>
  </div>
</template>

<script>
export { default } from "./LogoutPage";
</script>

<style scoped lang="scss">
@import "./LogoutPage.scss";
</style>
