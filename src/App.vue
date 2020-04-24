<template>
  <div id="app" class="text-center">
    <h1>Conway's Game of Life</h1>
    <Controls @createGrid="createGrid" @calcNext="calcNext" @goBack="goBack" />
    <div class="text-center">Generation {{ genNum }}</div>
    <div id="display-grid" class="mx-5">
      <table class="table table-bordered" :key="genNum">
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <td
            class="p-0"
            @click.stop="toggleCell(rowIndex, colIndex)"
            v-for="(col, colIndex) in row"
            :key="colIndex"
          >
            <font-awesome-icon
              v-if="grid[rowIndex][colIndex] != 0"
              icon="square"
              color="black"
            ></font-awesome-icon>
            <font-awesome-icon
              v-else
              icon="square"
              color="white"
            ></font-awesome-icon>
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
      history: [],
      genNum: 0
    };
  },
  methods: {
    calcNext() {
      let grid = this.grid;
      this.history.push(copyGen(grid));
      // let nextGenGrid = grid;
      //grid.map(row => {
      //     row.map(col => {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          let nbTotal = 0;
          if (grid[row].length > 1) {
            // add X neighbor count if at least 2 cols
            nbTotal += nbCountX(row, col);
            //console.log("Horizontal neighbor count is " + nbTotal);
          }
          if (grid.length > 1) {
            // if more than 1 row, add either below or above or both
            if (row == 0) {
              nbTotal += nbCountBelow(row, col);
              //  console.log("did a count below, nbTotal is " + nbTotal);
            } else if (row == grid.length - 1) {
              nbTotal += nbCountAbove(row, col);
              // console.log("did a count above, nbTotal is " + nbTotal);
            } else {
              // console.log("did both below and above");
              nbTotal += nbCountBelow(row, col) + nbCountAbove(row, col);
            }
          }
          // console.log("nbTotal is " + nbTotal);
          this.nextGen[row][col] = isDeadOrAlive(row, col, nbTotal);
        }
      }
      this.grid = this.nextGen;
      this.genNum++;

      function copyGen(oldArr) {
        let newArr = [];
        for (let i = 0; i < oldArr.length; i++) {
          newArr[i] = [...oldArr[i]];
        }
        return newArr;
      }
      function isDeadOrAlive(row, col, neighborCount) {
        let result = 0;
        if (neighborCount == 3 || (grid[row][col] > 0 && neighborCount == 2)) {
          result = 1;
        }
        return result;
      }
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
        //console.log("direct below is " + count);
        if (grid[row].length > 1) {
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
        }
        return count;
      }
      function nbCountAbove(row, col) {
        // add vertical neighbors if bottom row
        let count = 0;
        count += grid[row - 1][col]; //add upper neighbor directly above
        //console.log("direct above is " + count);
        if (grid[row].length > 1) {
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
      this.history = [];
      this.genNum = 0;
    },
    goBack() {
      if (this.genNum > 0) {
        this.grid = this.history.pop();
        this.genNum--;
      }
    }
  }
};
</script>

<style lang="scss">
table {
  table-layout: fixed;
}
</style>
