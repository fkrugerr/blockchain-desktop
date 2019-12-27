<template>
  <vue-draggable-resizable
    :w="w"
    :h="h"
    :x="x"
    :z="z"
    :y="y"
    :grid="[10,10]"
    @dragstop="onDrag"
    @resizestop="onResize"
    @activated="onActivated"
    :parent="true"
    class="border-0"
  >
    <b-card header-tag="header" class="text-center h-100 overflow-auto">
      <template v-slot:header>
        <b-button class="close close-btn p-0 text-center bg-transparent" @click="onRemove">
          <span aria-hidden="true">&times;</span>
        </b-button>
        <h6 class="mb-0">{{ title }}</h6>
      </template>
    </b-card>
  </vue-draggable-resizable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    w: Number,
    h: Number,
    x: Number,
    y: Number,
    z: Number,
    title: String,
    id: String,
  },
  computed: {
    ...mapGetters({
      blocksCount: 'desktop/blocksCount',
    }),
  },
  methods: {
    ...mapActions({
      updateBlock: 'desktop/updateBlocks',
      popToTop: 'desktop/popToTop',
      remove: 'desktop/remove',
    }),
    onResize(x, y, width, height) {
      this.updateBlock({
        id: this.id,
        x,
        y,
        w: width,
        h: height,
      });
    },
    onDrag(x, y) {
      this.updateBlock({
        id: this.id,
        x,
        y,
      });
    },
    onActivated() {
      if (this.z !== this.blocksCount) {
        this.popToTop(this.id);
      }
    },
    onRemove() {
      this.remove(this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.close-btn {
  font-size: 1rem;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  &:hover {
    color: red;
  }
}
</style>
