<template>
  <div>
    <div class="content_wrapper_inner">
      <div class="route_title">
        <h1>Клиенты</h1>
      </div>

      <FilterCustom
        @filterUser="search"
        @reset="reset"
        :users="users"
      />

      <UserList :users="users" />

    </div>
  </div>

</template>
<script>
import FilterCustom from "../components/filters/FilterCustom.vue";
import UserList from "../components/usersList/UserList.vue";
import axios from "axios";

export default {
  data () {
    return {
      users: null,
      filterUsers: null
    };
  },
  components: {
    FilterCustom,
    UserList
  },
  mounted () {
    axios.get("http://localhost:3001/users").then((response) => {
      this.users = response.data;
    });
  },
  methods: {
    reset () {
      axios.get("http://localhost:3001/users").then((response) => {
        this.users = response.data;
      });
    },
    search (data) {
      this.users = data;
    }
  }
};
</script>
<style lang="less" scoped>
</style>