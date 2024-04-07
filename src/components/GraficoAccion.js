import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GraficoAccion = ({ cotizacion, intervalo }) => {
  // Calcula el intervalo de tick en milisegundos
  let tickInterval;
  switch(intervalo) {
    case '1min':
      tickInterval = 300000; // 1 minuto en milisegundos
      break;
    case '5min':
      tickInterval = 900000; // 5 minutos en milisegundos
      break;
    case '15min':
      tickInterval = 3600000; // 15 minutos en milisegundos
      break;
    default:
      tickInterval = 3600000; // Por defecto 1 hora
  }

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Cotización de la Acción'
    },
    xAxis: {
      type: 'datetime',
      tickInterval: tickInterval,
      dateTimeLabelFormats: {
        minute: '%H:%M',
        hour: '%H:%M'
      },
      title: {
        text: 'Hora'
      }
    },
    yAxis: {
      title: {
        text: 'Precio'
      }
    },
    series: [{
      name: '',
      data: cotizacion
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GraficoAccion;