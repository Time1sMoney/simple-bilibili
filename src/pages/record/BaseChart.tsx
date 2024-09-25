import {
  BarChart,
  BarSeriesOption,
  PieChart,
  PieSeriesOption,
} from "echarts/charts";
import type {
  BrushComponentOption,
  DataZoomComponentOption,
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
  VisualMapComponentOption,
} from "echarts/components";
import {
  BrushComponent,
  DataZoomComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
echarts.use([
  DatasetComponent,
  DataZoomComponent,
  TitleComponent,
  ToolboxComponent,
  BrushComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  BarChart,
  PieChart,
  UniversalTransition,
  CanvasRenderer,
]);
interface Props {
  option: BaseChartOption;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export type BaseChartOption = echarts.ComposeOption<
  | DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | BrushComponentOption
  | TooltipComponentOption
  | VisualMapComponentOption
  | BarSeriesOption
  | PieSeriesOption
>;
export interface BrushParams {
  type: string;
  areas: {
    brushType: string;
    coordRange: [number, number];
    coordRanges: [number, number][];
    range: [number, number];
  }[];
}
export type ClickParams = echarts.ECElementEvent;
export interface BaseChartRef {
  getInstance: () => echarts.ECharts | null;
}

/**
 * This component provides the basic capabilities of echats.
 * You can provide the default option at component initialization, after which all your option values will be merged into the default option.
 * See Docs: https://echarts.apache.org/zh/api.html#echartsInstance.setOption
 */
const BaseChart: React.ForwardRefRenderFunction<BaseChartRef, Props> = (
  { option, width, height, className, style },
  ref
) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef<[number, number] | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // Execute while options change
  useEffect(() => {
    if (chartInstance.current) {
      // chartInstance.current.clear();
      chartInstance.current.setOption(option);
    }
  }, [option]);
  // Init chart and add event listener
  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current =
        echarts.getInstanceByDom(chartRef.current) ||
        echarts.init(chartRef.current, null, {
          width,
          height,
        });
    }
  }, [width, height]);

  useImperativeHandle(
    ref,
    () => ({
      getInstance: () => chartInstance.current,
    }),
    []
  );
  return <div ref={chartRef} className={className} style={style} />;
};
const BaseChartWithRef = forwardRef(BaseChart);
export default BaseChartWithRef;
