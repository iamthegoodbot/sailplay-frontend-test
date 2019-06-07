<template>
  <div class="content_wrapper_inner">
    <div class="route_title">

      <h1>Клиенты</h1>

    </div>
    <TheFilter @search="searchClients"/>
    <TheUsersList :users="users" :filters="filters" v-if="users && filters" />
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
        filters: null
      }
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
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
