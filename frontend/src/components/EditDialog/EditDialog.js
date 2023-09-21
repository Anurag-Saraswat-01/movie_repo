import DatePicker from "../DatePicker/DatePicker.vue";

export default {
  name: "EditDialog",
  data() {
    return {
      show: true,
      value: null,
      genreOptions: [],
      directorOptions: [],
    };
  },
  props: {
    id: Number,
    editColumn: String,
    editValue: String || Number,
  },
  emits: ["hide"],
  mounted() {
    this.value =
      this.editColumn === "release_date"
        ? this.editValue.replaceAll("-", "/")
        : this.editValue;
  },
  methods: {
    async handleSubmit() {
      try {
        // let result = await
      } catch (error) {
        console.error(error);
      }
    },
    // get genres from api
    async getGenres() {
      try {
        let result = await this.$api.get("genres");
        this.genreOptions = result.data;
        // console.log(this.genreOptions);
      } catch (error) {
        console.error(error);
      }
    },
    // get directors from api
    async getDirectors() {
      try {
        let result = await this.$api.get("directors");
        this.directorOptions = result.data;
        // console.log(this.directorOptions);
      } catch (error) {
        console.error(error);
      }
    },
    onDateChange(date) {
      console.log(date);
      this.value = date;
    },
  },
  components: { DatePicker },
};
