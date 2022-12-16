<template lang="pug">
.day(:style="dayStyle")
  h1 Day {{ day }}
  .rounds
    .round(v-for="round in rounds")
      match(v-for="match in round.matches", :match="match")
</template>

<script>
import { db } from "./db";
import Match from "@/components/Match";

export default {
  name: "Day",
  components: {
    Match,
  },
  props: {
    day: {
      required: true,
    },
  },
  data() {
    return {
      matches: [],
    };
  },
  computed: {
    rounds() {
      const x = Object.entries(
        this.matches.reduce(
          (a, c) => ({
            ...a,
            [c.round]: [...(a[c.round] || []), c],
          }),
          {}
        )
      ).sort(([a, _a], [b, _b]) => b - a);
      const y = x.map(([_k, v]) => ({
        matches: v.sort((a, b) => (a?.matchIndex ?? 0) - (b?.matchIndex ?? 0)),
      }));
      return y;
    },
  },
  watch: {
    day: {
      immediate: true,
      handler(day) {
        this.$bind(
          "matches",
          db.collection("Matches").where("day", "==", parseInt(day))
        );
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.day {
  h1 {
    font-size: 4em;
    margin: 0.25em 0em;
  }
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  padding: 10px;
  align-items: flex-start;
  margin-bottom: 20px;
  .rounds {
    display: flex;
    flex-direction: row;
    align-items: center;
    .round {
      margin-left: 10px;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>
