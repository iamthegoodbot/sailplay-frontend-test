<template>
  <span class="filters_footer_count" v-show="count > 0">
    <span>{{count}}</span>
    <span>{{clientLabel}}</span>
  </span>
</template>

<script>
  import declOfNum from '@/utils';

  export default {
    props: ['count'],
    computed: {
      clientLabel() {
        if (this.count >= 0) {
          return declOfNum(this.count, ['клиент', 'клиента', 'клиентов']);
        }
        return '';
      }
    }
  }
</script>
