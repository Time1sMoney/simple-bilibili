import { useEffect, useState } from "react";
import { formatTime } from "./format";

interface RecordTimeMessage {
  type: string;
  time: number;
}

const Popup: React.FC = () => {
  const [columns, setColumns] = useState(() => {
    const cols = localStorage.getItem("cols");
    return cols ? parseInt(cols) : 4;
  });
  const [time, setTime] = useState(0);
  const handleChangeColumns = (e: React.MouseEvent<HTMLButtonElement>) => {
    const cols = (e.nativeEvent.target as HTMLButtonElement).innerHTML;
    setColumns(parseInt(cols));
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const target = tabs[0];
      if (target && target.id) {
        chrome.tabs.sendMessage(target.id, {
          type: "changeColumns",
          columns: parseInt(cols),
        });
      }
    });
  };
  useEffect(() => {
    localStorage.setItem("cols", `${columns}`);
  }, [columns]);

  useEffect(() => {
    const timer = setInterval(() => {
      chrome.storage.local.get("time").then((res) => {
        setTime(res.time);
      });
    });
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
          <span className="ml-auto font-semibold">{formatTime(time)}</span>
        </li>
        <li className="flex items-center justify-between py-2 px-4">
          <span>显示列数</span>
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
