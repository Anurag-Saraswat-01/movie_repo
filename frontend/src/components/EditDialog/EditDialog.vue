<template>
  <AddDialog
    v-if="showAddDialog"
    :addValueMode="addValueMode"
    :addValue="addValue"
    @show-closed="onShowClose"
    @value-added="onValueAdded"
  />
  <q-dialog v-model="show" @hide="$emit('hide')">
    <q-card dark flat bordered class="edit-card">
      <q-form class="edit-form" @submit.prevent="handleSubmit">
        <!-- movie name -->
        <q-input
          v-if="editColumn === 'movie_name'"
          class="edit-input"
          standout
          dark
          v-model="inputValue"
          label="Title"
        />
        <!-- director -->
        <q-select
          v-if="editColumn === 'director_name'"
          class="edit-input"
          standout
          dark
          single
          use-input
          input-debounce="0"
          v-model="inputValue"
          :options="filteredDirectorOptions"
          @filter="filterDirectors"
          @new-value="createNewDirector"
          label="Director"
        />
        <!-- release date -->
        <DatePicker
          v-if="editColumn === 'release_date'"
          :release-date="inputValue"
          @date-change="onDateChange"
        />
        <!-- MPA Film Rating -->
        <q-select
          v-if="editColumn === 'rated'"
          class="edit-input"
          standout
          dark
          single
          v-model="inputValue"
          :options="ratedOptions"
          label="MPA Film Rating"
        />
        <!-- runtime -->
        <q-input
          v-if="editColumn === 'runtime'"
          class="edit-input"
          standout
          dark
          v-model="inputValue"
          label="Runtime"
          type="number"
        />
        <q-select
          v-if="editColumn === 'genres'"
          class="edit-input"
          standout
          dark
          multiple
          use-input
          input-debounce="0"
          v-model="inputValue"
          :options="filteredGenreOptions"
          @filter="filterGenres"
          @new-value="createNewGenre"
          label="Genres"
        />
        <q-btn
          outline
          color="primary"
          class="edit-btn"
          type="submit"
          label="Update"
        />
      </q-form>
      <!-- director -->
    </q-card>
  </q-dialog>
</template>

<script>
export { default } from "./EditDialog";
</script>

<style scoped lang="scss">
@import "./EditDialog.scss";
</style>
