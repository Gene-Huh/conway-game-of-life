<template>
  <div id="app" class="text-center">
    <Controls @createGrid="createGrid" />
    <div class="text-center">Generation #</div>
    <div id="display-grid">
      <table class="table table-bordered table-sm">
        <tr v-for="(row, rowIndex) in computedGrid" :key="rowIndex">
          <td
            @click="toggleCell(rowIndex, colIndex)"
            v-for="(col, colIndex) in row"
            :key="colIndex"
          >
          <span>{{computedGrid[rowIndex][colIndex]}}</span>
              <font-awesome-icon icon="square"> </font-awesome-icon>
           
          </td>
        </tr>
      </table>
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
    toggleCell(rowIndex, colIndex) {
      let cellValue = this.grid[rowIndex][colIndex];
      if (cellValue == 0) {
        this.grid[rowIndex][colIndex] = 1;
      } else {
        this.grid[rowIndex][colIndex] = 0;
      }
      console.log(this.computedGrid[rowIndex][colIndex]);
    },
    createGrid(payload) {
      let templateGrid = new Array(payload[0]);
      for (let i = 0; i < payload[0]; i++) {
        templateGrid[i] = new Array(payload[1]);
        for (let j = 0; j < payload[1]; j++) {
          templateGrid[i][j] = 0;
        }
      }
      this.grid = templateGrid;
    }
  },
  computed: {
    computedGrid: {
      cache: false,
      get: function() {
      return this.grid
      }
    }
  }
};
</script>

<style lang="scss">
</style>
