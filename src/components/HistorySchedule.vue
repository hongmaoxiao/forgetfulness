<template>
  <schedule-item :date="date" />
</template>

<script>
import scheduleItem from '@/components/common/ScheduleItem';

export default {
  name: 'history',
  data() {
    return {
      date: 'history',
    };
  },
  components: {
    scheduleItem,
  },
};
</script>
