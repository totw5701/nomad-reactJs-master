import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import Price from "./Price";

interface IChartData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: number;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const ApexChartBox = styled.div`
  border: 5px solid;
  border-radius: 10px;
  border-color: ${(props) => props.theme.boxColor};
`;

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IChartData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading ..."
      ) : (
        <ApexChartBox>
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "dfdf",
              data: data?.map((dt) => [new Date(dt.time_close * 1000).toISOString(), [dt.open, dt.high, dt.low, dt.close]]) as any[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            yaxis: { show: false },
            xaxis: {
              type: "datetime",
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparants",
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: undefined,
              },
            },
            grid: { show: false },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
          }}
        />
        </ApexChartBox>
      )}
    </div>
  );
}

export default Chart;
