<template lang="pug">
.spotify-i-frame(:style="frameStyle")
  iframe(
    :src="`https://open.spotify.com/embed/track/${id}`",
    width="300",
    height="80",
    frameborder="0",
    allowtransparency="true",
    allow="encrypted-media"
  )
</template>

<script>
import { isMobile } from "./mobile";
export default {
  name: "SpotifyIFrame",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    frameStyle() {
      return {
        "margin-left": isMobile() ? "0px" : "10px",
        "margin-top": isMobile() ? "10px" : "0px",
      };
    },
  },
};
</script>