export function postTime(dateTime: string) {
  const milisec = new Date().getTime() - new Date(dateTime).getTime();
  const sec = milisec / 1000;
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(month / 12);

  if (year > 0) return `${year} year${year > 1 ? "s" : ""} ago`;
  else if (month > 0) return `${month} month${month > 1 ? "s" : ""} ago`;
  else if (day > 0) return `${day} day${day > 1 ? "s" : ""} ago`;
  else if (hour > 0) return `${hour} hour${hour > 1 ? "s" : ""} ago`;
  else if (min > 0) return `${min} minute${min > 1 ? "s" : ""} ago`;
  else return `${sec} second${sec > 1 ? "s" : ""} ago`;
}
