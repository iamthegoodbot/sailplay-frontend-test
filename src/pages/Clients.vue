<template>
  <div class="content_wrapper_inner">
    <div class="route_title">

      <h1>Клиенты</h1>

    </div>
    <TheFilter @search="searchClients"/>
  </div>
</template>

<script>
  import TheFilter from '@/components/filters/TheFilter.vue'
  import api from '@/api';

  export default {
    name: 'Clients',
    components: {TheFilter},
    data() {
      return {
        users: null
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
        console.log('searchClients', data);
      }
    }
  }
</script>
