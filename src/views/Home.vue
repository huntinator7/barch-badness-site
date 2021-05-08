<template lang="pug">
.home
  h1 Active Matches
  .list
    .active-match(v-for="match in activeMatches")
      h1(:style="titleStyle") {{ `Day ${match.day} - ${rounds[match.round]} ${match.matchIndex + 1}` }}
      match(:match="match")
  h1 Voting Playlist
  iframe(
    :src="`https://open.spotify.com/embed/playlist/1PBpjIqCbielrYB9OE4wgU`",
    width="300",
    height="380",
    frameborder="0",
    allowtransparency="true",
    allow="encrypted-media"
  )
</template>

<script>
import { isMobile } from "@/components/mobile";
import { db } from "@/components/db";
import Match from "@/components/Match";

export default {
  name: "Home",
  components: {
    Match,
  },
  data() {
    return {
      matches: [],
      rounds: ["Final", "Semifinal", "Quarterfinal"],
    };
  },
  computed: {
    activeMatches() {
      return this.matches.filter((m) => !m.winner);
    },
    titleStyle() {
      return {
        "font-size": isMobile() ? "2em" : "4em",
      };
    },
  },
  firestore: {
    matches: db.collection("Prod").doc("BarchBadness").collection("Matches"),
  },
};
</script>

<style lang="scss" scoped>
.home {
  .list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-x: auto;
  }
  .active-match {
    h1 {
      margin: 0.25em 0em;
    }
    display: flex;
    flex-direction: column;
    background-color: lightgray;
    padding: 10px;
    align-items: flex-start;
    margin-bottom: 20px;
  }
}
</style>
