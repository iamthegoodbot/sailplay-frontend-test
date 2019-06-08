<template>
  <div class="filters_wrapper">

    <div class="filters_list">

      <div class="filters_list_field">

        <input class="query_input" type="text" v-model="textQuery" placeholder="Поиск по имени и фамилии">

      </div>

      <div class="filters_list_field">

        <div class="filters_list_field_label type_date">
          <span class="form_search_param_label">Дата регистрации</span>
        </div>


        <datepicker
                v-if="searchLimit"
                v-model="startDate"
                :min-date="searchLimit.min_registration_date"
                :max-date="searchLimit.max_registration_date"
                label="от" />
        <datepicker
                v-if="searchLimit"
                v-model="endDate"
                :min-date="searchLimit.min_registration_date"
                :max-date="searchLimit.max_registration_date"
                label="до" />

      </div>

      <div class="filters_list_field">

        <a href="" class="filter_field_expand" :class="{open: showSliders, close: !showSliders}" @click.prevent="showSliders = !showSliders">
          <span class="filter_field_expand_label">Баллы</span>
        </a>

      </div>

      <div class="filters_list_field filters_list_slider no_wrap" v-show="showSliders">
        <div class="filters_list_field_label">
          <span class="form_search_param_label">Кол-во заработанных баллов</span>
        </div>
        <slider v-if="searchLimit" v-model="earnedPointsModel"/>
      </div>
      <div class="filters_list_field filters_list_slider no_wrap" v-show="showSliders">
        <div class="filters_list_field_label">
          <span class="form_search_param_label">Кол-во потраченных баллов</span>
        </div>
        <slider v-if="searchLimit" v-model="spentPointsModel"/>
      </div>

    </div>

    <div class="filters_footer">

      <div class="filters_footer_inner clearfix">
        <clients-counter :count="clientsCount" />
        <button type="button" class="search_button" @click="search">Поиск</button>
        <button type="button" class="reset_button" @click="reset">Сбросить</button>
      </div>

    </div>

  </div>
</template>

<script>
  import Datepicker from '@/components/datepicker/Datepicker.vue';
  import Slider from '@/components/slider/Slider.vue';
  import ClientsCounter from '@/components/filters/ClientsCounter.vue';
  import api from '@/api';

  export default {
    components: {Slider, ClientsCounter, Datepicker},
    props: ['clientsCount', 'filters'],
    data() {
      return {
        textQuery: '',
        showSliders: false,
        searchLimit: null,
        startDate: null,
        endDate: null,
        earnedPointsModel: null,
        spentPointsModel: null
      }
    },
    mounted() {
      this.fetchSearchLimits()
    },
    methods: {
      fetchSearchLimits() {
        api.fetchSearchLimits().then((data) => {
          this.searchLimit = data.users;
          this.showSliders = true;
          this.setupSliderModels(true);
          this.setupDatepickers(true);
          this.setupTextQuery(true);
          this.search();
        })
      },
      reset() {
        this.setupSliderModels();
        this.setupDatepickers();
        this.setupTextQuery();
        this.search();
      },
      search() {
        const searchData = {
          textQuery: this.textQuery.toLowerCase(),
          startDate: this.startDate,
          endDate: this.endDate,
          earnedPoints: {
            start: this.earnedPointsModel.start,
            end: this.earnedPointsModel.end
          },
          spentPoints: {
            start: this.spentPointsModel.start,
            end: this.spentPointsModel.end
          }
        };
        this.$emit('search', searchData);
      },
      setupTextQuery(isInit) {
        this.textQuery = '';
        if (isInit && this.filters.textQuery) {
          this.textQuery = this.filters.textQuery;
        }
      },
      setupDatepickers(isInit) {
        this.startDate = new Date(this.searchLimit.min_registration_date);
        this.endDate = new Date(this.searchLimit.max_registration_date);
        if (isInit && this.filters.startDate && this.filters.endDate) {
          this.startDate = this.filters.startDate;
          this.endDate = this.filters.endDate;
        }
      },
      setupSliderModels(isInit) {
        this.earnedPointsModel = {
          start: this.searchLimit.min_points_earned,
          end: this.searchLimit.max_points_earned,
          min: this.searchLimit.min_points_earned,
          max: this.searchLimit.max_points_earned
        };
        this.spentPointsModel = {
          start: this.searchLimit.min_points_spent,
          end: this.searchLimit.max_points_spent,
          min: this.searchLimit.min_points_spent,
          max: this.searchLimit.max_points_spent
        };
        if (isInit && this.filters.earnedPoints) { // assume spentPoints exist too
          this.earnedPointsModel.start = this.filters.earnedPoints.start;
          this.earnedPointsModel.end = this.filters.earnedPoints.end;
          this.spentPointsModel.start = this.filters.spentPoints.start;
          this.spentPointsModel.end = this.filters.spentPoints.end;
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./filters.less";

  .filters_list_slider {
    padding-left: 20px;
  }
  .filter_field_expand.close {
    &:before {
      transform: rotate(180deg);
    }
  }
  .filters_list .filters_list_field_input {
    white-space: nowrap;
    margin-right: 2rem;
    .date_picker_wrapper {
      background: #dcdcd9;
    }

    span {
      font-weight: 300;
      font-size: 0.85rem;
      padding-left: 8px;
    }
    input.input_simple {
      padding-left: 0;
    }
  }
</style>
