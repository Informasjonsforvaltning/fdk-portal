import React, { memo, useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import excelFile from '../../../../../dataset-statistics.xlsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Custom function to convert Excel date serial number to JavaScript Date
function excelSerialDateToDate(serialDate: any) {
  const excelEpoch = new Date(1899, 11, 30); // Excel's epoch start (December 30, 1899)
  const excelEpochAsUnixTimestamp = excelEpoch.getTime();
  const missingLeapYearDay = 24 * 60 * 60 * 1000;
  const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
  const oneDay = 24 * 60 * 60 * 1000;
  return new Date(delta + serialDate * oneDay);
}

const DatasetLineAreaChart = () => {
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const workbook = new ExcelJS.Workbook();
      const response = await fetch(excelFile);
      const arrayBuffer = await response.arrayBuffer();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.getWorksheet(1); // assuming you want the first sheet

      // Assuming the first row contains headers and the first column contains labels
      const labels: any[] = [];
      const data: any[] = [];

      worksheet?.eachRow((row, rowNumber) => {
        if (rowNumber > 1 && row.getCell(1).value) {
          // Skip the first row (headers)
          const dataPoint = row.getCell(1).value; // Data point from the first column
          const date = row.getCell(2).value; // Date from the second column

          // Assuming date is in Excel date format, convert it to a JavaScript Date object
          const jsDate =
            typeof date === 'number' ? excelSerialDateToDate(date) : date;

          // Format the date as needed, here we just convert it to a string for simplicity
          const formattedDate =
            jsDate instanceof Date ? jsDate.toLocaleDateString() : '';

          data.push(dataPoint);
          labels.push(formattedDate);
        }
      });

      setChartData({
        labels,
        datasets: [
          {
            fill: true,
            data,

            borderColor: '#335380',
            backgroundColor: '#d5e1f2'
          }
        ]
      });
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback(_: any, index: number) {
            return index % 4 === 0 ? chartData.labels[index] : '';
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Datasets'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default memo(DatasetLineAreaChart);
