import DatePicker from "src/components/DatePicker/DatePicker.vue";
import AddDialog from "src/components/AddDialog/AddDialog.vue";

export default {
  name: "AddMovie",
  inject: ["user"],
  data() {
    return {
      movie_name: "",
      director_id: null,
      release_date: "",
      rated: null,
      runtime: "",
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
      status: null,
      message: null,
    };
  },
  computed: {
    disabled() {
      // console.log({
      //   movie_name: this.movie_name,
      //   director: this.director,
      //   release_date: this.release_date,
      //   rated: this.rated,
      //   runtime: this.runtime,
      //   genres: this.genres,
      //   genre_length: this.genres.length,
      // });
      let res =
        this.movie_name === "" ||
        this.director === null ||
        this.release_date === "" ||
        this.rated === null ||
        this.runtime === "" ||
        this.genres.length === 0;
      console.log({ res });
      return res;
    },
  },
  mounted() {
    this.getDirectors();
    this.getGenres();
  },
  methods: {
    // update date got from date picker
    onDateChange(date) {
      console.log(date);
      this.release_date = date;
    },
    // hide add dialog
    onShowClose(newID, label) {
      this.showAddDialog = false;
      if (!newID) {
        if (label === "Director") {
          this.director = null;
        } else if (label === "Genre") {
          this.genres = this.genres.slice(0, -1);
        }
      }
    },
    // submit movie data
    async handleSubmit() {
      const movieData = {
        movie_name: this.movie_name,
        release_date: this.release_date,
        rated: this.rated,
        director_id: this.director && this.director.value,
        genre_id_list: this.genres && this.genres.map((genre) => genre.value),
        runtime: this.runtime,
        user_id: this.user && this.user.user_id,
      };

      const formData = new FormData();
      formData.append("poster", this.poster);
      formData.append("movie_data", JSON.stringify(movieData));

      console.log(formData);

      try {
        let result = await this.$api.post("movies", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(result);
        this.status = true;
        this.message = result.data.message;
      } catch (error) {
        console.log(error);
        this.status = true;
        this.message = error.data.message;
      }
    },
    // filter director options based on input
    filterDirectors(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filteredDirectorOptions = this.directorOptions;
        } else {
          const needle = val.toLowerCase();
          this.filteredDirectorOptions = this.directorOptions.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    // filter genre options based on input
    filterGenres(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filteredGenreOptions = this.genreOptions;
        } else {
          const needle = val.toLowerCase();
          this.filteredGenreOptions = this.genreOptions.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    // get genres from api
    async getGenres() {
      try {
        let result = await this.$api.get("genres");
        this.genreOptions = result.data;
        // console.log(this.genreOptions);
      } catch (error) {
        console.error(error);
      }
    },
    // get directors from api
    async getDirectors() {
      try {
        let result = await this.$api.get("directors");
        this.directorOptions = result.data;
        // console.log(this.directorOptions);
      } catch (error) {
        console.error(error);
      }
    },
    // add new director to db
    createNewDirector(val, done) {
      this.addValueMode = "Director";
      this.addValue = val;
      console.log(this.addValueMode, this.addValue);
      this.showAddDialog = true;
      done(val);
    },
    // add new genre to db
    createNewGenre(val, done) {
      this.addValueMode = "Genre";
      this.addValue = val;
      console.log(this.addValueMode, this.addValue);
      this.showAddDialog = true;
      done(val);
    },
    // add the new created value to select options
    onValueAdded(newID) {
      console.log(newID, this.addValue, this.addValueMode);
      console.log(this.directorOptions, this.filteredDirectorOptions);

      if (this.addValueMode === "Director") {
        console.log("adding new director");
        this.director = { value: newID, label: this.addValue };
        this.directorOptions.push(this.director);
      } else if (this.addValueMode === "Genre") {
        console.log("adding new genre");
        let genre = { value: newID, label: this.addValue };
        this.genres = this.genres.map((g) => (g === this.addValue ? genre : g));
        this.genreOptions.push(genre);
      }
    },
    handleReset() {
      this.movie_name = "";
      this.director_id = null;
      this.release_date = "";
      this.rated = null;
      this.runtime = null;
      this.genres = [];
      this.director = null;
      this.poster = null;
      this.showAddDialog = false;
      this.addValueMode = null;
      this.addValue = null;
    },
  },
  components: { DatePicker, AddDialog },
};
