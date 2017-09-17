<template>
  <schedule-item :date="date" />
</template>

<script>
import scheduleItem from '@/components/common/ScheduleItem';

export default {
  name: 'history',
  data() {
    return {
      date: 'today',
    };
  },
  components: {
    scheduleItem,
  },
};
</script>
