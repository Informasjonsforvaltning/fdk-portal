import React, { FC, memo } from 'react';
import Chart from 'react-apexcharts';

import { themeFDK } from '../../../../app/theme';

interface Props {
  name: string;
  data: number[];
  lineColor?: string;
}

const LineChart: FC<Props> = ({
  name,
  data,
  lineColor = themeFDK.extendedColors.neutralDarker
}) => {
  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: [`${lineColor}`],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime'
    },
    legend: {
      horizontalAlign: 'left'
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 350
          }
        }
      }
    ]
  };

  const series = [
    {
      name,
      data
    }
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={500}
      height={320}
    />
  );
};

export default memo(LineChart);
