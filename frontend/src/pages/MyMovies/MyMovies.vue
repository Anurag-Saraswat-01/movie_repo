<template>
  <div class="q-pa-lg">
    <MovieGrid :movies="movies" :loading="loading" @rate="getData" my-movies />
  </div>
</template>

<script>
export { default } from "./MyMovies";
</script>
