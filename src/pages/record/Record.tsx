import { TimeOfDay } from "@/types";
import { formatTime } from "@/utils/time";
import { useEffect, useMemo, useState } from "react";

// TODO: 添加统计时间的图表显示，采用echarts， 统计平均时间，最长时间，最短时间等
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
    <div className="container mx-auto p-8">
      <div>仅显示最近30天的数据</div>
      <div className="text-2xl font-semibold">总时长： {formatTime(total)}</div>
      {timeData.map((item, index) => (
        <div key={index}>
          {item.date} : {formatTime(item.value)}
        </div>
      ))}
    </div>
  );
};
export default Record;
