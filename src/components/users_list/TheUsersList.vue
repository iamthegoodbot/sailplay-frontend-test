<template>
  <div class="users_list_wrapper">

    <table class="users_list">
      <tr>
        <th>
          <div>Имя и фамилия</div>
        </th>
        <th>
          <div>Дата регистрации</div>
        </th>
        <th>
          <div>Баллы</div>
        </th>
      </tr>

      <tr v-for="user in filteredUsers" :key="user.id">
        <td>
          {{user.name}}
        </td>
        <td>
          {{user.registration_date}}
        </td>
        <td>
          <i class="user_points_icon"></i> {{user.points_earned}}
        </td>
      </tr>
      <tr v-if="filteredUsers.length === 0">
        <td colspan="3" class="nothing-found">
          Ничего не найдено
        </td>
      </tr>

    </table>

    <the-pagination
            :current-page="currentPage"
            :all-count="filteredCount"
            @paginate="paginate"
            :items-per-page="itemsPerPage"/>
  </div>
</template>

<script>
  import ThePagination from './ThePagination.vue';
  import { sort, filter} from "./filters_and_sorting";

  export default {
    components: {ThePagination},
    props: ['users', 'filters'],
    data() {
      return {
        currentPage: 1,
        itemsPerPage: 10,
        filteredCount: 0
      }
    },
    name: "TheUsersList",
    computed: {
      filteredUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const users = filter(this.users, this.filters);
        this.filteredCount = users.length;
        return users.slice(start, start + this.itemsPerPage);
      }
    },
    methods: {
      paginate(page) {
        this.currentPage = page;
      }
    },
    watch: {
      filters() {
        this.currentPage = 1;
      }
    }
  }
</script>

<style lang="less">
  @import './users_list.less';
  .nothing-found {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
