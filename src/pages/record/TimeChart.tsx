import { TimeOfDay } from "@/types";
import { formatTime } from "@/utils/time";
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
  const { active, payload, label } = props;
  console.log(props);
  if (active && payload && payload.length) {
    return (
      <div className="rounded p-2 bg-white opacity-80">
        {`时长 : ${formatTime(payload[0].value!)}`}
      </div>
    );
  }

  return null;
};
const TimeChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "秒", position: "insideTopLeft", offset: 5 }} />
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
