<template>
  <q-layout view="hHh Lpr lFf">
    <AppHeader />
    <q-page-container>
      <q-page class="q-pa-lg">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export { default } from "./MainLayout";
</script>
