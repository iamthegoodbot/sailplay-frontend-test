<template>
  <label class="filters_list_field_input">
    <div class="date_picker_wrapper">
      <input
        class="input_simple"
        type="date"
        :value="value && value.toISOString().split('T')[0]"
        :min="min && min.split('T')[0]"
        :max="max && max.split('T')[0]"
        @change="changeDate"
        :class="{'from':from, 'to': !from}"
      />
    </div>
  </label>
</template>
<script>
export default {
  props: {
    value: {
      type: Date
    },
    min: {
      type: String
    },
    max: {
      type: String
    },
    from: Boolean
  },
  methods: {
    changeDate(event) {
      const value = event.target.value;
      const className = event.target.classList[1];
      this.$emit("input", { type: className, date: new Date(value) });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./datepicker";
</style>