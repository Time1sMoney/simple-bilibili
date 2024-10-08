import { formatTime, getDate } from "@/utils/time";
import { useEffect, useState } from "react";
import { TimeOfDay } from "../../types";

interface RecordTimeMessage {
  type: string;
  time: number;
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

  const checkTimeRecord = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL("html/record.html") });
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
        <li className="flex justify-center py-2 px-4">
          <button
            className="shadow rounded bg-pink-500 hover:opacity-80 text-white px-4 py-2"
            onClick={checkTimeRecord}
          >
            👉 查看浏览时间记录
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Popup;
