<template>
  <div class="content_wrapper_inner">
    <div class="route_title">

      <h1>Клиенты</h1>

    </div>
    <TheFilter @search="searchClients" :clients-count="filteredUsersCount"/>
    <TheUsersList
            :users="users"
            :filters="filters"
            @filtered="onFilteredUsersList"
            v-if="users && filters" />
  </div>
</template>

<script>
  import TheFilter from '@/components/filters/TheFilter.vue'
  import TheUsersList from '@/components/users_list/TheUsersList.vue'
  import api from '@/api';

  export default {
    name: 'Clients',
    components: {TheFilter, TheUsersList},
    data() {
      return {
        users: null,
        filteredUsersCount: null,
        filters: null
      }
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      onFilteredUsersList(count) {
        this.filteredUsersCount = count
      },
      fetchUsers() {
        api.fetchUsers().then((data) => {
          this.users = data;
        });
      },
      searchClients(data) {
        this.filters = data;
      }
    }
  }
</script>
