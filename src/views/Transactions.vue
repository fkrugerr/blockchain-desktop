<template>
  <b-container class="py-4">
    <b-row>
      <b-col>
        <b-button variant="success" class="local-btns" @click="start">Start</b-button>
      </b-col>
      <b-col class="text-center">
        <b-button variant="danger" class="local-btns" @click="stop">Stop</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="warning" class="local-btns" @click="reset">Reset</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-5 mb-4">
      <b-col>
        <h3 class="text-center">Total: {{ total }} BTC</h3>
      </b-col>
    </b-row>
    <b-row class="mt-5 mb-4">
      <b-col>
        <b-table hover :items="items" :fields="fields" class="text-center" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
/* eslint-disable */
import { map, add, sum, pluck, reverse } from 'rambda';

let websocket;

export default {
  data() {
    return {
      records: [],
      fields: [
        {
          key: 'hash',
          sortable: false,
        },
        {
          key: 'sum',
          label: 'Sum',
        },
      ],
    };
  },
  computed: {
    total() {
      return this.records.length && sum(pluck('sum', this.records)).toFixed(7);
    },
    items() {
      return map(
        (item) => ({
          ...item,
          sum: `${item.sum.toFixed(7)} BTC`,
        }),
        reverse(this.records)
      );
    },
  },
  methods: {
    init() {
      websocket = new WebSocket('wss://ws.blockchain.info/inv');
      websocket.onmessage = (event) => {
        this.handleTransaction(JSON.parse(event.data));
      };
    },
    handleTransaction(data) {
      if (data.op === 'utx') {
        this.records.push({
          hash: data.x.hash,
          sum: sum(pluck('value', data.x.out)) / 100000000,
        });
      }
    },
    start() {
      websocket.send('{"op":"unconfirmed_sub"}');
    },
    stop() {
      websocket.send('{"op":"unconfirmed_unsub"}');
    },
    reset() {
      this.records = [];
    },
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.stop();
  },
};
</script>

<style lang="scss" scoped>
.local-btns {
  width: 12rem;
  max-width: 100%;
}
</style>
