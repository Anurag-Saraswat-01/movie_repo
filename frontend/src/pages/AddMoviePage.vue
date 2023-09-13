<template>
  <div>
    <AddDialog :showAddDialog="showAddDialog" @show-closed="onShowClose" :addValueMode="addValueMode" :addValue="addValue"
      @value-added="onValueAdded" />

    <h4 class="flex flex-center">Add Movie</h4>

    <div class="flex flex-center">
      <q-form class="q-gutter-md flex column justify-center" @submit.prevent="handleSubmit">
        <!-- movie name -->
        <q-input outlined v-model="movie_name" label="Movie Title" />
        <!-- release date -->
        <DatePicker @date-change="onDateChange" />
        <!-- director -->
        <q-select outlined single use-input input-debounce="0" v-model="director" :options="filteredDirectorOptions"
          @filter="filterDirectors" @new-value="createNewDirector" label="Director" />
        <!-- genre -->
        <q-select outlined multiple use-input use-chips input-debounce="0" v-model="genres"
          :options="filteredGenreOptions" @filter="filterGenres" @new-value="createNewGenre" label="Genres" />
        <!-- rated -->
        <q-select outlined single v-model="rated" :options="ratedOptions" label="Rating" />
        <!-- runtime -->
        <q-input outlined v-model="runtime" type="number" label="Runtime (in minutes)" />
        <!-- image -->
        <q-file outlined v-model="poster" label="Movie Poster" accept=".jpg, .png, image/*" style="max-width: 300px"
          clearable>
          <template v-slot:prepend>
            <q-icon name="image" />
          </template>
        </q-file>
        <!-- submit btn -->
        <q-btn class="q-mx-auto" label="Submit" type="submit" color="primary" />
      </q-form>
    </div>

  </div>
</template>

<script>
import DatePicker from "src/components/DatePicker.vue";
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
      genres: [],
      director: null,
      poster: null,
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
    async handleSubmit() {
      const movieData = {
        movie_name: this.movie_name,
        release_date: this.release_date,
        rated: this.rated,
        director_id: this.director && this.director.value,
        genre_id_list: this.genres && this.genres.map((genre) => genre.value),
        runtime: this.runtime
      };

      const formData = new FormData();
      formData.append("poster", this.poster)
      formData.append("movie_data", JSON.stringify(movieData))

      console.log(formData)

      try {
        let result = await this.$api.post('movies', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    filterDirectors(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filteredDirectorOptions = this.directorOptions
        } else {
          const needle = val.toLowerCase();
          this.filteredDirectorOptions = this.directorOptions.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    filterGenres(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filteredGenreOptions = this.genreOptions
        } else {
          const needle = val.toLowerCase();
          this.filteredGenreOptions = this.genreOptions.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    async getGenres() {
      try {
        let result = await this.$api.get("genres");
        this.genreOptions = result.data;
        // console.log(this.genreOptions);
      } catch (error) {
        console.error(error);
      }
    },
    async getDirectors() {
      try {
        let result = await this.$api.get("directors");
        this.directorOptions = result.data;
        // console.log(this.directorOptions);
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
    createNewGenre(val, done) {
      this.addValueMode = "Genre";
      this.addValue = val;
      console.log(this.addValueMode, this.addValue);
      this.showAddDialog = true;
      done(val);
    },
    onValueAdded(newID) {
      console.log(newID, this.addValue, this.addValueMode)
      console.log(this.directorOptions, this.filteredDirectorOptions)
      if (this.addValueMode === "Director") {
        console.log('adding new director');
        this.director = { value: newID, label: this.addValue }
        this.directorOptions.push(this.director)
      } else if (this.addValueMode === "Genre") {
        console.log('adding new genre')
        let genre = { value: newID, label: this.addValue }
        this.genres = this.genres.map(g => g === this.addValue ? genre : g)
        this.genreOptions.push(genre)
      }
      console.log(this.directorOptions)
    }
  },
  mounted() {
    this.getDirectors();
    this.getGenres();
  },
  components: { DatePicker, AddDialog },
};
</script>
