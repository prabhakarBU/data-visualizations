import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

var data = {
  datasets: [
    {
      backgroundColor: "rgb(156, 39, 176)",
      borderColor: "rgb(156, 39, 176)",
      fill: false,
      data: [10, 120, 80, 134],
      id: "amount",
      label: "Purchase amount (USD)",
      yAxisID: "y",
    },
    {
      backgroundColor: "rgb(39, 176, 200)",
      borderColor: "rgb(39, 176, 200)",
      fill: false,
      data: [300, -1200, 500, -340],
      id: "amount",
      label: "Percentage amount (USD)",
      yAxisID: "y1",
    },
  ],
  labels: ["2017-01-02", "2017-04-02", "2017-07-02", "2018-01-02"],
};
var options = {
  elements: {
    rectangle: {
      borderWidth: 2,
    },
  },
  layout: {
    padding: 0,
  },
  legend: {
    display: true,
    labels: {
      boxWidth: 16,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: true,
          labelString: "Date",
        },
        stacked: false,
        ticks: {
          autoSkip: true,
          beginAtZero: true,
        },
        time: {
          tooltipFormat: "[Q]Q - YYYY",
          unit: "quarter",
        },
        type: "time",
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Purchase amount (USD)",
        },
        id: "left",
        stacked: false,
        ticks: {
          beginAtZero: true,
        },
      },
      {
        scaleLabel: {
          display: true,
          labelString: "Purchase count",
        },
        id: "right",
        position: "right",
        stacked: false,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  title: {
    display: false,
  },
  tooltips: {
    intersect: false,
    mode: "index",
    position: "nearest",
    callbacks: {},
  },
};

export default function MultiLineAxis() {
  return <Line type="line" options={options} data={data} />;
}
