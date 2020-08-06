const formatTime = (time) => {
  if (time.ampm === 'pm' && parseFloat(time.hour) < 12) {
    return toString(parseFloat(time.hour) + 12);
  } if (time.hour.length === 1) {
    return `0${time.hour}`;
  }
  return time.hour;
};

export default formatTime;
