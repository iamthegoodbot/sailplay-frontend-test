<template>
  <span class="sort-icon">
    <template v-if="enabled && direction === 'asc'">↑</template>
    <template v-else-if="enabled && direction === 'desc'">↓</template>
    <template v-else>&nbsp;</template>
  </span>
</template>

<script>
  export default {
    name: "SortControl",
    props: ['direction', 'enabled']
  }
</script>

<style scoped>
  .sort-icon {
    width: 7px;
    margin-left: -7px;
    display: inline-block;
  }
</style>
