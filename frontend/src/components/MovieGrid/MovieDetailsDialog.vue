<template>
  <q-dialog v-model="show" @hide="$emit('hide')">
    <q-card v-if="movie" style="max-width: 720px; margin: 0 auto">
      <q-card-section>
        <q-btn flat v-close-popup round dense icon="close" />
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="col-4">
          <q-img class="rounded-borders" :src="url" :alt="movie.movie_name" />
        </q-card-section>
        <q-card-section class="col-8 q-pa-lg">
          <div class="flex flex-row justify-between">
            <h2 class="movie_title">
              {{ movie.movie_name }}
            </h2>
          </div>
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
        <template v-if="isLoggedIn">
          <div
            class="q-pa-sm flex flex-row q-gutter-sm items-center"
            style="margin: auto"
          >
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
            <router-link to="/login">Log In</router-link> to rate this movie
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
