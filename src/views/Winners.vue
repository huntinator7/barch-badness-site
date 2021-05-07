<template lang="pug">
.winners
  h1 Winners
  .days(:style="daysStyle")
    .day(v-for="match in matches")
      h2 Day {{ match.day }}
      h3 Winner
      song-frame(
        :song="match.winner",
        :votes="match.winner.id === match.song_a.id ? match.song_a_votes : match.song_b_votes"
      )
      h5 Runner-up
      song-frame(
        :song="match.winner.id === match.song_a.id ? match.song_b : match.song_a",
        :votes="match.winner.id === match.song_a.id ? match.song_b_votes : match.song_a_votes"
      )
</template>

<script>
import { isMobile } from "@/components/mobile";
import { db } from "@/components/db";
import SongFrame from "@/components/SongFrame";

export default {
  name: "Winners",
  components: {
    SongFrame,
  },
  data() {
    return {
      finalRounds: [],
      daysStyle: {
        "grid-template-columns": isMobile() ? "1fr" : "1fr 1fr 1fr 1fr",
      },
    };
  },
  computed: {
    matches() {
      return this.finalRounds
        .filter((f) => !!f.winner)
        .sort((a, b) => a.day - b.day);
    },
  },
  firestore: {
    finalRounds: db
      .collection("Prod")
      .doc("BarchBadness")
      .collection("Matches")
      .where("round", "==", 0)
      .orderBy("day", "desc"),
  },
};
</script>

<style lang="scss" scoped>
.winners {
  .days {
    display: grid;
    column-gap: 20px;
    h2 {
      margin: 3rem 0 0 0;
    }
    .day {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
