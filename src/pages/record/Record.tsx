import { TimeOfDay } from "@/types";
import { formatTime } from "@/utils/time";
import { useEffect, useMemo, useState } from "react";
import TimeChart from "./TimeChart";

function getMaxDay(timeData: TimeOfDay[]) {
  let maxDay = timeData[0].date,
    maxTime = timeData[0].value;
  for (let i = 1; i < timeData.length; i++) {
    if (timeData[i].value > maxTime) {
      maxDay = timeData[i].date;
      maxTime = timeData[i].value;
    }
  }
  return maxDay;
}

// TODO: echarts打包后体积较大，考虑是否可以采用其他图标库
// TODO: 添加表格形式的数据展示
// TODO: 优化页面样式
// TODO: 调整打包后目录结构，html单独放置在html文件夹中

const Record: React.FC = () => {
  const [timeData, setTimeData] = useState<TimeOfDay[]>([]);

  const total = useMemo(() => {
    return timeData.reduce((acc, cur) => acc + cur.value, 0);
  }, [timeData]);

  useEffect(() => {
    chrome.storage.local.get("time", (result) => {
      setTimeData(result.time || []);
    });
  }, []);
  return (
    <div className="container mx-auto p-8 space-y-4">
      <div className="text-end">*仅显示最近30天的数据</div>
      <div className="rounded-lg bg-white p-4 space-y-4">
        <div className="w-1/2">
          总时长：{" "}
          <span className="text-3xl font-semibold">{formatTime(total)}</span>
        </div>
        <div className="w-1/2">
          平均每天浏览Bilibili
          <span className="text-xl font-semibold ml-2">
            {formatTime(total / timeData.length)}
          </span>
        </div>
        {timeData.length !== 0 && (
          <div className="w-1/2">
            你在{" "}
            <span className="text-xl font-semibold mx-2">
              {getMaxDay(timeData)}
            </span>
            这一天浏览最久
          </div>
        )}
      </div>
      <div className="h-[500px] p-6 rounded-lg bg-white">
        <TimeChart data={timeData} />
      </div>
    </div>
  );
};
export default Record;
