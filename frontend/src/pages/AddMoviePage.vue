<template>
  <div>
    <AddDialog
      :showAddDialog="showAddDialog"
      @show-closed="onShowClose"
      :addValueMode="addValueMode"
      :addValue="addValue"
    />
    <h4 class="flex flex-center">Add Movie</h4>
    <div class="flex flex-center">
      <q-form
        class="q-gutter-md flex column justify-center"
        @submit.prevent="handleSubmit"
      >
        <q-input outlined v-model="movie_name" label="Movie Title" />
        <DatePicker @date-change="onDateChange" />
        {{ director }}
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
        />
        <q-select
          outlined
          multiple
          use-input
          use-chips
          input-debounce="0"
          v-model="genres"
          :options="filteredGenreOptions"
          @filter="filterGenres"
          label="Genres"
        />
        <q-select
          outlined
          single
          v-model="rated"
          :options="ratedOptions"
          label="Rating"
        />
        <q-input
          outlined
          v-model="runtime"
          type="number"
          label="Runtime (in minutes)"
        />
        <q-btn label="Submit" type="submit" color="primary" />
      </q-form>
    </div>
  </div>
</template>

<script>
import DatePicker from "src/components/DatePicker.vue";
import axios from "axios";
import AddDialog from "src/components/AddDialog.vue";

export default {
  name: "AddMoviePage",
  data() {
    return {
      movie_name: "",
      director_id: null,
      release_date: "",
      rated: null,
      runtime: null,
      genres: null,
      director: null,
      genreOptions: [],
      directorOptions: [],
      filteredGenreOptions: [],
      filteredDirectorOptions: [],
      ratedOptions: ["G", "PG", "PG-13", "R", "NC-17"],
      showAddDialog: false,
      addValueMode: null,
      addValue: null,
    };
  },
  methods: {
    onDateChange(date) {
      this.release_date = date;
    },
    onShowClose() {
      this.showAddDialog = false;
    },
    handleSubmit() {
      const movieData = {
        movie_name: this.movie_name,
        release_date: this.release_date,
        rated: this.rated,
        director_id: this.director.value,
        genre_id_list: this.genres.map((genre) => genre.value),
      };
      console.log({ movieData });
    },
    filterDirectors(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.filteredDirectorOptions = this.directorOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterGenres(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.filteredGenreOptions = this.genreOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async getGenres() {
      try {
        let result = await axios.get("http://localhost:3000/movies/genres");
        this.genreOptions = result.data;
        this.filteredGenreOptions = result.data;
        console.log(this.genreOptions);
      } catch (error) {
        console.error(error);
      }
    },
    async getDirectors() {
      try {
        let result = await axios.get("http://localhost:3000/movies/directors");
        this.directorOptions = result.data;
        this.filteredDirectorOptions = result.data;
        console.log(this.directorOptions);
      } catch (error) {
        console.error(error);
      }
    },
    createNewDirector(val, done) {
      this.addValueMode = "Director";
      this.addValue = val;
      console.log(this.addValueMode, this.addValue);
      this.showAddDialog = true;
      done(val);
    },
  },
  mounted() {
    this.getDirectors();
    this.getGenres();
  },
  components: { DatePicker, AddDialog },
};
</script>
