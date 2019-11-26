<template>
     <div class="content_wrapper">
    <div class="content_wrapper_inner">
      <div class="route_title">
        <h1>Клиенты</h1>
      </div>
      <!-- Filters section -->
      <div class="filters_wrapper">
        <div class="filters_list">
          <div class="filters_list_field">
            <input class="query_input" type="text" placeholder="Поиск по имени и фамилии" v-model='searchFieldValue'>
          </div>
          <div class="filters_list_field">
            <div class="filters_list_field_label type_date">
              <span class="form_search_param_label">Дата регистрации</span>
            </div>
            <label class="filters_list_field_input">
              <div class="date_picker_wrapper">
                <masked-input class="input_simple" v-model="minDate" mask="1111-11-11" placeholder="Введите дату" />
              </div>
            </label>
            <label class="filters_list_field_input">
              <div class="date_picker_wrapper">
                <masked-input class="input_simple" v-model="maxDate" mask="1111-11-11" placeholder="Введите дату" />
              </div>
            </label>
          </div>
          <div class="filters_list_field">
            <a 
              href="" 
              onClick='return false;' 
              class="filter_field_expand" 
              :class="{'open' : isPointsFilterVisible}" 
              style="" 
              @click="togglePointsFilter"
            >
              <span 
              class="filter_field_expand_label"
              >Баллы
              </span>
            </a>
          </div>
          <div class="filters_list_field no_wrap" style="padding-left: 20px;" v-if='isPointsFilterVisible'>
            <div class="filters_list_field_label">
              <span class="form_search_param_label">Кол-во заработанных баллов</span>
            </div>
            <div class="slider_wrap">
              <div class="slider_inputs_wrap">
                <div class="range-slider">
              <input @change="setRangeCircles" v-model.number="minPoints" min="0" max="5000" step="100" type="range" />
              <input @change="setRangeCircles" v-model.number="maxPoints" min="0" max="5000" step="100" type="range" />
            </div>
                <div class="slider_inputs_placeholder">
                  {{minPoints}} — {{maxPoints}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="filters_footer">
          <div class="filters_footer_inner clearfix">
            <span class="filters_footer_count">
              {{USERS.length}} клиентов
            </span>
            <button type="button" class="search_button" @click="applyFilters(searchFieldValue)">Поиск</button>
            <button type="button" class="reset_button" @click="clearFilters">Сбросить</button>
          </div>
        </div>
      </div>
      <!-- Users list section -->
      <div class="users_list_wrapper">
        <table class="users_list">
          <tr>
            <th @click="sortByName">
              <div>Имя и фамилия</div>
            </th>
            <th @click="sortByDate">
              <div>Дата регистрации</div>
            </th>
            <th @click="sortByPoints">
              <div>Баллы</div>
            </th>
          </tr>
          <tr 
            v-for='user in paginatedUsers'
            :key='user.id'
          >
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
        </table>
        <div class="pagination_wrapper">
          <table class="users_list_pagination">
            <tr class="list_pagination__wrapper">
              <td 
                v-for='page in pages'
                :key='page'
                @click="pageClick(page)"
              >
                <span 
                  class="users_list_pagination_item selected">{{page}}
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MaskedInput from 'vue-masked-input'
import { resolve } from 'path';

export default {
    name: 'layout',
    components: {
      MaskedInput // маска для полей даты
    },
    data() {
      return {
          minPoints: 0, //минимальное значение фильтра баллов
          maxPoints: 5000, //максимальное значение фильтра баллов
          minDate: '2013-09-10', // значение в поле меньшей даты
          maxDate: '2020-11-10', // значение в поле большей даты
          pageNum: 1, //страница по умолчанию
          usersPerPage: 10, // пользователей на странице
          isPointsFilterVisible: true, //видимость фильра с баллами
          searchFieldValue: '', //значение фильра с текстовым полем
          filteredUsers: [], //массив пользователей, на которых действует 1 или более фильтров
      }
    },
    computed: {
      ...mapGetters([
        'USERS' //геттер для пользвателей
      ]),
      pages() {
        // считаем сколько страниц выводится на странице
        if (this.filteredUsers.length) {
          return Math.ceil(this.filteredUsers.length / this.usersPerPage);
        } else {
          return Math.ceil(this.USERS.length / this.usersPerPage);
        }
      },
      paginatedUsers(){
        //разбиваем пользователей по страницам
        let from = (this.pageNum - 1) * this.usersPerPage;
        let to = from + this.usersPerPage;
        if (this.filteredUsers.length) {
          return this.filteredUsers.slice(from, to);
        } else {
          return this.USERS.slice(from, to);
        }
}
    },
    methods: {
      ...mapActions([
        'GET_USERS_FROM_API' 
      ]),
      togglePointsFilter() {
        // скрыть / показать фильт для баллов
        this.isPointsFilterVisible = !this.isPointsFilterVisible;
      },
      setRangeCircles: function() {
        // если мы утаскиваем кружок с большим кол-вом баллов левее чем кружок с меньшим (и наоборот) - они меняются значениями. Что б не ломалось :)
        if (this.minPoints > this.maxPoints) {
          var tmp = this.maxPoints;
          this.maxPoints = this.minPoints;
          this.minPoints = tmp;
        }
      },
      applyFilters(value) {
        // единый метод фильтрации
        let vm = this;
        if (value) {
          // для фильтрации по ФИО
          this.filteredUsers = [];
          this.USERS.map(function (item) {
            if (item.name.toLowerCase().includes(value.toLowerCase()) && item.points_earned >= vm.minPoints && item.points_earned <= vm.maxPoints) {
                vm.filteredUsers.push(item);
            }
          })
        } else {
          // для фильтрации по баллам
            this.filteredUsers = [];
            return new Promise(resolve => {
              this.USERS.map(function (item) {
                if (item.points_earned >= vm.minPoints && item.points_earned <= vm.maxPoints) {
                    vm.filteredUsers.push(item);
                }
              })
              resolve()
            })
            .then(() => {
              // для фильтрации по датам
              if (vm.minDate || vm.maxDate) {
                let max = new Date(vm.maxDate).getTime();
                let min = new Date(vm.minDate).getTime();
                vm.filteredUsers = vm.filteredUsers.filter(e => {
                  var date = new Date(e.registration_date).getTime();
                  if (date >= min && date <= max) {
                    return e;
                  }
                });
              }
            })
        }
      },
      pageClick(pageNum) {
        //переключение страниц
        this.pageNum = pageNum;
      },
      sortByName() {
        //сортировка по ФИО
        let users = this.USERS;
        if (this.filteredUsers.length) {
          users = this.filteredUsers;
        }
        users.sort((a, b) => a.name.localeCompare(b.name));
      },
      sortByPoints() {
        //сортировка по баллам
        let users = this.USERS;
        if (this.filteredUsers.length) {
          users = this.filteredUsers;
        } 
        users.sort((a, b) => a.points_spent - b.points_spent);
      },
      sortByDate() {
        //сортировка по дате
        if (this.filteredUsers.length) {
          this.filteredUsers.sort((a, b) => a.registration_date.localeCompare(b.registration_date));
        } else {
          this.USERS.sort((a, b) => a.registration_date.localeCompare(b.registration_date));
        }
      },
      clearFilters() {
        //очистка фильтров
        this.minPoints = 0;
        this.maxPoints = 5000;
        this.searchFieldValue = '';
        this.applyFilters();
      }
  },
  created() {
    //Получаем пользователей из БД
    this.GET_USERS_FROM_API();
  }
}
</script>

<style>
    /* Стили для range слайдера */
  .range-slider {
  width: 300px;
  margin: auto 16px;
  text-align: center;
  position: relative;
}

.range-slider svg,
.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=number] {
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1.6em;
  -moz-appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type=number]:invalid,
input[type=number]:out-of-range {
  border: 2px solid #ff6347;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #7084b6;
}

input[type=range]:focus::-ms-fill-lower {
  background: #ffffff;
}

input[type=range]:focus::-ms-fill-upper {
  background: #ffffff;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  animate: 0.2s;
  background: #7084b6;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: -7px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  border: 1px solid #ffffff;
  height: 32px;
  width: 32px;
  border-radius: 25px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
  margin-top: -7px;
}

</style>