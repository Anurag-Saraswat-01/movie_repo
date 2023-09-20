import MovieDetailsDialog from "./MovieDetailsDialog.vue";

const columns = [
  {
    name: "movie_name",
    label: "Title",
    field: "movie_name",
    sortable: true,
    align: "left",
    headerStyle: "text-align: center",
  },
  {
    name: "director_name",
    label: "Director",
    field: "director_name",
    sortable: true,
    align: "left",
    headerStyle: "text-align: center",
  },
  {
    name: "release_date",
    label: "Year",
    field: "release_date",
    format: (val) => parseInt(val.slice(0, 4)),
    sortable: true,
    align: "center",
    headerStyle: "text-align: center",
  },
  {
    name: "rated",
    label: "MPA Film Rating",
    field: "rated",
    align: "center",
    headerStyle: "text-align: center",
  },
  {
    name: "runtime",
    label: "Runtime (in minutes)",
    field: "runtime",
    sortable: true,
    align: "center",
    headerStyle: "text-align: center",
  },
  {
    name: "genres",
    label: "Genre",
    field: "genres",
    align: "left",
    headerStyle: "text-align: center",
  },
  {
    name: "avg_rating",
    label: "Average User Rating",
    field: "avg_rating",
    format: (val) => (val ? val + "⭐" : "No ratings yet"),
    sortable: true,
    align: "center",
    headerStyle: "text-align: center",
  },
];

export default {
  name: "MovieGrid",
  data() {
    return {
      columns,
      showDialog: false,
      showMovieId: null,
      filter: { director: null, year: null, genres: null },
      filteredDirectorOptions: [],
      filteredGenreOptions: [],
      filteredRows: [],
    };
  },
  emits: ["rate"],
  props: {
    movies: Array,
    loading: Boolean,
  },
  computed: {
    rows() {
      return this.movies;
    },
    directorOptions() {
      const options = [];
      for (let movie of this.movies) {
        if (!options.includes(movie.director_name)) {
          options.push(movie.director_name);
        }
      }
      return options;
    },
    genreOptions() {
      const options = [];
      for (let movie of this.movies) {
        for (let genre of movie.genres.split(", ")) {
          if (!options.includes(genre)) {
            options.push(genre);
          }
        }
      }
      return options;
    },
  },
  methods: {
    onRowClick(evt, row, index) {
      this.showDialog = true;
      this.showMovieId = row.movie_id;
    },
    onHide() {
      this.showDialog = false;
      this.showMovieId = null;
    },
    filterDirectors(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filteredDirectorOptions = this.directorOptions;
        } else {
          const needle = val.toLowerCase();
          this.filteredDirectorOptions = this.directorOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    filterGenres(val, update, abort) {
      update(() => {
        if (val === "") {
          this.filteredGenreOptions = this.genreOptions;
        } else {
          const needle = val.toLowerCase();
          this.filteredGenreOptions = this.genreOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    filterRows(rows, terms) {
      const filteredRows = rows.filter(
        (row) =>
          (terms.director === null || row.director_name === terms.director) &&
          (terms.genres === null ||
            terms.genres.length === 0 ||
            terms.genres.some((genre) =>
              row.genres.split(", ").includes(genre)
            )) &&
          (terms.year === null ||
            row.release_date.slice(0, terms.year.length) === terms.year)
      );
      return filteredRows;
    },
  },
  components: { MovieDetailsDialog },
};
