<template>
  <MovieDetailsDialog
    v-if="!showEditDialog && showDetailsDialog"
    :id="showMovieId"
    @hide="onDetailsHide"
    @rate="$emit('rate')"
  />
  <EditDialog
    v-if="showEditDialog"
    :id="showMovieId"
    :editColumn="editColumn"
    :editValue="editValue"
    @hide="onEditHide"
    @update="$emit('update')"
  />
  <q-table
    dark
    flat
    bordered
    title="DASHBOARD"
    :rows="rows"
    :columns="columns"
    row-key="movie-id"
    :loading="loading"
    :filter="filter"
    :filter-method="filterRows"
    virtual-scroll
    style="max-height: 75vh"
    :rows-per-page-options="[10, 15, 25, 50, 0]"
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
          use-chips
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
    <template v-slot:body="props">
      <q-tr :props="props" @click="onRowClick(props.row)">
        <!-- movie name -->
        <q-td
          key="movie_name"
          :props="props"
          @mouseenter="hoverStates.movie_name = props.row.movie_id"
          @mouseleave="hoverStates.movie_name = null"
        >
          {{ props.row.movie_name }}
          <q-icon
            v-if="myMovies && hoverStates.movie_name === props.row.movie_id"
            class="edit-icon"
            @click="onEditClick(props.row, 'movie_name')"
            name="edit"
          />
        </q-td>
        <!-- director name -->
        <q-td
          key="director_name"
          :props="props"
          @mouseenter="hoverStates.director_name = props.row.movie_id"
          @mouseleave="hoverStates.director_name = null"
        >
          {{ props.row.director_name }}
          <q-icon
            v-if="myMovies && hoverStates.director_name === props.row.movie_id"
            class="edit-icon"
            @click="onEditClick(props.row, 'director_name')"
            name="edit"
          />
        </q-td>
        <!-- release-date -->
        <q-td
          key="release_date"
          :props="props"
          @mouseenter="hoverStates.release_date = props.row.movie_id"
          @mouseleave="hoverStates.release_date = null"
        >
          {{ parseInt(props.row.release_date.slice(0, 4)) }}
          <q-icon
            v-if="myMovies && hoverStates.release_date === props.row.movie_id"
            class="edit-icon"
            @click="onEditClick(props.row, 'release_date')"
            name="edit"
          />
        </q-td>
        <!-- rated -->
        <q-td
          key="rated"
          :props="props"
          @mouseenter="hoverStates.rated = props.row.movie_id"
          @mouseleave="hoverStates.rated = null"
        >
          {{ props.row.rated }}
          <q-icon
            v-if="myMovies && hoverStates.rated === props.row.movie_id"
            class="edit-icon"
            @click="onEditClick(props.row, 'rated')"
            name="edit"
          />
        </q-td>
        <!-- runtime -->
        <q-td
          key="runtime"
          :props="props"
          @mouseenter="hoverStates.runtime = props.row.movie_id"
          @mouseleave="hoverStates.runtime = null"
        >
          {{ props.row.runtime }}
          <q-icon
            v-if="myMovies && hoverStates.runtime === props.row.movie_id"
            class="edit-icon"
            @click="onEditClick(props.row, 'runtime')"
            name="edit"
          />
        </q-td>
        <!-- genres -->
        <q-td
          key="genres"
          :props="props"
          @mouseenter="hoverStates.genres = props.row.movie_id"
          @mouseleave="hoverStates.genres = null"
        >
          {{ props.row.genres }}
          <q-icon
            v-if="myMovies && hoverStates.genres === props.row.movie_id"
            class="edit-icon"
            @click="onEditClick(props.row, 'genres')"
            name="edit"
          />
        </q-td>
        <!-- avg_rating -->
        <q-td
          key="avg_rating"
          style="display: flex; align-items: center; justify-content: center"
        >
          {{ props.row.avg_rating || "No ratings yet" }}
          <q-icon v-if="props.row.avg_rating" name="star" color="orange" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export { default } from "./MovieGrid";
</script>

<style scoped lang="scss">
@import "./MovieGrid.scss";
</style>
