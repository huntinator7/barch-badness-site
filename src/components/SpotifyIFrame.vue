<template lang="pug">
.song
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
export default {
  name: "SpotifyIFrame",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>