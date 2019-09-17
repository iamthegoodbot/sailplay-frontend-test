<template>
  <div class="slider_wrap">
    <div class="slider_simple ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
      <div class="styled_range-left">
        <input
          type="range"
          class="track_range"
          :max="value.max"
          v-model="value.end"
          step="100"
          @change="slider"
        />
        <input
          type="range"
          class="thumb_range"
          :max="value.max"
          v-model="value.end"
          step="100"
          @change="slider"
          @input="inputSlider"
        />
      </div>
      <div class="styled_range-right">
        <input
          type="range"
          class="track_range"
          v-model="value.start"
          :min="value.min"
          max="2300"
          @change="slider"
        />
        <input
          type="range"
          class="thumb_range"
          :min="value.min"
          v-model="value.start"
          max="2300"
          @change="slider"
        />
      </div>
    </div>

    <div class="slider_inputs_wrap">
      <div class="slider_inputs_placeholder">
        {{value.start}} - {{value.end}}
      </div>
    </div>
  </div>
</template>
<script>


export default {
  props: {
    value: {
      min: Number,
      max: Number,
      start: Number,
      end: Number
    }
  },
  mounted () {
    const styledRanges = document.querySelector('.styled_range-right');
    const styledRangesLEft = document.querySelector('.styled_range-left');

    function createdRange (elements) {
      for (let i = 0; i < elements.length; i++) {
        let thumbRange = null,
          trackRange = null;
        for (let j = 0; j < elements[i].children.length; j++) {
          const child = elements[i].children[j];
          if (child.className === 'thumb_range')
            thumbRange = child;
          else if (child.className === 'track_range')
            trackRange = child;
        }
        thumbRange.oninput = function (thumbRange, trackRange) {
          return function () {
            trackRange.value = thumbRange.value;
          };
        }(thumbRange, trackRange);
      }
    }

    createdRange(styledRanges);
    createdRange(styledRangesLEft);
  },
  methods: {
    inputSlider () {
      if (event.target.parentElement.classList[0] === "styled_range-left") {
        if (parseInt(event.target.value) < parseInt(event.target.max) / 2) {
          event.target.value = parseInt(event.target.max) / 2;
          const neighbor = event.target.nextElementSibling
          || event.target.previousElementSibling;
          neighbor.value = parseInt(event.target.max) / 2;
        }
      }
    },
    slider () {
      this.$emit("changeSlider", { start: this.value.start, end: this.value.end });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./slider";
</style>