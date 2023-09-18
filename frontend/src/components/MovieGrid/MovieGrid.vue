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
    title="Movies"
    :rows="rows"
    :columns="columns"
    row-key="movie-id"
    :loading="loading"
    virtual-scroll
    style="max-height: 75vh"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="onRowClick(props.row)">
        <q-td key="movie_name">
          {{ props.row.movie_name }}
        </q-td>
        <q-td key="director_name"> {{ props.row.director_name }} </q-td>
        <q-td key="release_date">
          {{ props.row.release_date }}
        </q-td>
        <q-td key="rated"> {{ props.row.rated }} </q-td>
        <q-td key="runtime">
          {{ props.row.runtime }}
        </q-td>
        <q-td key="genres">
          {{ props.row.genres }}
        </q-td>
        <q-td key="avg_rating">
          {{ props.row.avg_rating }}
          <q-icon v-if="props.row.avg_rating" name="star" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export { default } from "./MovieGrid";
</script>
