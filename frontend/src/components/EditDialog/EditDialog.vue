<template>
  <q-dialog v-model="show" @hide="$emit('hide')">
    <q-card dark flat bordered class="edit-card">
      {{ editColumn }}
      {{ editValue }}
      {{ value }}
      <q-form class="edit-form" @submit.prevent="handleSubmit">
        <!-- movie name -->
        <q-input
          v-if="editColumn === 'movie_name'"
          standout
          dark
          class="edit-input"
          v-model="value"
          label="Title"
        />
        <!-- release date -->
        <DatePicker
          v-if="editColumn === 'release_date'"
          :release-date="value"
          @date-change="onDateChange"
        />
        <!-- runtime -->
        <q-input
          v-if="editColumn === 'runtime'"
          standout
          dark
          class="edit-input"
          v-model="value"
          label="Runtime"
          type="number"
        />
        <q-btn
          outline
          color="primary"
          class="edit-btn"
          type="submit"
          label="Update"
        />
      </q-form>
      <!-- director -->
    </q-card>
  </q-dialog>
</template>

<script>
export { default } from "./EditDialog";
</script>

<style scoped lang="scss">
@import "./EditDialog.scss";
</style>
