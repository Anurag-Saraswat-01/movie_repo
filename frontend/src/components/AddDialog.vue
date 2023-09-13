<template>
  <q-dialog v-model="show">
    <div class="bg-white q-pa-md" style="width: 400px">
      <div class="flex items-center justify-between q-my-md">
        <h5 class="q-ma-none">Add New {{ label }}</h5>
        <q-btn flat v-close-popup round dense icon="close" />
      </div>
      <q-form class="q-gutter-md flex column justify-center" @submit.prevent="handleSubmit">
        <q-input outlined v-model="value" :label="addValueMode" />
        <q-btn label="Add" type="submit" color="primary" class="q-mx-auto" />
      </q-form>
    </div>
  </q-dialog>
</template>

<script>

export default {
  name: "AddDialog",
  props: {
    showAddDialog: Boolean,
    addValueMode: String,
    addValue: String,
  },
  emits: ["showClosed", "valueAdded"],
  data() {
    return {
      show: null,
      value: "",
      label: "",
      newID: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const url = `${this.label.toLowerCase()}s`
        const label = `${this.label.toLowerCase()}_name`

        let result = await this.$api.post(url, { [label]: this.value, });
        console.log(result.data);
        this.newID = result.data;
        this.$emit("valueAdded", this.newID);
        this.show = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    show(newShow, oldShow) {
      if (newShow === false) {
        this.$emit("showClosed");
      }
    },
    showAddDialog(newShow, oldShow) {
      this.show = newShow;
    },
    addValue(newAddValue, oldAddValue) {
      this.value = newAddValue;
    },
    addValueMode(newAddValueMode, oldAddValueMode) {
      this.label = newAddValueMode;
    },
  },
};
</script>
