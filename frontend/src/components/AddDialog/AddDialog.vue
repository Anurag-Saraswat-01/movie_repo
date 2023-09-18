<template>
  <q-dialog v-model="show" @hide="$emit('showClosed')">
    <q-card dark flat bordered class="add-dialog">
      <div class="add-dialog-header">
        <h2>Add New {{ label }}</h2>
        <q-btn flat v-close-popup round dense icon="close" />
      </div>
      <q-form class="form" @submit.prevent="handleSubmit">
        <q-input
          class="form-input"
          standout
          color="primary"
          dark
          v-model="value"
          :label="addValueMode"
        />
        <q-btn
          outline
          label="Add"
          type="submit"
          color="primary"
          class="q-mx-auto"
        />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export { default } from "./AddDialog";
</script>

<style scoped lang="scss">
@import "./AddDialog.scss";
</style>
