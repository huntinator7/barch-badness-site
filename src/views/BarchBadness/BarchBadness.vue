<template lang="pug">
.barch-badness
  #nav
    router-link(to="/") Home
    span {{ ' | ' }}
    router-link(to="/days?orderby=desc&expanded=y") Days
    span {{ ' | ' }}
    router-link(to="/winners") Winners
  router-view
  div Test
</template>

<script>
export default {
  name: "BarchBadness",
};
</script>
