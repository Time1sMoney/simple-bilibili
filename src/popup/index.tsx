import { useEffect, useState } from "react";
import { TimeOfDay } from "../types";
import { formatTime } from "./format";

interface RecordTimeMessage {
  type: string;
  time: number;
}

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

const Popup: React.FC = () => {
  const [columns, setColumns] = useState(4);
  const [todayTotalTime, setTodayTotalTime] = useState(0);

  const handleChangeColumns = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cols = parseInt((e.target as HTMLButtonElement).innerText);
    chrome.storage.local.set({ cols }).then(() => {
      setColumns(cols);
    });
  };

  useEffect(() => {
    // 获取本地存储的列数
    chrome.storage.local.get("cols").then(({ cols }) => {
      if (cols) {
        setColumns(cols);
      }
    });
    // 设置定时器，每隔一秒获取本地存储的今日总时长
    const date = getDate();
    const timer = setInterval(() => {
      chrome.storage.local.get("time").then(({ time }) => {
        if (time) {
          const target = (time as TimeOfDay[]).find(
            (item) => item.date === date
          );
          if (target) {
            setTodayTotalTime(target.value);
          }
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-60">
      <div className="flex justify-center items-center gap-4 bg-gradient-to-r from-pink-300 to-purple-500">
        <span className="text-lg font-bold">Simple Bilibili</span>
        <code className="text-sm">v1.0</code>
      </div>
      <ul className="divide-y-2 divide-gray-200 ">
        <li className="flex items-center py-2 px-4">
          <span>今日浏览时长</span>
          <span className="ml-auto font-semibold">
            {formatTime(todayTotalTime)}
          </span>
        </li>
        <li className="flex items-center justify-between py-2 px-4">
          <span>首页显示列数</span>
          <div className="flex gap-2 items-center">
            <button
              className={`shadow rounded bg-gray-200 px-2 font-semibold ${
                columns === 3 && "bg-pink-500 text-white"
              }`}
              onClick={handleChangeColumns}
            >
              3
            </button>
            <button
              className={`shadow rounded bg-gray-200 px-2 font-semibold ${
                columns === 4 && "bg-pink-500 text-white"
              }`}
              onClick={handleChangeColumns}
            >
              4
            </button>
            <button
              className={`shadow rounded bg-gray-200 px-2 font-semibold ${
                columns === 5 && "bg-pink-500 text-white"
              }`}
              onClick={handleChangeColumns}
            >
              5
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Popup;
