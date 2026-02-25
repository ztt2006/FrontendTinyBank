import ReactEcharts from "echarts-for-react";
import { message } from "antd";
import dayjs from "dayjs";
import { getSignInRecordsAPI } from "@/api/user";
import { useRequest } from "ahooks";
import { useRef, useEffect, useState } from "react";
import styles from "./index.module.css";

const CalendarChart = () => {
  const year = new Date().getFullYear();
  const chartRef = useRef<ReactEcharts>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(13);

  // 响应式调整单元格大小
  useEffect(() => {
    const updateCellSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // 根据容器宽度计算合适的单元格大小
        // 一年大约53周，加上左右边距
        const availableWidth = width - 80;
        const newCellSize = Math.max(8, Math.min(16, Math.floor(availableWidth / 55)));
        setCellSize(newCellSize);
      }
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  // 图表resize
  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.getEchartsInstance()?.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: dataList = [] } = useRequest<number[], []>(
    async () => {
      const res = await getSignInRecordsAPI({ year });
      return res.data || [];
    },
    {
      onError: (error) => {
        message.error(
          "获取签到记录失败" +
            (error instanceof Error ? `：${error.message}` : ""),
        );
      },
    },
  );

  const optionsData = dataList.map((dayOfYear) => {
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });

  const options = {
    tooltip: {
      trigger: "item",
      formatter: (params: { data: [string, number] }) => {
        const [date, value] = params.data;
        return `<div style="padding: 8px 12px; font-size: 13px;">
          <div style="color: #64748b; margin-bottom: 4px;">${date}</div>
          <div style="color: #0f172a; font-weight: 600;">
            ${value ? "✅ 已刷题" : "⬜ 未刷题"}
          </div>
        </div>`;
      },
      backgroundColor: "#fff",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      borderRadius: 8,
      extraCssText: "box-shadow: 0 4px 12px rgba(0,0,0,0.1);",
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        color: ["#e2e8f0", "#4ade80"],
      },
    },
    calendar: {
      range: year,
      top: 30,
      left: 40,
      right: 40,
      bottom: 10,
      cellSize: [cellSize, cellSize],
      yearLabel: {
        show: false,
      },
      monthLabel: {
        nameMap: "ZH",
        color: "#475569",
        fontSize: 12,
        fontWeight: 500,
      },
      dayLabel: {
        firstDay: 1,
        nameMap: ["日", "一", "二", "三", "四", "五", "六"],
        color: "#94a3b8",
        fontSize: 10,
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: "#fff",
        borderRadius: 3,
      },
      splitLine: {
        show: false,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
      emphasis: {
        itemStyle: {
          borderColor: "#22c55e",
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: "rgba(34, 197, 94, 0.4)",
        },
      },
    },
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <ReactEcharts
        ref={chartRef}
        className={styles.chart}
        option={options}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default CalendarChart;
