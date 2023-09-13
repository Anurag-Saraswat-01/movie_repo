<template>
  <q-input outlined v-model="date" mask="date" fill-mask :rules="['date']" label="Release Date">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date" today-btn>
            <div class=" row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "DatePicker",
  emits: ['dateChange'],
  data() {
    return {
      date: ""
    }
  },
  watch: {
    date(newDate, oldDate) {
      this.$emit('dateChange', newDate)
    }
  }
}
</script>