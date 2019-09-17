<template>
  <!-- Filters section -->
  <div class="filters_wrapper">
    <div class="filters_list">
      <div class="filters_list_field">

        <input
          class="query_input"
          type="text"
          placeholder="Поиск по имени и фамилии"
          @input="inputText"
          @change="searchUsers"
          v-model="textSearch"
        />
      </div>

      <div class="filters_list_field">
        <div class="filters_list_field_label type_date">
          <span class="form_search_param_label">Дата регистрации</span>
        </div>

        <Datepicker
          :value="startDate"
          :min="min_registartion_date"
          :max="max_registration_date"
          @input="changeDate"
          :from="true"
        />

        <Datepicker
          :value="endDate"
          :min="min_registartion_date"
          :max="max_registration_date"
          @input="changeDate"
          :from="false"
        />

      </div>

      <div class="filters_list_field">
        <a
          @click.prevent="expandedSlider"
          class="filter_field_expand"
          :class="{'open': offSlider}"
        >
          <span class="filter_field_expand_label">Баллы</span>
        </a>
      </div>

      <div
        :style="{display: offSlider ? 'none': 'block'}"
        class="filters_list_field no_wrap"
        style="padding-left: 20px; transition: top 1s ease-out 0.5s;"
      >
        <div class="filters_list_field_label">
          <span class="form_search_param_label">Кол-во заработанных баллов</span>
        </div>
        <Slider
          :value="sliderValueEarned"
          @changeSlider="changeSliderEarned"
        />
      </div>
      <div
        :style="{display: offSlider ? 'none': 'block'}"
        class="filters_list_field no_wrap"
        style="padding-left: 20px; transition: top 1s ease-out 0.5s;"
      >
        <div class="filters_list_field_label">
          <span class="form_search_param_label">Кол-во потраченных баллов</span>
        </div>
        <Slider
          :value="sliderValueSpent"
          @changeSlider="changeSliderSpent"
        />
      </div>
    </div>

    <div class="filters_footer">
      <div class="filters_footer_inner clearfix">
        <span class="filters_footer_count">{{usersLength}} клиентов</span>

        <button
          type="button"
          class="search_button"
          @click="searchUsers"
        >Поиск</button>

        <button
          type="button"
          class="reset_button"
          @click="reset"
          :disabled="isDisabled"
          :class="{'gray': isDisabled}"
        >Сбросить</button>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "../datepicker/Datepicker.vue";
import Slider from "../slider/Slider.vue";
import axios from "axios";


export default {
  props: {
    users: {
      type: Array
    }
  },
  data () {
    return {
      offSlider: false,
      startDate: new Date(),
      endDate: new Date(),
      min_registartion_date: "",
      max_registration_date: "",
      resetOn: false,
      default: false,
      sliderValueEarned: {
        min: 0,
        max: 0,
        start: 0,
        end: 0
      },
      sliderValueSpent: {
        min: 0,
        max: 0,
        start: 0,
        end: 0
      },
      textSearch: ""
    };
  },
  mounted () {
    axios.get("http://localhost:3001/limits").then(response => {
      this.min_registartion_date = response.data.users.min_registartion_date;
      this.max_registration_date = response.data.users.max_registration_date;
      this.sliderValueEarned = {
        min: response.data.users.min_points_earned,
        max: response.data.users.max_points_earned,
        start: response.data.users.min_points_earned,
        end: response.data.users.max_points_earned
      };
      this.sliderValueSpent = {
        min: response.data.users.min_points_earned,
        max: response.data.users.max_points_earned,
        start: response.data.users.min_points_earned,
        end: response.data.users.max_points_earned,
      };
      this.startDate = new Date(this.min_registartion_date);
      this.startDate.setDate(this.startDate.getDate() + 1);
      this.endDate = new Date(this.max_registration_date);
    });
  },
  methods: {
    inputText (event) {
      if (!event.target.value && !this.default) this.resetOn = false;
      else this.resetOn = true;
    },
    reset () {
      this.$emit("reset");
      axios.get("http://localhost:3001/limits").then(response => {
        this.min_registartion_date = response.data.users.min_registartion_date;
        this.max_registration_date = response.data.users.max_registration_date;
        this.sliderValueEarned = {
          min: response.data.users.min_points_earned,
          max: response.data.users.max_points_earned,
          start: response.data.users.min_points_earned,
          end: response.data.users.max_points_earned
        };
        this.sliderValueSpent = {
          min: response.data.users.min_points_earned,
          max: response.data.users.max_points_earned,
          start: response.data.users.min_points_earned,
          end: response.data.users.max_points_earned,
        };
        this.startDate = new Date(this.min_registartion_date);
        this.endDate = new Date(this.max_registration_date);
        this.textSearch = "";
        this.resetOn = false;
      });
    },
    changeDate (data) {
      if (data.type === "from") {
        this.startDate = data.date;
      } else if (data.type === "to") {
        this.endDate = data.date;
      }
      this.default = true;
    },
    expandedSlider () {
      this.offSlider = !this.offSlider;
    },
    changeSliderEarned (data) {
      this.sliderValueEarned.start = parseInt(data.start);
      this.sliderValueEarned.end = parseInt(data.end);
      this.default = true;
    },
    changeSliderSpent (data) {
      this.sliderValueSpent.start = parseInt(data.start);
      this.sliderValueSpent.end = parseInt(data.end);
      this.default = true;
    },
    searchUsers () {
      const newUser = this.users.filter(user => {
        return user.name.split(" ").filter(letter => {
          return letter.toLocaleLowerCase().startsWith(this.textSearch.toLocaleLowerCase());
        }).length;
      })
        .filter(user => {
          return (new Date(user.registration_date) >= new Date(this.startDate))
            && (new Date(user.registration_date) <= new Date(this.endDate));
        })
        .filter(user => (user.points_earned >= parseInt(this.sliderValueEarned.start)
          && user.points_earned <= parseInt(this.sliderValueEarned.end)))
        .filter(user => (user.points_spent >= parseInt(this.sliderValueSpent.start)
          && user.points_spent <= parseInt(this.sliderValueSpent.end)));
      console.log(newUser.length);
      this.$emit("filterUser", newUser);
    }
  },
  computed: {
    usersLength () {
      if (this.users) {
        return this.users.length;
      }
    },
    isDisabled () {
      return !this.resetOn && !this.default;
    }
  },
  components: {
    Datepicker,
    Slider,
  },
  watch: {
    '$route.query': {
      handler (newVal) {
        try {
          const jsonQuery = JSON.parse(newVal.search);
          if (typeof jsonQuery === "object") {
            for (const key in jsonQuery) {
              const element = jsonQuery[key];
              this.textSearch += element + " ";
            }
          } else {
            this.textSearch = jsonQuery;
          }
          this.resetOn = true;
        } catch (error) {
          console.error(error);
        }
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "./filters";
</style>