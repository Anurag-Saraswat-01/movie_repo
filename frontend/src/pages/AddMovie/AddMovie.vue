<template>
  <AddDialog
    v-if="showAddDialog"
    :addValueMode="addValueMode"
    :addValue="addValue"
    @show-closed="onShowClose"
    @value-added="onValueAdded"
  />
  <div class="form-container absolute-center">
    <h1 class="form-heading">Add Movie</h1>
    <q-banner
      class="form-banner"
      :class="status === true ? 'success' : 'error'"
      rounded
      dense
      v-if="status !== null"
    >
      <template v-slot:avatar>
        <q-icon :name="status === true ? 'check' : 'error'" />
        <div class="form-banner-message">{{ message }}</div>
      </template>
    </q-banner>
    <q-form class="form" @submit.prevent="handleSubmit" @reset="handleReset">
      <!-- movie name -->
      <q-input
        class="form-input"
        standout
        color="primary"
        dark
        v-model="movie_name"
        label="Movie Title"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <!-- release date -->
      <DatePicker :release-date="release_date" @date-change="onDateChange" />
      <!-- director -->
      <q-select
        class="form-input"
        standout
        color="primary"
        dark
        single
        use-input
        input-debounce="0"
        v-model="director"
        :options="filteredDirectorOptions"
        @filter="filterDirectors"
        @new-value="createNewDirector"
        label="Director"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <!-- genre -->
      <q-select
        class="form-input"
        standout
        color="primary"
        dark
        multiple
        use-input
        input-debounce="0"
        v-model="genres"
        :options="filteredGenreOptions"
        @filter="filterGenres"
        @new-value="createNewGenre"
        label="Genres"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <!-- MPA Film Rating -->
      <q-select
        class="form-input"
        standout
        color="primary"
        dark
        single
        v-model="rated"
        :options="ratedOptions"
        label="MPA Film Rating"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <!-- runtime -->
      <q-input
        class="form-input"
        standout
        color="primary"
        dark
        v-model="runtime"
        type="number"
        label="Runtime (in minutes)"
        :rules="[(val) => !!val || 'Field is required']"
      />
      <!-- image -->
      <q-file
        class="form-input file-input"
        standout
        color="primary"
        dark
        v-model="poster"
        label="Movie Poster"
        accept=".jpg, .png, image/*"
        style="max-width: 300px"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="image" />
        </template>
      </q-file>
      <!-- submit btn -->
      <div class="form-button-group">
        <q-btn
          outline
          label="Submit"
          type="submit"
          color="primary"
          :disabled="disabled"
        />
        <q-btn outline label="Reset" type="reset" color="primary" />
        <q-btn outline to="/" label="Cancel" color="negative" />
      </div>
    </q-form>
  </div>
</template>

<script>
export { default } from "./AddMovie";
</script>

<style lang="scss">
@import "./AddMovie.scss";
</style>
