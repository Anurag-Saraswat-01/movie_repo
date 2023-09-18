<template>
  <div class="q-pa-lg">
    <MovieGrid :movies="movies" :loading="loading" @rate="getData" />
  </div>
</template>

<script>
export { default } from "./IndexPage";
</script>
