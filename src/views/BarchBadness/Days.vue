<template lang="pug">
.days
  h1 Days
  button(
    @click="$router.push({ path: $route.path, query: { orderby: $route.query.orderby, expanded: expanded ? 'n' : 'y' } })"
  ) {{ expanded ? 'View Condensed List' : 'View Expanded List' }}
  button(
    @click="$router.push({ path: $route.path, query: { orderby: orderByAsc ? 'desc' : 'asc', expanded: $route.query.expanded } })"
  ) Order by {{ orderByAsc ? 'Descending' : 'Ascending' }}
  .expanded-list(v-if="expanded")
    day(v-for="day in days", :day="day", :key="day")
  .condensed-list(v-else, :style="listStyle")
    router-link(v-for="day in days", :to="`/day/${day}`") Day {{ day }}
</template>

<script>
import { db } from "@/components/db";
import { isMobile } from "@/components/mobile";
import Day from "@/components/Day";

export default {
  name: "Days",
  components: {
    Day,
  },
  data() {
    return {
      lastDay: [],
    };
  },
  computed: {
    numDays() {
      return this.lastDay?.[0]?.day;
    },
    days() {
      return Array.from({ length: this.numDays }, (_v, i) =>
        this.orderByAsc ? i + 1 : this.numDays - i
      );
    },
    expanded() {
      return this.$route.query?.expanded === "y";
    },
    orderByAsc() {
      return this.$route.query?.orderby === "asc";
    },
    listStyle() {
      return {
        "grid-template-columns": isMobile()
          ? "1fr"
          : "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      };
    },
  },
  firestore: {
    lastDay: db.collection("Matches").orderBy("day", "desc").limit(1),
  },
};
</script>

<style lang="scss" scoped>
.days {
  .condensed-list {
    display: grid;
    justify-content: center;
    align-items: center;
    padding: 10px;
    a {
      font-size: 2em;
      text-decoration: none;
      background-color: lightgray;
      color: #2c3e50;
      padding: 10px;
      margin: 10px;
      border-radius: 3px;
    }
  }
  .expanded-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-x: auto;
  }
}
</style>
