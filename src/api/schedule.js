import fetch from '@/utils/fetch';

const fetchSchedules = params => fetch({
  url: '/schedule/all',
  method: 'get',
  params,
});

const editSchedule = data => fetch({
  url: '/schedule/edit',
  method: 'post',
  data,
});

const deleteSchedule = id => fetch({
  url: `/schedule/delete/${id}`,
  method: 'post',
});

const switchScheduleStatus = data => fetch({
  url: '/schedule/switch',
  method: 'post',
  data,
});

export {
  fetchSchedules,
  editSchedule,
  deleteSchedule,
  switchScheduleStatus,
};
