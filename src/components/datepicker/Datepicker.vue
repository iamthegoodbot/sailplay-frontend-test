<template>
  <label class="filters_list_field_input">
    <div class="date_picker_wrapper">
      <span v-if="label">{{label}}</span>
      <input class="input_simple"
             ref="datepicker"
             type="date" />
    </div>
  </label>
</template>

<script>
  export default {
    props: ['value', 'label', 'minDate', 'maxDate'],
    name: "Datepicker",
    mounted() {
      this.$refs.datepicker.value = this.value.toLocaleDateString('en-CA'); // yyyy-mm-dd
      this.$refs.datepicker.min = (new Date(this.minDate)).toLocaleDateString('en-CA'); // yyyy-mm-dd
      this.$refs.datepicker.max = (new Date(this.maxDate)).toLocaleDateString('en-CA'); // yyyy-mm-dd
      this.$refs.datepicker.addEventListener('change', () => {
        const val = this.$refs.datepicker.value;
        if (!isNaN((new Date(val)).getTime())) {
          this.$emit('input', new Date(val));
        }
      });
    },
    watch: {
      value(current) {
        if (current !== this.$refs.datepicker) {
          this.$refs.datepicker.value = current.toLocaleDateString('en-CA'); // yyyy-mm-dd
        }
      }
    }
  }
</script>

<style scoped>

</style>
