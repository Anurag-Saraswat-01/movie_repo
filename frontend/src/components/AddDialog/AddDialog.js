export default {
  name: "AddDialog",
  data() {
    return {
      show: true,
      value: "",
      label: "",
      newID: null,
    };
  },
  emits: ["showClosed", "valueAdded"],
  props: {
    addValueMode: String,
    addValue: String,
  },
  mounted() {
    this.value = this.addValue;
    this.label = this.addValueMode;
  },
  methods: {
    async handleSubmit() {
      try {
        const url = `${this.label.toLowerCase()}s`;
        const label = `${this.label.toLowerCase()}_name`;

        let result = await this.$api.post(url, { [label]: this.value });
        console.log(result.data);
        this.newID = result.data;
        this.$emit("valueAdded", this.newID);
        this.show = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
