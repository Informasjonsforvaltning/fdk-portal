import React, { FC, memo } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';

import { themeFDK } from '../../../../app/theme';

interface Props {
  name: string;
  data: number[];
  labels: any;
  lineColor?: string;
}

const LineChart: FC<Props> = ({
  name,
  data,
  labels,
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
    labels,
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        formatter(timestamp: any) {
          const datestamp = new Date(timestamp);
          return moment(datestamp).format('MM.YYYY');
        }
      }
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
