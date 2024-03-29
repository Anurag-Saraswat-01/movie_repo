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
  mounted() {
    this.date = this.releaseDate;
  },
  // watch: {
  //   releaseDate() {
  //     this.date = this.releaseDate;
  //   },
  // },
  emits: ["dateChange"],
};
