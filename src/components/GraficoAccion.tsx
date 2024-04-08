import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GraficoAccionProps } from "./GraficoAccion_Types";

const GraficoAccion: React.FC<GraficoAccionProps> = ({
  cotizacion,
  intervalo,
}) => {
  let tickInterval;
  switch (intervalo) {
    case "1min":
      tickInterval = 300000;
      break;
    case "5min":
      tickInterval = 900000;
      break;
    case "15min":
      tickInterval = 3600000;
      break;
    default:
      tickInterval = 3600000;
  }

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Cotización de la Acción",
    },
    lang: {
      noData: "Awaiting for data",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        color: "red",
      },
    },
    xAxis: {
      type: "datetime",
      tickInterval: tickInterval,
      dateTimeLabelFormats: {
        minute: "%H:%M",
        hour: "%H:%M",
      },
      title: {
        text: "Hora",
      },
    },
    yAxis: {
      title: {
        text: "Precio",
      },
    },
    series: [
      {
        name: "",
        data: cotizacion,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GraficoAccion;
