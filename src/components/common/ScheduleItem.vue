<template>
  <div class="app">
    <NavBar />
    <Loading v-if="loading" />
    <NoSchedule v-if="this.scheduleData && this.scheduleData.length === 0" :title="title" />
    <div class="add-new" v-if="date === 'today'">
      <mu-raised-button label="新增提醒" backgroundColor="#13ce66" slot="right" @click="open" />
    </div>
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
          <mu-th tooltip="状态">状态</mu-th>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="item,index in scheduleData"  :key="index" :selected="item.selected">
          <mu-td>{{item.id}}</mu-td>
          <mu-td>{{item.title}}</mu-td>
          <mu-td>{{item.events}}</mu-td>
          <mu-td>{{item.remindTime}}</mu-td>
          <mu-td>{{item.createTime}}</mu-td>
          <mu-td>
            <mu-switch v-model="item.running" :label="item.running ? '开启' : '关闭'" @change="switchRunning(item, index)" />
          </mu-td>
          <mu-td>
            <mu-raised-button label="修改" backgroundColor="#13ce66" class="modify-btn" slot="default" @click="modifySchedule(item)" />
            <mu-raised-button label="删除" backgroundColor="#ff4949" slot="default" @click="deleteSchedule(item)" />
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-dialog :open="dialog" @close="close" title="新增提醒" scrollable>
      <mu-text-field label="提醒标题" hintText="请输入标题" labelFloat v-model.trim="newSchedule.title" fullWidth required /><br/>
      <mu-text-field label="提醒内容" hintText="请输入提醒内容" labelFloat v-model.trim="newSchedule.events" fullWidth required /><br/>
      <mu-date-picker hintText="请选择提醒日期"　v-model="newSchedule.selectDate" fullWidth required /> <br/>
      <mu-time-picker hintText="请选择提醒时间" v-model="newSchedule.selectTime" format="24hr"　fullWidth required /><br/>
      <mu-raised-button label="取消" backgroundColor="#ff4949" slot="actions" @click="close" />
      <mu-raised-button label="确定" backgroundColor="#13ce66" slot="actions" @click="addNewSchedule" />
    </mu-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import qs from 'qs';
import fetch from '@/utils/fetch';
import { getUserInfo } from '@/utils/userInfo';
import NavBar from '@/components/common/NavBar';
import formatShowDate from '@/utils/parseTime';
import Loading from '@/components/common/Loading';
import NoSchedule from '@/components/NoSchedule';

export default {
  name: 'forget',
  components: {
    Loading,
    NoSchedule,
    NavBar,
  },
  props: {
    date: {
      type: String,
      default: 'today',
      require: true,
    },
  },
  computed: {
    title() {
      return this.date === 'history'
      ?
      '您还没有任何历史提醒事项！'
      :
      '您今天暂时还没有提醒事项，赶紧来创建一个吧~~~';
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      error: null,
      scheduleData: null,
      fixedHeader: true,
      fixedFooter: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      showCheckbox: true,
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
    switchRunning(item, index) {
      const data = qs.stringify({
        id: item.id,
        running: item.running,
      });
      fetch({
        url: '/schedule/switch',
        method: 'post',
        data,
      })
      .then(
        (res) => {
          const code = res.code;
          if (code === 200) {
            const msg = item.running ? '开启成功！' : '关闭成功！';
            this.$toast.show(msg);
          } else {
            this.scheduleData[index].running = !item.running;
            this.$toast.show(res.msg);
          }
        },
      )
      .catch(
        () => {
          this.scheduleData[index].running = !item.running;
        },
      );
    },
    fetchSchedule() {
      this.error = null;
      this.scheduleData = null;
      this.loading = true;
      const url = this.date === 'history' ? '/schedule/all?period=history' : 'schedule/all';
      fetch({
        url,
        method: 'get',
      })
      .then(
        (res) => {
          console.log('res', res);
          const code = res.code;
          if (code === 200) {
            this.loading = false;
            this.scheduleData = _.map(res.schedules, this.assignSchedule);
          } else {
            this.$toast.show(res.msg);
          }
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
      this.postDeleteSchedule(schedule, () => {
        const existIndex = _.findIndex(
          this.scheduleData, o => o.id === schedule.id,
        );
        if (existIndex > -1) {
          this.scheduleData.splice(existIndex, 1);
          this.$toast.show('删除成功！');
        }
      });
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
        };
        if (this.newSchedule.id > 0) {
          existIndex = _.findIndex(
            this.scheduleData, o => o.id === this.newSchedule.id,
          );
        }
        if (existIndex > -1) {
          this.postNewSchedule(newSchedule, existIndex);
        } else {
          this.postNewSchedule(newSchedule);
        }
        this.resetNewSchedule();
        this.close();
      }
    },
    postNewSchedule(data, pos) {
      const user = getUserInfo();
      console.log('user: ', user);
      if (!user.id) {
        this.$toast.show({
          message: '您还未登录，请先登录！',
          time: 1000,
        });
        this.$router.replace({ name: 'login' });
      }
      console.log('new: ', data);
      fetch({
        url: '/schedule/edit',
        method: 'post',
        data: {
          id: data.id,
          title: data.title,
          events: data.events,
          remind_time: data.remindTime,
          repeat: false,
          uid: +user.id,
        },
      })
      .then(
        (res) => {
          console.log('res', res);
          const code = res.code;
          const schedules = res.schedules;
          if (code === 200 || code === 208) {
            if (data.id > 0) {
              this.scheduleData.splice(pos, 1, this.assignSchedule(schedules));
            } else {
              this.scheduleData.unshift(this.assignSchedule(schedules));
            }
            if (code === 208) {
              this.$toast.show(res.msg);
            }
          } else {
            this.$toast.show(res.msg);
          }
        },
      );
    },
    assignSchedule(res) {
      return _.assign({}, {
        id: res.ID,
        title: res.Title,
        events: res.Events,
        running: res.Running,
        remindTime: formatShowDate(res.RemindTime),
        createTime: formatShowDate(res.CreatedAt),
      });
    },
    postDeleteSchedule(data, cb) {
      fetch({
        url: `/schedule/delete/${data.id}`,
        method: 'post',
      })
      .then(
        (res) => {
          if (res.code === 200) {
            cb();
          } else {
            this.$toast.show(res.msg);
          }
        },
      );
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
  },
};
</script>

<style scoped>
.schedule-table {
  margin-top: 5vh;
}

.add-new {
  margin: 20px 0;
  text-align: right;
  padding-right: 50px;
}

.modify-btn {
  margin-right: 1.5rem;
}

.no-schedule-paper {
  display: inline-block;
  padding: 0.5vw 3vw;
  margin: 2vw;
  text-align: center;
}
</style>
