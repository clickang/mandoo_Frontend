import React, { Fragment } from "react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ChartContainer } from "./CharStyles";

export default function Chart({ chartType, chartData }) {
  return (
    <Fragment>
      <ChartContainer className="drag-handle">
        {chartType === "line" && (
          <ResponsiveLine
            data={chartData}
            margin={{ top: 30, right: 40, bottom: 40, left: 40 }}
          />
        )}
        {chartType === "pie" && (
          <ResponsivePie
            data={chartData}
            margin={{ top: 30, right: 40, bottom: 40, left: 40 }}
          />
        )}
      </ChartContainer>
    </Fragment>
  );
}
