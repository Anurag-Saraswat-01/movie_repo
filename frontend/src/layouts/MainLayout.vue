<template>
  <q-layout view="hHh Lpr lFf">

    <AppHeader />
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from 'src/components/AppHeader.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: { AppHeader }
})
</script>
