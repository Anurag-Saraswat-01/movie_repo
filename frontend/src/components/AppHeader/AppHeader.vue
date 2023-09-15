<template>
  <q-header>
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat to="/" label="Movie Repo" style="font-size: large" />
      </q-toolbar-title>
      <q-btn flat to="/" label="Dashboard" icon="home" />
      <template v-if="isLoggedIn">
        <q-btn-dropdown flat :label="user.username" icon="person">
          <q-list>
            <q-item to="/my-movies">
              <q-item-section>
                <q-item-label>My Movies</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="movie" size="xs" />
              </q-item-section>
            </q-item>
            <q-item to="/add-movie">
              <q-item-section>
                <q-item-label>Add Movie</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="add" size="xs" />
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="logout" size="xs" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
      <template v-else>
        <q-btn flat to="/login" label="Login" icon="login" />
        <q-btn flat to="/signup" label="Signup" icon="add" />
      </template>
    </q-toolbar>
  </q-header>
</template>

<script>
export { default } from "./AppHeader";
</script>
