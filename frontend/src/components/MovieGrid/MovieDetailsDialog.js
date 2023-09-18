export default {
  name: "MovieDetailsDialog",
  inject: ["isLoggedIn", "user"],
  data() {
    return {
      movie: null,
      userRating: 0,
      isNewRating: true,
      show: true,
    };
  },
  props: {
    id: Number,
  },
  emits: ["hide", "rate"],
  async mounted() {
    console.log(this.id);
    await this.getMovieData();
    if (this.isLoggedIn && this.movie) {
      await this.getUserRating();
    }
  },
  computed: {
    url() {
      return `http://localhost:3000/${this.movie.file_path}`;
    },
    genreList() {
      console.log(this.movie.genres.split(", "));
      return this.movie.genres.split(", ");
    },
  },
  methods: {
    async getMovieData() {
      try {
        let result = await this.$api.get(`/movies/${this.id}`);
        console.log(result);
        this.movie = result.data[0];
      } catch (error) {
        console.error(error);
      }
    },
    async getUserRating() {
      try {
        let result = await this.$api.get(
          `/ratings/${this.movie.movie_id}&${this.user.user_id}`
        );
        console.log(result);
        if (result.data) {
          this.isNewRating = false;
          this.userRating = result.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateUserRating() {
      console.log(this.userRating);
      try {
        let result;
        if (this.isNewRating) {
          result = await this.$api.post(`/ratings`, {
            movie_id: this.movie.movie_id,
            user_id: this.user.user_id,
            rating: this.userRating,
          });
        } else {
          result = await this.$api.put(`/ratings`, {
            movie_id: this.movie.movie_id,
            user_id: this.user.user_id,
            rating: this.userRating,
          });
        }

        console.log(this.$emit);
        await this.getMovieData();
        this.$emit("rate");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
