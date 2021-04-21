<template lang="pug">
.day
  h1 Day {{ $route.params.day }}
</template>

<script>
export default {
  name: "Day",
};
</script>