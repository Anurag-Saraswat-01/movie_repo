<template>
  <q-layout view="hHh Lpr lFf">
    <AppHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export { default } from "./MainLayout";
</script>

<style lang="scss" scoped>
@import "./MainLayout.scss";
</style>
