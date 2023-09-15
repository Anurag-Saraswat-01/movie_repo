<template>
  <q-dialog v-model="show" @hide="$emit('showClosed')">
    <div class="bg-white q-pa-md" style="width: 400px">
      <div class="flex items-center justify-between q-my-md">
        <h5 class="q-ma-none">Add New {{ label }}</h5>
        <q-btn flat v-close-popup round dense icon="close" />
      </div>
      <q-form
        class="q-gutter-md flex column justify-center"
        @submit.prevent="handleSubmit"
      >
        <q-input outlined v-model="value" :label="addValueMode" />
        <q-btn label="Add" type="submit" color="primary" class="q-mx-auto" />
      </q-form>
    </div>
  </q-dialog>
</template>

<script>
export { default } from "./AddDialog";
</script>
