<template>
  <div class="slider_wrap">
    <div
      ref="slider"
      class="slider_simple ui-slider
      ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
    >

    <vue-slider
      :process="process2"
      v-model="value.start"
      :dotSize="30"
      :contained="true"
      :enable-cross="false"
      :min="value.min"
      :max="value.max"></vue-slider>
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
    value: {
      min: Number,
      max: Number,
      start: Number,
      end: Number
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    slider () {
      this.$emit("changeSlider", { start: this.value.start, end: this.value.end });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./slider";
</style>