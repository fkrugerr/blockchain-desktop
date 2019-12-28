<template>
  <div class="desktop w-100 p-3 position-relative" ref="wrapper">
    <desktop-block
      v-for="(item, index) in visibleBlocks"
      :key="item.id"
      :x="item.x"
      :y="item.y"
      :h="item.h"
      :w="item.w"
      :z="index + 1"
      :title="item.title"
      :id="item.id"
    />
    <div class="position-absolute removed-holder" v-if="removedBlocks.length">
      <removed-holder :blocks="removedBlocks" :onRestore="onRestore" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import desktopBlock from '../components/DesktopBlock.vue';
import removedHolder from '../components/RemovedBlocks.vue';

export default {
  components: {
    desktopBlock,
    removedHolder,
  },
  computed: {
    ...mapGetters({
      visibleBlocks: 'desktop/visibleBlocks',
      removedBlocks: 'desktop/removedBlocks',
    }),
  },
  methods: {
    ...mapActions({
      init: 'desktop/init',
      restore: 'desktop/restore',
    }),
    onRestore(id) {
      this.restore({
        id,
        parentWidth: this.$refs.wrapper.clientWidth,
      });
    },
  },
  mounted() {
    this.init({
      count: 5,
      width: this.$refs.wrapper.clientWidth,
    });
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  height: calc(100vh - 115px);
  min-height: 450px;
}
.removed-holder {
  top: 0;
  right: 0;
  z-index: 99;
}
</style>
