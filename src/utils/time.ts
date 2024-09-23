export function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export function formatTime(time: number): string {
  let h = 0,
    m = 0,
    s = 0;
  h = Math.floor(time / 3600);
  time %= 3600;
  m = Math.floor(time / 60);
  time %= 60;
  s = time;
  return (h > 0 ? h + "时" : "") + (m > 0 ? m + "分" : "") + s + "秒";
}
