<template>
  <q-header elevated>
    <q-toolbar class="header-toolbar">
      <q-toolbar-title class="header-toolbar-title">
        <router-link to="/"> THE MOVIE CRITIC</router-link>
      </q-toolbar-title>
      <q-btn flat to="/" label="Dashboard" icon="home" />
      <template v-if="isLoggedIn">
        <q-btn flat to="/add-movie" label="Add Movie" icon="add" />
        <q-btn-dropdown flat :label="user.username" icon="person">
          <q-list dark class="header-dropdown-list">
            <q-item to="/my-movies">
              <q-item-section>
                <q-item-label>My Movies</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="movie" size="xs" />
              </q-item-section>
            </q-item>
            <q-item to="/logout" @click="logout">
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

<style lang="scss" scoped>
@import "./AppHeader.scss";
</style>
