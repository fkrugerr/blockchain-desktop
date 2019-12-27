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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import desktopBlock from '../components/DesktopBlock.vue';

export default {
  components: {
    desktopBlock,
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
    }),
  },
  mounted() {
    this.init({ count: 5, width: this.$refs.wrapper.clientWidth });
  },
};
</script>

<style lang="scss" scoped>
.desktop {
  height: calc(100vh - 115px);
  min-height: 450px;
}
</style>
