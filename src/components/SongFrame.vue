<template lang="pug">
.song-frame(:style="getColors(song.id)")
  span.bold {{ song.name }}
  span {{ song.artists }}
  span.winner(v-if="isWinner") W
  img(
    v-for="(vote, i) in votes",
    :src="vote.avatar",
    :style="`right:${40 * i}px;`"
  )
</template>

<script>
export default {
  name: "SongFrame",
  props: {
    song: {
      type: Object,
      required: true,
    },
    votes: {
      type: Array,
      default: () => [],
    },
    winner: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isWinner() {
      return this.winner?.id === this.song.id;
    },
  },
  methods: {
    getColors(id) {
      const bg = this.intToRGB(this.hashCode(id));
      const font = this.isDark(bg) ? "#fff" : "#000";
      return {
        "background-color": bg,
        color: font,
      };
    },
    isDark(color) {
      var c = color.substring(1); // strip #
      var rgb = parseInt(c, 16); // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff; // extract red
      var g = (rgb >> 8) & 0xff; // extract green
      var b = (rgb >> 0) & 0xff; // extract blue

      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

      return luma < 120;
    },
    hashCode(str) {
      // java String#hashCode
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    },
    intToRGB(i) {
      var c = (i & 0x00ffffff).toString(16).toUpperCase();

      return "#" + "00000".substring(0, 6 - c.length) + c;
    },
  },
};
</script>

<style lang="scss" scoped>
.song-frame {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  padding-left: 10px;
  text-align: left;
  height: 80px;
  position: relative;
  font-size: 1rem;
  font-weight: normal;
  .bold {
    font-weight: bold;
  }
  img {
    height: 32px;
    width: 32px;
    position: absolute;
    bottom: 0px;
  }
  .winner {
    position: absolute;
    right: -40px;
    height: 80px;
    width: 40px;
    color: black;
    background-color: white;
    font-size: 2em;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>