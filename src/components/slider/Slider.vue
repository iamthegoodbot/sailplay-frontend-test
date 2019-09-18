<template>
  <div class="slider_wrap">
    <div
      ref="slider"
      class="slider_simple ui-slider
      ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
    >

    <vue-slider
      v-model="valueLimit"
      :process="process2"
      :dotSize="30"
      :silent="true"
      :contained="true"
      :enable-cross="false"
      :min="value.min"
      :max="value.max"
      :style="{padding: 0}"
      ></vue-slider>

    </div>

    <div class="slider_inputs_wrap">
      <div class="slider_inputs_placeholder">
        {{value.start}} - {{value.end}}
      </div>
    </div>
  </div>
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  components: {
    VueSlider
  },
  data () {
    return {
      process2: dotsPos => [
          [dotsPos[0], dotsPos[1], { backgroundColor: '#7084b6' }],
        ],
    };
  },
  props: {
    valueArrLimit: {
      type: Array
    },
    value: {
      min: Number,
      max: Number,
      start: Number,
      end: Number
    }
  },
  computed: {
    valueLimit: {
      get() {
        return [this.value.start, this.value.end];
      },
      set(data) {
        this.$emit("updateProps", data);
      }
    }
  },
};
</script>
<style lang="less" scoped>
@import "./slider";
</style>