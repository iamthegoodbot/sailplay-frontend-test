<template>
  <div class="users_list_wrapper">

    <table class="users_list">
      <tr>
        <th @click="sortUsers('name')">
          <sort-icon :direction="sorting.direction" :enabled="sorting.type === 'name'"/>
          <span>Имя и фамилия</span>
        </th>
        <th @click="sortUsers('registrationDate')">
          <sort-icon :direction="sorting.direction" :enabled="sorting.type === 'registrationDate'"/>
          <span>Дата регистрации</span>
        </th>
        <th @click="sortUsers('pointsEarned')">
          <sort-icon :direction="sorting.direction" :enabled="sorting.type === 'pointsEarned'"/>
          <span>Баллы</span>
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
  import SortIcon from './SortIcon.vue';
  import {filter, sort} from "./filters_and_sorting";

  export default {
    components: {ThePagination, SortIcon},
    props: ['users', 'filters'],
    data() {
      return {
        sorting: {
          type: null,
          direction: null
        },
        currentPage: 1,
        itemsPerPage: 10,
        filteredCount: 0
      }
    },
    name: "TheUsersList",
    computed: {
      filteredUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        let users = filter(this.users, this.filters);
        if (this.sorting.direction) {
          users = sort(users, this.sorting.type, this.sorting.direction === 'asc');
        }
        this.filteredCount = users.length;
        this.$emit('filtered', this.filteredCount);
        return users.slice(start, start + this.itemsPerPage);
      }
    },
    methods: {
      paginate(page) {
        this.currentPage = page;
      },
      sortUsers(type) {
        const directions = ['asc', 'desc', null];
        if (this.sorting.type === type) {
          const current = directions.indexOf(this.sorting.direction);
          const newDirection = directions[current + 1];
          this.sorting.direction = typeof newDirection === 'undefined' ? directions[0] : newDirection;
        }
        else {
          this.sorting.type = type;
          this.sorting.direction = directions[0];
        }
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
  .users_list th {
    user-select: none;
    cursor: pointer;
  }
</style>
