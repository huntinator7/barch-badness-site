<template lang="pug">
day(:day="$route.params.day")
</template>

<script>
import Day from "@/components/Day";

export default {
  name: "DayPage",
  components: {
    Day,
  },
};
</script>
