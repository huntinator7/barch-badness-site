<template lang="pug">
.home
  h1 Home
  .list
    day(
      v-for="(_, day) in new Array(lastDayNumber)",
      :day="lastDayNumber - day",
      :key="lastDayNumber - day"
    )
</template>

<script>
import { db } from "../components/db";
import Day from "../components/Day";

export default {
  name: "Home",
  components: {
    Day,
  },
  data() {
    return {
      lastDay: [],
    };
  },
  computed: {
    lastDayNumber() {
      return this.lastDay?.[0]?.day;
    },
  },
  firestore: {
    lastDay: db
      .collection("Prod")
      .doc("BarchBadness")
      .collection("Matches")
      .orderBy("day", "desc")
      .limit(1),
  },
};
</script>

<style lang="scss" scoped>
.home {
  overflow-x: auto;
  .list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: fit-content;
  }
}
</style>
