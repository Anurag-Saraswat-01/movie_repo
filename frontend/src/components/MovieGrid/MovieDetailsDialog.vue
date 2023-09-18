<template>
  <q-dialog v-model="show" @hide="$emit('hide')">
    <q-card v-if="movie" dark flat bordered class="movie-card">
      <q-card-section horizontal>
        <q-card-section class="col-4 movie-poster-container">
          <q-img class="rounded-borders" :src="url" :alt="movie.movie_name" />
        </q-card-section>

        <q-card-section class="col-8 movie-card-text">
          <q-card-section class="movie-header">
            <h2>{{ movie.movie_name }}</h2>
            <q-btn flat v-close-popup round dense icon="close" />
          </q-card-section>
          <q-card-section class="movie-subheader">
            <div>
              <h2>Directed by:</h2>
              <p>{{ movie.director_name }}</p>
            </div>
            <div>
              <h2>Released on:</h2>
              <p>{{ movie.release_date }}</p>
            </div>
          </q-card-section>
          <q-card-section class="movie-details">
            <div>
              <h3>Average Rating:</h3>
              {{ movie.avg_rating || "No ratings yet" }}
              <q-rating
                v-if="movie.avg_rating"
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
            <div>
              <h3>Runtime:</h3>
              {{ movie.runtime }} minutes
            </div>
            <div>
              <h3>MPA Film Rating:</h3>
              {{ movie.rated }}
            </div>
            <div>
              <h3>Genres:</h3>
              {{ movie.genres }}
            </div>
          </q-card-section>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions class="movie-card-actions">
        <template v-if="isLoggedIn">
          <div class="movie-card-rater">
            <div v-if="isNewRating">Rate this movie!</div>
            <div v-else>Your Rating</div>
            <q-rating
              v-model="userRating"
              color="orange"
              size="sm"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              @update:model-value="updateUserRating"
            />
          </div>
        </template>
        <template v-else>
          <div>
            <router-link class="movie-link" to="/login">Log In</router-link> to
            rate this movie
          </div>
        </template>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export { default } from "./MovieDetailsDialog";
</script>

<style scoped lang="scss">
@import "./MovieDetailsDialog.scss";
</style>
