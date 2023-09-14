<template>
  <div class="q-pa-lg">
    <q-table
      title="Movies"
      :rows="movies"
      :columns="columns"
      row-key="movie-id"
      :loading="loading"
      @row-dblclick="onRowDblClick"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

const columns = [
  {
    name: "movie_name",
    label: "Title",
    field: "movie_name",
    sortable: true,
    align: "left",
    headerStyle: "text-align: center",
  },
  {
    name: "director_name",
    label: "Director",
    field: "director_name",
    sortable: true,
    align: "left",
    headerStyle: "text-align: center",
  },
  {
    name: "release_date",
    label: "Year",
    field: "release_date",
    format: (val) => parseInt(val.slice(0, 4)),
    sortable: true,
    headerStyle: "text-align: center",
  },
  {
    name: "rated",
    label: "MPA Film Rating",
    field: "rated",
    align: "center",
    headerStyle: "text-align: center",
  },
  {
    name: "runtime",
    label: "Runtime (in minutes)",
    field: "runtime",
    sortable: true,
    align: "center",
    headerStyle: "text-align: center",
  },
  {
    name: "genres",
    label: "Genre",
    field: "genres",
    align: "left",
    headerStyle: "text-align: center",
  },
  {
    name: "avg_rating",
    label: "Average User Rating",
    field: "avg_rating",
    sortable: true,
    align: "center",
    headerStyle: "text-align: center",
  },
];

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      movies: [],
      columns,
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
      } catch (error) {
        console.error(error);
      }
    },
    onRowDblClick(evt, row, index) {
      this.$router.push(`/movie/${row.movie_id}`);
    },
  },
});
</script>
