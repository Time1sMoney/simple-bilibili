import { TimeOfDay } from "@/types";
import { formatTime } from "@/utils/time";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
interface Props {
  data: TimeOfDay[];
}

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="rounded p-2 bg-white opacity-80 dark:bg-gray-900 dark:text-white">
        {`时长 : ${formatTime(payload[0].value!)}`}
      </div>
    );
  }

  return null;
};
const TimeChart: React.FC<Props> = ({ data }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    chrome.storage.local.get(["theme"], (result) => {
      if (result.theme) {
        setTheme(result.theme);
      }
    });
    const localChangeHandler = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.theme && changes.theme.newValue) {
        setTheme(changes.theme.newValue);
      }
    };
    chrome.storage.local.onChanged.addListener(localChangeHandler);
    return () => {
      chrome.storage.local.onChanged.removeListener(localChangeHandler);
    };
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis
          dataKey="date"
          tick={{ fill: theme === "dark" ? "#fff" : "#000" }}
          interval={0}
          tickFormatter={(date: string) =>
            date.substring(date.indexOf("-") + 1)
          }
        />
        <YAxis tick={{ fill: theme === "dark" ? "#fff" : "#000" }} />
        <Tooltip
          content={<CustomTooltip />}
          formatter={(value: number) => formatTime(value)}
        />
        <Bar
          dataKey="value"
          fill="#FF6699"
          activeBar={<Rectangle className="opacity-80" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default TimeChart;
