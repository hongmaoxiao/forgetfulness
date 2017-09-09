const formatShowDate = (val) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ?
  `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
  const day = date.getDate() < 10 ?
  `0${date.getDate()}` : (date.getDate());
  const hour = date.getHours() < 10 ?
  `0${date.getHours()}` : (date.getHours());
  const minute = date.getMinutes() < 10 ?
  `0${date.getMinutes()}` : (date.getMinutes());
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export default formatShowDate;
