<template>
  <MovieDetailsDialog v-if="showDialog" :id="showMovieId" @hide="onHide" />
  <q-table
    title="Movies"
    :rows="rows"
    :columns="columns"
    row-key="movie-id"
    :loading="loading"
    @row-click="onRowClick"
  />
</template>

<script>
export { default } from "./MovieGrid";
</script>
