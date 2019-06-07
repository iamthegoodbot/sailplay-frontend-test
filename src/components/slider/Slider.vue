<template>
  <div class="slider_wrap">
    <div ref="slider" class="slider_simple ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
    </div>
    <div class="slider_inputs_wrap">
      <div class="slider_inputs_placeholder">
        {{this.value.start}} - {{this.value.end}}
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  require('jquery-ui/ui/widget');
  require('jquery-ui/ui/keycode');
  require('jquery-ui/ui/widgets/mouse');
  require('jquery-ui/ui/widgets/slider');

  export default {
    props: {
      value: {
        min: Number,
        max: Number,
        start: Number,
        end: Number
      }
    },
    data() {
      return {
        initial: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        $(this.$refs.slider).slider({
          range: true,
          min: this.value.min,
          max: this.value.max,
          step: 1,
          values: [ this.value.start, this.value.end ],
          slide: (event, ui) => {
            this.$emit('input', {start: ui.values[0], end: ui.values[1]});
          }
        });
        this.initial = Object.assign({}, this.value);
      })
    },
    watch: {
      value(current) {
        if (current.start === this.initial.start && current.end === this.initial.end) {
          $(this.$refs.slider).slider('values', [current.start, current.end]);
        }
      }
    }
  }
</script>
