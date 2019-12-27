<template>
  <b-card header="Removed">
    <b-list-group>
      <b-list-group-item
        v-for="item in blocks"
        :key="item.id"
        @click="onRestore(item.id)"
        class="removed-item"
      >{{ item.title }}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  props: {
    blocks: Array,
    onRestore: Function,
  },
};
</script>

<style lang="scss" scoped>
.removed-item {
  cursor: pointer;
}
</style>
