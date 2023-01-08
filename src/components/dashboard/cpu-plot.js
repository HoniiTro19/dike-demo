import React, { useRef, useEffect } from "react";
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { BoxPlotChart } from "@sgratzl/chartjs-chart-boxplot";
import randomColor from 'randomcolor'

export const CPUPlot = (props) => {

  const results = props['results'];

  const options =  {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "server id",
          font: {
            family: "sans-serif",
            size: 16
          },
          color: '#5048E5'
        },
        ticks: {
          color: '#5048E5'
        }
      },
      y: {
        title: {
          display: true,
          text: "cpu usage",
          font: {
            family: "sans-serif",
            size: 16
          },
          color: '#5048E5'
        },
        ticks: {
          callback: function(value, index, ticks) {
            return value + '%';
          },
          color: '#5048E5'
        }
      }
    }
  };

  const servers = [];
  Object.keys(results)
        .forEach((key) => {
          if (key.startsWith("cpu-")) {
            servers.push(key.slice(4));
          }
        })


  const boxplotData = {
    labels: servers,
    datasets: [
      {
        backgroundColor: "rgba(136,132,216,0.5)",
        borderColor: "#8884d2",
        borderWidth: 1,
        outlierColor: "#82ca9d",
        padding: 10,
        itemRadius: 0,
        data: []
      }
    ]
  };

  servers.forEach((server) => {
    const cpuUsage = [];
    results["cpu-"+server].forEach((val) => {
      cpuUsage.push(parseFloat(val));
    })
    boxplotData.datasets[0].data.push(
      cpuUsage
    )
  })

  const myContainer = useRef(null);
  let chartContainer;
  if (!!myContainer.current) {
    if (!!chartContainer) {
      chartContainer.destroy();
    }
    chartContainer = new BoxPlotChart(myContainer.current.getContext("2d"), {
      data: boxplotData,
      options: options
    });
  }

  return (
    <Card {...props}>
      <CardHeader
        title="CPU Usage Per Server"
        sx={{
          height: 10
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <div>
            <canvas ref={myContainer}></canvas>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
