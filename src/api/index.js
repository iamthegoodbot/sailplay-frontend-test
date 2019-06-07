import axios from 'axios';

const api = {
  prepareFetchedLimits(data) {
    data.users.min_registration_date = data.users.min_registartion_date;
    delete data.users.min_registartion_date;
    return data;
  },
  fetchSearchLimits() {
    return axios.get('public/search_limits.json').then((response) => {
      return this.prepareFetchedLimits(response.data);
    })
  },
  fetchUsers() {
    return axios.get('public/users.json').then((response) => {
      return response.data;
    });
  }
};

export default api;
