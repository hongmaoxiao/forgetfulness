<template>
  <div class="app">
    <mu-appbar title="Title">
      <router-link to="/" class="to-home">
        首页
      </router-link>
      <mu-flat-button label="新增提醒" slot="right" @click="open" />
      <mu-flat-button label="历史提醒" slot="right" />
    </mu-appbar>
    <Loading v-if="loading" />
    <mu-paper class="demo-paper" :zDepth="3" v-if="this.scheduleData && this.scheduleData.length === 0">
      <div slot="default">{{noDataTitle}}</div>
    </mu-paper>
    <!-- <NoSchedule v-if="this.scheduleData && this.scheduleData.length === 0" :title="noDataTitle"/> -->
    <mu-table
      :fixedFooter="fixedFooter"
      :fixedHeader="fixedHeader"
      :enableSelectAll="enableSelectAll"
      :multiSelectable="multiSelectable"
      :selectable="selectable"
      :showCheckbox="showCheckbox"
      v-if="this.scheduleData && this.scheduleData.length > 0"
      class="schedule-table"
    >
      <mu-thead slot="header">
        <mu-tr>
          <mu-th tooltip="ID">ID</mu-th>
          <mu-th tooltip="标题">标题</mu-th>
          <mu-th tooltip="事情">事情</mu-th>
          <mu-th tooltip="提醒时间">提醒时间</mu-th>
          <mu-th tooltip="创建时间">创建时间</mu-th>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="item,index in scheduleData"  :key="index" :selected="item.selected">
          <mu-td>{{index + 1}}</mu-td>
          <mu-td>{{item.title}}</mu-td>
          <mu-td>{{item.events}}</mu-td>
          <mu-td>{{item.remindTime}}</mu-td>
          <mu-td>{{item.createTime}}</mu-td>
          <mu-td>
            <mu-raised-button label="修改" backgroundColor="#13ce66" class="modify-btn" slot="default" @click="modifySchedule(item)" />
            <mu-raised-button label="删除" backgroundColor="#ff4949" slot="default" @click="deleteSchedule(item)" />
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-dialog :open="dialog" @close="close" title="新增提醒" scrollable>
      <mu-text-field label="提醒标题" hintText="请输入标题" labelFloat v-model="newSchedule.title" fullWidth required /><br/>
      <mu-text-field label="提醒内容" hintText="请输入提醒内容" labelFloat v-model="newSchedule.events" fullWidth required /><br/>
      <mu-date-picker hintText="请选择提醒日期"　v-model="newSchedule.selectDate" fullWidth required /> <br/>
      <mu-time-picker hintText="请选择提醒时间" v-model="newSchedule.selectTime" format="24hr"　fullWidth required /><br/>
      <mu-raised-button label="取消" backgroundColor="#ff4949" slot="actions" @click="close" />
      <mu-raised-button label="确定" backgroundColor="#13ce66" slot="actions" @click="addNewSchedule" />
    </mu-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import Loading from './Loading';
import NoSchedule from './NoSchedule';

axios.defaults.headers.common['Content-type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: 'forget',
  components: {
    Loading,
    NoSchedule,
  },
  data() {
    return {
      dialog: false,
      loading: false,
      error: null,
      noDataTitle: '您今天暂时还没有提醒事项，赶紧来创建一个吧~~~',
      scheduleData: null,
      fixedHeader: true,
      fixedFooter: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      showCheckbox: true,
      height: '300px',
      newSchedule: {
        id: 0,
        title: '',
        events: '',
        selectDate: '',
        selectTime: '',
      },
    };
  },
  created() {
    this.fetchSchedule();
  },
  methods: {
    fetchSchedule() {
      const $this = this;
      this.error = null;
      this.scheduleData = null;
      this.loading = true;
      axios.get('/schedule/all')
      .then(
        (response) => {
          this.loading = false;
          $this.scheduleData = response.data.schedules;
        },
      )
      .catch(
        (error) => {
          console.log('错误： ', error);
        },
      );
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    modifySchedule(schedule) {
      this.newSchedule.id = schedule.id;
      this.newSchedule.title = schedule.title;
      this.newSchedule.events = schedule.events;
      this.newSchedule.selectDate = schedule.remindTime.split(' ')[0];
      this.newSchedule.selectTime = schedule.remindTime.split(' ')[1];
      this.open();
    },
    deleteSchedule(schedule) {
      const existIndex = _.findIndex(
        this.scheduleData, o => o.id === schedule.id,
      );
      if (existIndex > -1) {
        this.scheduleData.splice(existIndex, 1);
      }
    },
    addNewSchedule() {
      const checked = this.newSchedule.title && this.newSchedule.events
      && this.newSchedule.selectDate && this.newSchedule.selectTime;
      if (checked) {
        let existIndex = -1;
        const newSchedule = {
          id: this.newSchedule.id,
          title: this.newSchedule.title,
          events: this.newSchedule.events,
          remindTime: `${this.newSchedule.selectDate} ${this.newSchedule.selectTime}`,
          createTime: this.formatDate(new Date()),
        };
        if (this.newSchedule.id > 0) {
          existIndex = _.findIndex(
            this.scheduleData, o => o.id === this.newSchedule.id,
          );
        }
        if (existIndex > -1) {
          this.scheduleData.splice(existIndex, 1, newSchedule);
        } else {
          this.postNewSchedule(newSchedule);
          this.scheduleData.push(_.assign(newSchedule, { id: this.scheduleData.length + 1 }));
        }
        this.resetNewSchedule();
        this.close();
      }
    },
    postNewSchedule(data) {
      axios.post('/schedule/edit', {
        title: data.title,
        events: data.events,
        remind_time: data.remindTime,
        uid: '1',
      })
      .then(
        (response) => {
          console.log('post： ', response);
        },
      )
      .catch(
        (error) => {
          console.log('错误： ', error);
        },
      );
      // const params = new URLSearchParams();
      // params.append('title', data.title);
      // params.append('events', data.events);
      // params.append('remind_time', data.remindTime);
      // params.append('uid', 1);
      // this.$http.post('/schedule/edit', {
      //   title: data.title,
      //   events: data.events,
      //   remind_time: data.remindTime,
      //   uid: 1,
      // })
      // .then((res) => {
      //   if (res.status === 200) {
      //     console.log('res: ', res);
      //   } else {
      //     alert('用户名或者密码错误！');
      //   }
      // }, () => {
      //   console.log('错误：');
      // });
      // const postData = {
      //   title: data.title,
      //   events: data.events,
      //   remind_time: data.remindTime,
      //   uid: 1,
      // };
      // axios({
      //   method: 'post',
      //   url: '/schedule/edit',
      //   data: JSON.stringify(postData),
      // }).then(
      //   (response) => {
      //     console.log('post： ', response);
      //   },
      // )
      // .catch(
      //   (error) => {
      //     console.log('错误： ', error);
      //   },
      // );
    },
    resetNewSchedule() {
      this.newSchedule = {
        id: 0,
        title: '',
        events: '',
        selectDate: '',
        selectTime: '',
      };
    },
    formatDate(val) {
      const date = new Date(val);
      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ?
      `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes() < 10 ?
      `0${date.getMinutes()}` : (date.getMinutes());
      return `${year}-${month}-${day} ${hour}:${minute}`;
    },
  },
};
</script>

<style scoped>
.to-home {
  position: relative;
  float: left;
}

.schedule-table {
  margin-top: 5vh;
}

.modify-btn {
  margin-right: 1.5rem;
}

.demo-paper {
  display: inline-block;
  padding: 0.5vw 3vw;
  margin: 2vw;
  text-align: center;
}
</style>
