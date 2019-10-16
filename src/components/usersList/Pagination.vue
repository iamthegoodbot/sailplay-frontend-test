<template>
  <div
    class="pagination_wrapper"
    v-dragscroll.x="true"
  >
    <table class="users_list_pagination">
      <tr ref="row">

        <td
          v-for="pagination in pageCount"
          :key="pagination"
        >
          <span
            @click="paginate"
            :class="{selected: currentPage === pagination}"
            class="users_list_pagination_item"
          >{{pagination}}</span>
        </td>

      </tr>

    </table>
  </div>
</template>
<script>
import { dragscroll } from 'vue-dragscroll';

export default {
  directives: {
    dragscroll
  },
  props: {
    "currentPage": {
      type: Number
    },
    "perPage": {
      type: Number
    },
    "pageCount": {
      type: Number
    }
  },
  computed: {
  },
  methods: {
    paginate (event) {
      this.$emit("paginate", parseInt(event.target.innerText));
    }
  },
};
</script>
<style lang="less" scoped>
@import "./pagination.less";
</style>