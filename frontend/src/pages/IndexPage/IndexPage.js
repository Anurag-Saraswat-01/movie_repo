import MovieGrid from "src/components/MovieGrid/MovieGrid.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      movies: [],
      loading: true,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let result = await this.$api.get("movies");
        this.movies = result.data;
        this.loading = false;
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { MovieGrid },
});
