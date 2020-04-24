<template>
  <div id="controls">
    <div id="size-choice">
      <label for="rows">Input Rows</label>
      <input type="text" id="rows" v-model="numRows" />
      <label for="columns">Input Columns</label>
      <input type="text" id="columns" v-model="numCols" />
      <button @click.stop="createGrid">Create Grid</button>
    </div>
    <div id="control-buttons">
      <button @click.stop="$emit('calcNext')">
        <font-awesome-icon icon="play" />
      </button>
      <button>
        <font-awesome-icon icon="stop" />
      </button>
      <button @click.stop="$emit('goBack')">
        <font-awesome-icon icon="undo" />
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Controls",
  components: { FontAwesomeIcon },
  data() {
    return {
      numRows: 0,
      numCols: 0
    };
  },
  methods: {
    createGrid() {
      let rowCount = parseInt(this.numRows, 10);
      let colCount = parseInt(this.numCols, 10);

      let templateGrid = new Array(rowCount);
      for (let i = 0; i < rowCount; i++) {
        templateGrid[i] = new Array(colCount);
        for (let j = 0; j < colCount; j++) {
          templateGrid[i][j] = 0;
        }
      }
      this.$emit("createGrid", templateGrid);
    },
    calcNext(){
      this.$emit("calcNext");
    },
    goBack(){
      this.$emit("goBack");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
