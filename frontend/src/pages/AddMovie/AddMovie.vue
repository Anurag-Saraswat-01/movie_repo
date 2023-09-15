<template>
  <div>
    <AddDialog
      v-if="showAddDialog"
      @show-closed="onShowClose"
      :addValueMode="addValueMode"
      :addValue="addValue"
      @value-added="onValueAdded"
    />
    <h4 class="flex flex-center">Add Movie</h4>

    <div class="flex flex-center">
      <q-form
        class="q-gutter-md flex column justify-center"
        @submit.prevent="handleSubmit"
        @reset="handleReset"
      >
        <!-- movie name -->
        <q-input
          outlined
          v-model="movie_name"
          label="Movie Title"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <!-- release date -->
        <DatePicker :release-date="release_date" @date-change="onDateChange" />
        <!-- director -->
        <q-select
          outlined
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
          outlined
          multiple
          use-input
          use-chips
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
          outlined
          single
          v-model="rated"
          :options="ratedOptions"
          label="MPA Film Rating"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <!-- runtime -->
        <q-input
          outlined
          v-model="runtime"
          type="number"
          label="Runtime (in minutes)"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <!-- image -->
        <q-file
          outlined
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
        <div class="flex flex-row">
          <q-btn
            class="q-mx-auto"
            label="Submit"
            type="submit"
            color="primary"
            :disabled="disabled"
          />
          <q-btn class="q-mx-auto" label="Reset" type="reset" color="primary" />
          <q-btn to="/" class="q-mx-auto" label="Cancel" color="negative" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
export { default } from "./AddMovie";
</script>
