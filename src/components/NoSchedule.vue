<template>
  <div class="full-page no-schedule-wrapper">
    <mu-paper class="no-schedule-paper vertical-center" :zDepth="3" :title="title">
      <div slot="default">{{title}}</div>
    </mu-paper>
  </div>
</template>

<script>

export default {
  name: 'NoSchedule',
  props: {
    title: {
      type: String,
      default: '您今天暂时还没有提醒事项，赶紧来创建一个吧~~~',
      require: true,
    },
  },
};
</script>

<style>
.no-schedule-wrapper {
  top: 70px;
}

.no-schedule-paper {
  padding: 15px 50px;
  font-size: 18px;
  text-align: center;
}
</style>
