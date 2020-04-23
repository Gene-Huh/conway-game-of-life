<template>
  <div id="app" class="text-center">
    <Controls @createGrid="createGrid" />
    <div class="text-center">Generation #</div>
    <div id="display-grid" class="text-center">
      <div>
        <span v-for="row in grid" :key="row">
          <br />
          <span v-for="col in row" :key="col">
            <font-awesome-icon icon="square" />
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Controls from "./components/Controls.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "App",
  components: {
    Controls,
    FontAwesomeIcon
  },
  data() {
    return {
      grid: []
    };
  },
  methods: {
    createGrid(payload) {
      this.grid = payload;
    }
  }
};
</script>

<style lang="scss">
</style>
