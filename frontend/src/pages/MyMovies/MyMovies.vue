<template>
  <q-page padding>
    <div class="q-pa-lg">
      <MovieGrid
        my-movies
        :movies="movies"
        :loading="loading"
        @rate="getData"
        @update="getData"
      />
    </div>
  </q-page>
</template>

<script>
export { default } from "./MyMovies";
</script>
