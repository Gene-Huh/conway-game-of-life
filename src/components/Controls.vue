<template>
  <div id="controls">
    <div id="size-choice">
      <label for="rows">Input Rows</label>
      <input type="text" id="rows" v-model="numRows" />
      <label for="columns">Input Columns</label>
      <input type="text" id="columns" v-model="numCols" />
      <button @click="createGrid">Create Grid</button>
    </div>
    <div id="control-buttons">
      <button>
        <font-awesome-icon icon="play" />
      </button>
      <button>
        <font-awesome-icon icon="stop" />
      </button>
      <button>
        <font-awesome-icon icon="undo" />
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: "Controls",
  components: {FontAwesomeIcon},
  data() {
    return {
      numRows: 0,
      numCols: 0
    }
  },
  methods: {
    createGrid() {
      let templateGrid = [parseInt(this.numRows, 10), parseInt(this.numCols, 10)];
      this.$emit("createGrid", templateGrid);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
