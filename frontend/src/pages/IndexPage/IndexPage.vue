<template>
  <q-page padding>
    <div class="q-pa-lg">
      <MovieGrid :movies="movies" :loading="loading" @rate="getData" />
    </div>
  </q-page>
</template>

<script>
export { default } from "./IndexPage";
</script>
