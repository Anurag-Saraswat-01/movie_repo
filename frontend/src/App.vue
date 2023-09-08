<template>
  <router-view />
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      isLoggedin: false,
      user: null
    }
  },
  methods: {
    toggleLoggedIn() {
      this.isLoggedin = !this.isLoggedin
    },
    setUser(user) {
      this.user = user
    }
  },
  provide() {
    return {
      isLoggedin: computed(() => this.isLoggedin),
      user: computed(() => this.user),
      toggleLoggedIn: this.toggleLoggedIn,
      setUser: this.setUser
    }
  }
})
</script>
