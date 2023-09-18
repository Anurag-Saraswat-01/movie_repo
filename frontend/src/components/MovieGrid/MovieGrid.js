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
  },
  methods: {
    onRowClick(row) {
      // this.$router.push(`/movie/${row.movie_id}`);
      this.showDialog = true;
      this.showMovieId = row.movie_id;
    },
    onHide() {
      this.showDialog = false;
      this.showMovieId = null;
    },
  },
  components: { MovieDetailsDialog },
};
