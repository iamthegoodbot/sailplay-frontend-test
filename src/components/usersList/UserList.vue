<template>
  <div class="users_list_wrapper">
    <table class="users_list">
      <tr>
        <th>
          <div
            class="name"
            :class="{'open': !toggleSortTable.name}"
          > <span @click="sortBy">Имя и фамилия</span></div>
        </th>

        <th>
          <div

            class="date"
            :class="{'open': !toggleSortTable.date}"
          > <span @click="sortBy">Дата регистрации</span> </div>
        </th>

        <th>
          <div
            class="points points_earned"
            :class="{'open': !toggleSortTable.pointsEarned}"
          > <span @click="sortBy">Баллы Заработанные</span> </div>
        </th>
        <th>
          <div
            class="points points_spent"
            :class="{'open': !toggleSortTable.pointsSpent}"
          > <span @click="sortBy">Баллы Потраченные</span> </div>
        </th>
      </tr>

      <tr
        v-for="user in paginatedData"
        :key="user.id"
      >
        <td>{{user.name}}</td>
        <td>{{user.registration_date}}</td>
        <td><i class="user_points_icon"></i> {{user.points_earned}}</td>
        <td><i class="user_points_icon"></i> {{user.points_spent}}</td>
      </tr>
    </table>

    <Pagination
      :currentPage="currentPage"
      :pageCount="pageCount"
      :perPage="perPage"
      @paginate="paginate"
    />

  </div>
</template>
<script>
import Pagination from './Pagination.vue';

export default {
  props: ["users", "filterUsers"],
  data () {
    return {
      currentPage: 1,
      perPage: 10,
      toggleSortTable: {
        name: false,
        pointsEarned: false,
        pointsSpent: false,
        date: false
      }
    };
  },
  components: {
    Pagination
  },
  computed: {
    pageCount () {
      if (this.users) {
        const length = this.users.length;
        return Math.ceil(length / this.perPage);
      }
    },
    paginatedData () {
      if (this.users) {
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        return this.users.slice(start, end);
      }
    }
  },
  methods: {
    paginate (page) {
      this.currentPage = page;
    },
    sortBy () {
      if (event.target.parentElement.classList[1] === "points_earned") {
        this.toggleSortTable.pointsEarned ? this.users.sort((a, b) => b.points_earned - a.points_earned) : this.users.sort((a, b) => a.points_earned - b.points_earned);
        this.toggleSortTable.pointsEarned = !this.toggleSortTable.pointsEarned;
      }
      else if(event.target.parentElement.classList[1] === "points_spent") {
        this.toggleSortTable.pointsSpent ? this.users.sort((a, b) => b.points_spent - a.points_spent) : this.users.sort((a, b) => a.points_spent - b.points_spent);
        this.toggleSortTable.pointsSpent = !this.toggleSortTable.pointsSpent;
      }
      else if (event.target.parentElement.classList[0] === "name") {
        if(this.toggleSortTable.name) {
          this.users.sort(function (a, b) {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
          });
        }
        else {
            this.users.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
          });
        }
        this.toggleSortTable.name = !this.toggleSortTable.name;
      } else if(event.target.parentElement.classList[0] === "date") {
        if(this.toggleSortTable.date) {
          this.users.sort((a, b) => {
            const dateA = new Date(a.registration_date);
            const dateB = new Date(b.registration_date);
            return dateB - dateA;
          });
        } else {
          this.users.sort((a, b) => {
            const dateA = new Date(a.registration_date);
            const dateB = new Date(b.registration_date);
            return dateA - dateB;
          });
        }
        this.toggleSortTable.date = !this.toggleSortTable.date;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./users_list";
</style>