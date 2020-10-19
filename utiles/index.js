import moment from 'moment';

const formatTime = value => {
  const timestamp = moment(value).format('hh:mm');
  return timestamp;
};

export default formatTime;
