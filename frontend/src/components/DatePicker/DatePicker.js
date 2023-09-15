export default {
  name: "DatePicker",
  data() {
    return {
      date: "",
    };
  },
  props: {
    releaseDate: String,
  },
  watch: {
    releaseDate() {
      this.date = this.releaseDate;
    },
  },
  emits: ["dateChange"],
};
