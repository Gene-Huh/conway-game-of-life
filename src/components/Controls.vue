<template>
  <div id="controls">
    <div id="size-choice">
      <div class="d-inline-block mr-5">
        <label for="rows">Input Rows</label>
        <input class="cols-1" type="text" id="rows" v-model="numRows" />
      </div>
      <div class="d-inline-block">
        <label for="columns">Input Columns</label>
        <input type="text" id="columns" v-model="numCols" />
      </div>
      <button @click.stop="createGrid">Create Grid</button>
    </div>

    <div id="control-buttons">
      <div class="btn-group d-block mb-2">
        <button @click.stop="goBack">
          <font-awesome-icon icon="step-backward" />Previous
        </button>
        <button @click.stop="calcNext">
          <font-awesome-icon icon="step-forward" />Next
        </button>
      </div>

      <div class="btn-group">
        <button @click.stop="speedDown">
          <font-awesome-icon icon="fast-backward" />Slower
        </button>
        <button @click.stop="play">
          <font-awesome-icon icon="play" color="green"/>Play
        </button>
        <button @click.stop="speedUp">
          <font-awesome-icon icon="fast-forward" />Faster
        </button>
        <button @click.stop="stop">
          <font-awesome-icon icon="stop" color="red" />Stop
        </button>
      </div>
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
      numCols: 0,
      interval: 1000,
      playLooper: null
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
    calcNext() {
      this.$emit("calcNext");
    },
    goBack() {
      this.$emit("goBack");
    },
    play() {
      this.playLooper = setInterval(() => {
        this.$emit("calcNext");
      }, this.interval);
    },
    stop() {
      clearInterval(this.playLooper);
    },
    speedUp() {
      if (this.interval >= 500) {
        this.interval /= 2;
        this.$forceUpdate();
        clearInterval(this.playLooper);
        this.playLooper = setInterval(() => {
          this.$emit("calcNext");
        }, this.interval);
      }
    },
    speedDown() {
      if (this.interval <= 2000) {
        this.interval *= 2;
        this.$forceUpdate();
        clearInterval(this.playLooper);
        this.playLooper = setInterval(() => {
          this.$emit("calcNext");
        }, this.interval);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.playLooper);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
