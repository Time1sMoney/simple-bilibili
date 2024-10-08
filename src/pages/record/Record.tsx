import { TimeOfDay } from "@/types";
import { formatTime } from "@/utils/time";
import averageIcon from "@iconify-icons/tabler/chart-bar";
import clockIcon from "@iconify-icons/tabler/clock";
import eyeIcon from "@iconify-icons/tabler/eye";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import TimeChart from "./components/TimeChart";

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
    <div className="container mx-auto h-full p-8 space-y-4">
      <Header />
      <div className="flex gap-4">
        <div className="flex-1 card flex items-center">
          <Icon icon={clockIcon} className="text-3xl mr-4" />
          总时长：{" "}
          <span className="text-xl font-semibold">{formatTime(total)}</span>
        </div>
        <div className="flex-1 card flex items-center">
          <Icon icon={averageIcon} className="text-3xl mr-4" />
          平均每天浏览
          <span className="text-xl font-semibold ml-2">
            {formatTime(total / timeData.length)}
          </span>
        </div>
        {timeData.length > 0 && (
          <div className="card flex-1 flex items-center">
            <Icon icon={eyeIcon} className="text-3xl mr-4" />
            你在{" "}
            <span className="text-xl font-semibold mx-2">
              {getMaxDay(timeData)}
            </span>
            这一天浏览最久
          </div>
        )}
      </div>
      <div className="card p-6 space-y-2">
        {timeData.length > 0 && (
          <div className="flex justify-center items-center gap-2">
            <em className="font-semibold">{timeData[0].date}</em>至
            <em className="font-semibold">
              {timeData[timeData.length - 1].date}
            </em>
            总计
            <em className="font-semibold">{timeData.length}</em>天 统计数据
            <span>（单位：秒）</span>
          </div>
        )}
        <div className="h-[500px]">
          <TimeChart data={timeData} />
        </div>
      </div>
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 text-sm text-zinc-700 dark:text-zinc-500 opacity-80">
        *仅显示最近30天的数据
      </div>
    </div>
  );
};
export default Record;
