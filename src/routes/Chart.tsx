import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

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

const ApexChartStyled = styled(ApexChart)`
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
        <ApexChartStyled
          type="line"
          series={[
            {
              name: "closing-price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparants",
            },
            grid: { show: false },
            theme: { mode: "dark" },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value: number) => `$ ${value.toFixed(1)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
