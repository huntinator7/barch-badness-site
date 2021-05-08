<template lang="pug">
.match
  .contenders
    song-frame(
      :song="match.song_a",
      :votes="match.song_a_votes",
      :winner="match.winner",
      :showEmbed="!match.winner"
    )
    song-frame(
      :song="match.song_b",
      :votes="match.song_b_votes",
      :winner="match.winner",
      :showEmbed="!match.winner"
    )
  .winner(v-if="!!match.winner && match.round === 0")
    song-frame(:song="match.winner")
</template>

<script>
import SongFrame from "@/components/SongFrame";

export default {
  name: "Match",
  components: {
    SongFrame,
  },
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>