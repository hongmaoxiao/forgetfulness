<template>
  <div>
    <mu-paper class="no-schedule-paper" :zDepth="3" :title="title" />
      <div slot="default">hhahahah</div>
    </mu-paper>
  </div>
</template>

<script>

export default {
  name: 'NoSchedule',
  props: {
    title: {
      type: 'string',
      default: '您今天暂时还没有提醒事项，赶紧来创建一个吧~~~',
      require: true,
    },
  },
};
</script>

<style scoped>
.no-schedule-paper {
  display: inline-block;
  padding: 0.5vw;
  margin: 2vw;
  text-align: center;
}
</style>
