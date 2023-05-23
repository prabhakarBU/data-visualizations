import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ImmigrantsInflux() {
  const router = useRouter();
  const [labels, setLabels] = useState([]);
  const [numOfImmigrants, setNumOfImmigrants] = useState([]);
  const [percentageOfImmigrants, setPercentageOfImmigrants] = useState([]);

  const readImmigrantsInfluxCSV = async () => {
    try {
      // console.log("inside readImmigrantsInfluxCSV");

      const response = await fetch("/api/readImmigrantsInfluxCSV/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const text = await response.json();
      // console.log(text);

      if (response.status === 200) {
        setLabels(text.labels);
        setNumOfImmigrants(text.numOfImmigrants);
        setPercentageOfImmigrants(text.percentageOfImmigrants);
      }
    } catch (error) {
      console.log("tools catch block");
      console.log(error);
    }
  };

  useEffect(() => {
    const immigrantsinfluxresult = readImmigrantsInfluxCSV();
  }, []);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Number of Immigrants and Immigrants as Percentage of the U.S. Population, 1850 to 2021",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: '#FF0000'
          }
        }
      },
      y: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: 'Number Of Immigrants'
        }
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: 'Immigrants as a percentage of the US Population'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Number Of Immigrants",
        data: numOfImmigrants,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Immigrants as a Percentage of the U.S. Population (%)",
        data: percentageOfImmigrants,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="wrapper">
      <Line type="line" options={options} data={data} />
    </div>
  );
}
