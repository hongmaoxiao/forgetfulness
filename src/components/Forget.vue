<template>
  <div class="app">
    <mu-appbar title="Title">
      <router-link to="/" class="to-home">
        首页
      </router-link>
      <mu-flat-button label="新增提醒" slot="right" @click="open" />
      <mu-flat-button label="历史提醒" slot="right" />
    </mu-appbar>
    <mu-table :fixedFooter="fixedFooter" :fixedHeader="fixedHeader"
      :enableSelectAll="enableSelectAll" :multiSelectable="multiSelectable"
      :selectable="selectable" :showCheckbox="showCheckbox">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">ID</mu-th>
          <mu-th tooltip="标题">标题</mu-th>
          <mu-th tooltip="事情">事情</mu-th>
          <mu-th tooltip="提醒时间">提醒时间</mu-th>
          <mu-th tooltip="创建时间">创建时间</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="item,index in tableData"  :key="index" :selected="item.selected">
          <mu-td>{{index + 1}}</mu-td>
          <mu-td>{{item.title}}</mu-td>
          <mu-td>{{item.events}}</mu-td>
          <mu-td>{{item.remindTime}}</mu-td>
          <mu-td>{{item.createTime}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-dialog :open="dialog" @close="close" title="新增提醒" scrollable>
      <mu-text-field label="标题" hintText="请输入标题" labelFloat /><br/>
      <mu-text-field label="提醒内容" hintText="请输入提醒内容" labelFloat /><br/>
      <mu-date-picker hintText="请选择日期"　/> <br/>
      <mu-time-picker hintText="请选择时间" format="24hr"　/><br/>
      <mu-flat-button primary label="关闭" @click="close" slot="actions"　/>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: 'forget',
  data() {
    const menus = [];
    for (let i = 0; i < 30; i += 1) {
      menus.push(i + 1);
    }
    return {
      dialog: false,
      menus,
      tableData: [
        {
          title: '提交代码',
          events: '下午记得提交代码',
          remindTime: '2017-07-10 15:23:23',
          createTime: '2017-07-10 10:23:23',
        },
      ],
      fixedHeader: true,
      fixedFooter: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      showCheckbox: true,
      height: '300px',
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.to-home {
  position: relative;
  float: left;
}
</style>
