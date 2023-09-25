import MovieGrid from "src/components/MovieGrid/MovieGrid.vue";

export default {
  name: "MyMovies",
  inject: ["user"],
  data() {
    return {
      movies: [],
      loading: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // get data for current user from api
    async getData() {
      try {
        let result = await this.$api.get(`user/movies/${this.user.user_id}`);
        this.movies = result.data;
        this.loading = false;
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { MovieGrid },
};
