<template>
  <div id="app" class="text-center">
    <h1>Conway's Game of Life</h1>
    <article>
      <p>
        This
        <a href="http://codingdojo.org/kata/GameOfLife/" target="_blank">kata</a> is about calculating the next generation of
        <a
          href="http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
        >Conway's Game of Life.</a>
      </p>
      <p>You start with a two dimensional grid of cells, where each cell is either alive or dead. In this version of the problem, the grid is finite, and no life can exist off the edges. When calcuating the next generation of the grid, follow these rules:</p>
      
        <ol>
          <li>Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overcrowding.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell.</li>
        </ol>
     
    </article>

    <Premade @load="createGrid" />
    <Controls @createGrid="createGrid" @calcNext="calcNext" @goBack="goBack" />
    <div class="text-center">Generation {{ genNum }}</div>
    <div id="display-grid" class="mx-5">
      <table class="table table-bordered" :key="genNum">
        <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
          <div
            class="px-1 d-inline-block border"
            @click.stop="toggleCell(rowIndex, colIndex)"
            v-for="(col, colIndex) in row"
            :key="colIndex"
          >
            <font-awesome-icon v-if="grid[rowIndex][colIndex] != 0" icon="square" color="black"></font-awesome-icon>
            <font-awesome-icon v-else icon="square" color="white"></font-awesome-icon>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Controls from "./components/Controls.vue";
import Premade from "./components/Premade.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "App",
  components: {
    Controls,
    Premade,
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
      let grid = copyGen(this.grid);
      if (this.history.length < 100) {
        this.history.push(copyGen(grid));
      }
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
            } else if (row == grid.length - 1) {
              nbTotal += nbCountAbove(row, col);
            } else {
              // console.log("did both below and above");
              nbTotal += nbCountBelow(row, col) + nbCountAbove(row, col);
            }
          }
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
