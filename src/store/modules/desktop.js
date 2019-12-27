import {
  isEmpty, complement, prop, filter, map,
  find, without, append, propEq, dissoc,
} from 'rambda';

import { get as getItem, set as storeBlocks } from '../localStorage';
import { generateBlocks } from '../../helpers/desktop';

const isNotEmpty = complement(isEmpty);
const isRemoved = (prop('removed'));

export default {
  state: {
    blocks: [],
  },
  getters: {
    blocks: state => state.blocks,
    blocksCount: (state, getters) => getters.visibleBlocks.length,
    visibleBlocks: state => filter(complement(isRemoved), state.blocks),
    removedBlocks: state => filter(isRemoved, state.blocks),
  },
  mutations: {
    setBlocks(state, payload) {
      state.blocks = payload;
    },
  },
  actions: {
    init: ({ commit, getters }, data) => {
      if (isNotEmpty(getters.blocks)) return false;

      let blocks = [];
      const storageBlocks = getItem('blocks');

      if (storageBlocks) {
        blocks = storageBlocks;
      } else {
        blocks = generateBlocks(data);
      }
      return commit('setBlocks', blocks);
    },
    updateBlocks: ({ commit, getters }, block) => {
      const update = item => (
        item.id === block.id ? {
          ...item,
          ...block,
        } : item
      );
      const updated = map(update, getters.blocks);
      storeBlocks({ blocks: updated });
      commit('setBlocks', updated);
    },
    popToTop: ({ commit, getters }, id) => {
      const block = find(propEq('id', id), getters.blocks);
      const updated = append(
        block, without([block], getters.blocks),
      );
      storeBlocks({ blocks: updated });
      commit('setBlocks', updated);
    },
    remove: ({ commit, getters }, id) => {
      const updated = map(
        item => (
          item.id === id ? {
            ...item,
            w: 300,
            h: 150,
            x: 0,
            y: 30,
            removed: true,
          } : item
        ),
        getters.blocks,
      );
      storeBlocks({ blocks: updated });
      commit('setBlocks', updated);
    },
    restore: ({ commit, getters, dispatch }, params) => {
      const { id, parentWidth } = params;
      const updated = map(
        item => (
          item.id === id ? dissoc(
            'removed',
            {
              ...item,
              x: parentWidth / 2 - 150,
            },
          ) : item
        ),
        getters.blocks,
      );
      commit('setBlocks', updated);
      dispatch('popToTop', id);
    },
  },
};
