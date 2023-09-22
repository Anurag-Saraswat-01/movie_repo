import DatePicker from "../DatePicker/DatePicker.vue";
import AddDialog from "../AddDialog/AddDialog.vue";

export default {
  name: "EditDialog",
  data() {
    return {
      show: true,
      value: null,
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
  props: {
    id: Number,
    editColumn: String,
    editValue: String || Number,
  },
  emits: ["hide", "update"],
  async mounted() {
    if (this.editColumn === "release_date") {
      this.value = this.editValue.replaceAll("-", "/");
    } else if (this.editColumn === "genres") {
      await this.getGenres();
      this.value = this.genreOptions.filter((g) =>
        this.editValue.split(", ").includes(g.label)
      );
    } else if (this.editColumn === "director_name") {
      await this.getDirectors();
      [this.value] = this.directorOptions.filter(
        (d) => d.label === this.editValue
      );
    } else {
      this.value = this.editValue;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const url = `movies/${this.id}/${this.editColumn}`;

        let value;
        if (this.editColumn === "genres") {
          const oldGenreIDList = this.genreOptions
            .filter((g) => this.editValue.split(", ").includes(g.label))
            .map((g) => g.value);
          const newGenreIDList = this.value.map((g) => g.value);
          value = {
            del_genre_id_list: oldGenreIDList.filter(
              (g) => !newGenreIDList.includes(g)
            ),
            add_genre_id_list: newGenreIDList.filter(
              (g) => !oldGenreIDList.includes(g)
            ),
          };
        } else if (this.editColumn === "director_name") {
          value = this.value.value;
        } else {
          value = this.value;
        }

        console.dir({ url, value });
        let result = await this.$api.put(url, { value });
        console.log(result);
        this.$emit("update");
        this.show = false;
      } catch (error) {
        console.error(error);
      }
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
    onDateChange(date) {
      console.log(date);
      this.value = date;
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
    onShowClose(newID, label) {
      this.showAddDialog = false;
      if (!newID) {
        if (label === "Director") {
          this.value = null;
        } else if (label === "Genre") {
          this.value = this.value.slice(0, -1);
        }
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
    onValueAdded(newID) {
      console.log(newID, this.addValue, this.addValueMode);
      console.log(this.directorOptions, this.filteredDirectorOptions);

      if (this.addValueMode === "Director") {
        console.log("adding new director");
        this.value = { value: newID, label: this.addValue };
        this.directorOptions.push(this.director);
      } else if (this.addValueMode === "Genre") {
        console.log("adding new genre");
        let genre = { value: newID, label: this.addValue };
        this.value = this.genres.map((g) => (g === this.addValue ? genre : g));
        this.genreOptions.push(genre);
      }
    },
  },
  components: { DatePicker, AddDialog },
};
