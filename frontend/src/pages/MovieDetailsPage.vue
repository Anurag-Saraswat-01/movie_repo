<template>
  <div class="q-pa-xl">
    <q-card v-if="movie" style="max-width: 720px; margin: 0 auto">
      <q-card-section horizontal>
        <q-card-section class="col-4">
          <q-img class="rounded-borders" :src="url" :alt="movie.movie_name" />
        </q-card-section>
        <q-card-section class="col-8 q-pa-lg">
          <h2 class="movie_title">
            {{ movie.movie_name }}
          </h2>
          <div class="flex flex-row justify-between">
            <h3 class="movie_subtitle">
              Directed by:
              {{ movie.director_name }}
            </h3>
            <h3 class="movie_subtitle">
              Released in:
              {{ movie.release_date }}
            </h3>
          </div>
          <div>
            Average Rating:
            {{ movie.avg_rating || "No ratings yet" }}
            <q-rating
              v-model="movie.avg_rating"
              color="orange"
              size="sm"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
              readonly
            />
          </div>
          <div>Genres: {{ movie.genres }}</div>
          <div>Runtime: {{ movie.runtime }} minutes</div>
          <div>MPA Film Rating: {{ movie.rated }}</div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <div class="q-pa-sm" style="margin: auto">
          Rate this movie!
          <q-rating
            v-model="userRating"
            color="orange"
            size="sm"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
          />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "MovieDetailsPage",
  data() {
    return {
      movie: null,
      userRating: 0,
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.getMovieData();
  },
  computed: {
    url() {
      return `http://localhost:3000/images/${this.movie.movie_id}.jpg`;
    },
    genreList() {
      console.log(this.movie.genres.split(", "));
      return this.movie.genres.split(", ");
    },
  },
  methods: {
    async getMovieData() {
      try {
        let result = await this.$api.get(`/movies/${this.$route.params.id}`);
        console.log(result);
        this.movie = result.data[0];
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scope>
.movie_title {
  font-size: xx-large;
  font-weight: 700;
  margin: 0;
}

.movie_subtitle {
  font-size: large;
  font-weight: 600;
  margin: 0;
}
</style>
