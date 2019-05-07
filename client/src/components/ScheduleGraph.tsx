import * as React from "react";
import * as chartjs from "chart.js";
import { Radar, ChartData } from "react-chartjs-2";

/* cover: {
 *   width: 300
 * }, */

/*
 * width={300}
 * height={300}
 * options={{ maintainAspectRatio: false }}
 */

const labels = [
  "Materias",
  "Maestros",
  "Horas libres",
  "Hora de entrada",
  "Hora de salida"
];

function getPreviousDataset(previous) {
  if (previous) {
    return {
      label: "Anterior",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: previous[0]
    };
  } else {
    return [];
  }
}

function getCurrentDataset(current) {
  if (current) {
    return {
      label: "Actual",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: current[0]
    };
  } else {
    return [];
  }
}

function ScheduleGraph(props) {
  const { previous, current } = props;
  const datasets = getPreviousDataset(previous).concat(
    getCurrentDataset(current)
  );
  const data = { labels: labels, datasets: datasets };
  return <Radar data={data} />;
}

export default ScheduleGraph;
