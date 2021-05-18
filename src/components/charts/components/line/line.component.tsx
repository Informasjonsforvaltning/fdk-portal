import React, { FC, memo } from 'react';
import moment from 'moment';
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
      type: 'area' as const,
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
      curve: 'smooth' as const
    },
    xaxis: {
      type: 'datetime' as const,
      tickAmount: 8,
      max: new Date().getTime(),
      labels: {
        formatter: (val: any) => moment(new Date(val)).format('DD MMM YY')
      }
    },
    legend: {
      horizontalAlign: 'left' as const
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
      type='area'
      width={500}
      height={320}
    />
  );
};

export default memo(LineChart);
