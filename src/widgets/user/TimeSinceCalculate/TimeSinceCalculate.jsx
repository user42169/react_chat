
// claculate time when which message were received 
const timeSinceCalculate = (date) => {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  };

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  };

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  };

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  };

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  };

  if (interval >= 0.20) {
    return Math.floor(seconds) + " seconds";
  } else {
    return "Just now";
  };
};

export default timeSinceCalculate;