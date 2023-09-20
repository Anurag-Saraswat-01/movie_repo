<template>
  <MovieDetailsDialog
    v-if="showDialog"
    :id="showMovieId"
    @hide="onHide"
    @rate="$emit('rate')"
  />
  <q-table
    dark
    flat
    bordered
    title="MOVIE DASHBOARD"
    :rows="rows"
    :columns="columns"
    row-key="movie-id"
    :loading="loading"
    :filter="filter"
    :filter-method="filterRows"
    virtual-scroll
    style="max-height: 75vh"
    @row-click="onRowClick"
  >
    <template v-slot:top-right>
      <div class="flex q-gutter-sm">
        <q-select
          class="dropdown"
          dense
          filled
          color="primary"
          dark
          single
          use-input
          clearable
          input-debounce="0"
          v-model="filter.director"
          :options="filteredDirectorOptions"
          @filter="filterDirectors"
          label="Director"
        />
        <q-select
          class="dropdown"
          dense
          filled
          color="primary"
          dark
          multiple
          use-input
          clearable
          input-debounce="0"
          v-model="filter.genres"
          :options="filteredGenreOptions"
          @filter="filterGenres"
          label="Genres"
        />
        <q-input
          class="input"
          dense
          filled
          color="primary"
          dark
          v-model="filter.year"
          clearable
          input-debounce="0"
          type="number"
          label="Year"
          :rules="[(val) => val.match(/^[0-9]+$/) || 'Numbers only']"
        />
      </div>
    </template>
  </q-table>
</template>

<script>
export { default } from "./MovieGrid";
</script>

<style scoped lang="scss">
@import "./MovieGrid.scss";
</style>
