import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import randomColor from 'randomcolor';

export const DataPlot = (props) => {

  const results = props['results'];

  const servers = [];
  Object.keys(results)
        .forEach((key) => {
          if (key.startsWith("cpu-")) {
            servers.push(key.slice(4));
          }
        })

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
            size: 16,
          },
          color: '#5048E5'
        },
        ticks: {
          color: '#5048E5'
        },
      },
      y: {
        title: {
          display: true,
          text: "data size",
          font: {
            family: "sans-serif",
            size: 16,
          },
          color: '#5048E5'
        },
        ticks: {
          callback: function (value, index, ticks) {
            return value + 'GiB';
          },
          color: '#5048E5'
        },
      }
    }
  };

  // const size = [5.5, 3.0527, 5.6523, 3.0332, 3.3438, 3.3887, 3, 3.2188, 5.4258];
  const size = [3.9492, 3.9551, 3.7949, 3.873, 3.873, 3.7988, 3.9512, 3.8691, 3.8066];
  servers.shift()
  const data = {
    labels: servers,
    datasets: [
      {
        data: size,
        backgroundColor: randomColor(),
      }
    ]
  };

  return (
    <Card {...props}>
      <CardHeader
        title="Data Size Per Server"
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
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
