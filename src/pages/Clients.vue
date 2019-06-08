<template>
  <div class="content_wrapper_inner">
    <div class="route_title">

      <h1>Клиенты</h1>

    </div>
    <TheFilter
            v-if="users"
            :filters="filtersFromUrl"
            @search="searchClients"
            :clients-count="filteredUsersCount"/>
    <TheUsersList
            :users="users"
            :filters="filters"
            @filtered="onFilteredUsersList"
            v-if="users && filters" />
  </div>
</template>

<script>
  import TheFilter from '@/components/filters/TheFilter.vue';
  import TheUsersList from '@/components/users_list/TheUsersList.vue';
  import api from '@/api';
  import {
    serializeFiltersToUrl,
    deserializeFiltersFromUrl
  } from '@/components/users_list/url_helper.js';

  export default {
    name: 'Clients',
    components: {TheFilter, TheUsersList},
    data() {
      return {
        users: null,
        filteredUsersCount: null,
        filtersFromUrl: null,
        filters: null
      }
    },
    mounted() {
      this.fetchUsers();
      this.filtersFromUrl = deserializeFiltersFromUrl(this.$route.query);
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
        const query = serializeFiltersToUrl(data);
        this.$router.replace({name: 'clients', query});
        this.filters = data;
      }
    }
  }
</script>
