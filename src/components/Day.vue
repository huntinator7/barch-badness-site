<template lang="pug">
.day
  h1 Day {{ day }}
  .rounds
    .round(v-for="round in rounds")
      .match(v-for="match in round.matches")
        .contenders
          song-frame(
            :song="match.song_a",
            :votes="match.song_a_votes",
            :winner="match.winner"
          )
          song-frame(
            :song="match.song_b",
            :votes="match.song_b_votes",
            :winner="match.winner"
          )
        .winner(v-if="!!match.winner && match.round === 0")
          song-frame(:song="match.winner")
</template>

<script>
import { db } from "./db";
import SongFrame from "./SongFrame";

export default {
  name: "Day",
  components: {
    SongFrame,
  },
  props: {
    day: {
      type: Number,
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
          db
            .collection("Prod")
            .doc("BarchBadness")
            .collection("Matches")
            .where("day", "==", day)
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
  .match {
    .contenders {
      > div:first-child {
        margin-bottom: 10px;
      }
    }
    .winner {
      margin-left: 60px;
    }
    display: flex;
    align-items: center;
    padding: 20px 40px 10px 10px;
  }
}
</style>
