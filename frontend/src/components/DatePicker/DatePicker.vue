<template>
  {{ date }}
  <q-input
    class="form-input"
    standout
    color="primary"
    dark
    v-model="date"
    mask="date"
    fill-mask
    :rules="['date']"
    label="Release Date"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            dark
            v-model="date"
            today-btn
            @update:model-value="$emit('dateChange', date)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export { default } from "./DatePicker";
</script>
