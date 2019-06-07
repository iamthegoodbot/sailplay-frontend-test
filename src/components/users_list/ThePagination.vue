<template>
  <div class="pagination_wrapper">
    <table class="users_list_pagination">
      <tr>
        <td>
          <span class="users_list_pagination_item"
                v-for="(i, index) in pages"
                :key="index"
                @click="handlePaginationClick(i)"
                :class="{ 'selected': i === currentPage }">{{i}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { pagination } from '@/utils';

  export default {
    name: "ThePagination",
    props: ['currentPage', 'allCount', 'itemsPerPage'],
    data() {
      return {
      }
    },
    mounted() {
      console.log('mounted', this.currentPage, this.allCount)
    },
    computed: {
      pages() {
        return pagination(this.currentPage, Math.ceil(this.allCount / this.itemsPerPage));
      }
    },
    methods: {
      handlePaginationClick(i) {
        !isNaN(parseInt(i, 10)) && this.$emit('paginate', i)
      }
    }
  }
</script>

<style scoped>

</style>
