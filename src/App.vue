<template>
  <div id="app" class="text-center">
    <Controls @createGrid="createGrid" @calcNext="calcNext" />
    <div class="text-center">Generation {{genNum}}</div>
    <div id="display-grid" class="mx-5">
      <table class="table table-bordered" :key="genNum">
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td
            class="p-0"
            @click.stop="toggleCell(rowIndex, colIndex)"
            v-for="(col, colIndex) in row"
            :key="colIndex"
          >
            <div>{{grid[rowIndex][colIndex]}}</div>
            <font-awesome-icon v-if="grid[rowIndex][colIndex]!=0" icon="square" color="black"></font-awesome-icon>
            <font-awesome-icon v-else icon="square" color="white"></font-awesome-icon>
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
      grid: [],
      nextGen: [],
      genNum: 0
    };
  },
  methods: {
    calcNext() {
      let grid = this.grid;

      // let nextGenGrid = grid;
      //grid.map(row => {
      //     row.map(col => {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          let nbTotal = 0;
          if (grid[row].length > 1) {
            // add X neighbor count if at least 2 cols
            nbTotal += nbCountX(row, col);
          }
          if (grid.length > 1) {
            // if more than 1 row, add either below or above or both
            if (row == 0) {
              nbTotal += nbCountBelow(row, col);
              console.log("did a count below");
            } else if (row == grid.length - 1) {
              nbTotal += nbCountAbove(row, col);
              console.log("did a count above");
            } else {
              console.log("did both below and above");
              nbTotal += nbCountBelow(row, col) + nbCountAbove(row, col);
            }
          }
          console.log("nbTotal after is " + nbTotal);
          //nextGenGrid[row][col] = nbTotal;
        }
      }
      //this.grid = nextGenGrid;
      this.genNum++;
      function nbCountX(row, col) {
        // add horizontal neighbors
        let count = 0;
        if (col == 0) {
          // add left edge x neighbor
          count += grid[row][col + 1];
        } else if (grid[row].length - 1 == col) {
          // add right edge x neighbor
          count += grid[row][col - 1];
        } else if (grid[row].length > 2) {
          count += grid[row][col - 1] + grid[row][col + 1]; // add both neighbors if not edge and row's length > 2
        }
        return count;
      }
      function nbCountBelow(row, col) {
        // add vertical neighbors if top row
        let count = 0;
        count += grid[row + 1][col]; //add lower neighbor directly underneath
        if (col == 0) {
          // add lower right neighbor if left corner
          count += grid[row + 1][col + 1];
        } else if (grid[0].length - 1 == col) {
          // add lower left neighbor if right corner
          count += grid[row + 1][col - 1];
        } else if (grid[0].length > 2) {
          // add both lower diagonal corners if not corner
          count += grid[row + 1][col - 1] + grid[row + 1][col + 1];
        }
        console.log("count is " + count);
        return count;
      }
      function nbCountAbove(row, col) {
        // add vertical neighbors if bottom row
        let count = 0;
        count += grid[row - 1][col]; //add upper neighbor directly above
        if (col == 0) {
          // add upper right neighbor if left corner
          count += grid[row - 1][col + 1];
        } else if (grid[0].length - 1 == col) {
          // add upper left neighbor if right corner
          count += grid[row - 1][col - 1];
        } else if (grid[0].length > 2) {
          // add both upper diagonal corners if not corner
          count += grid[row - 1][col - 1] + grid[row - 1][col + 1];
        }
        return count;
      }
    },

    toggleCell(rowIndex, colIndex) {
      let cellValue = this.grid[rowIndex][colIndex];
      if (cellValue == 0) {
        this.grid[rowIndex][colIndex] = 1;
      } else {
        this.grid[rowIndex][colIndex] = 0;
      }
      this.$forceUpdate();
    },
    createGrid(payload) {
      this.grid = payload;
      this.nextGen = payload;
    }
  }
};
</script>

<style lang="scss">
table {
  table-layout: fixed;
}
</style>
