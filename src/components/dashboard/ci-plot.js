import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor'

export const CIPlot = (props) => {

  const results = props['results'];

  const data = {
    labels: results['elapsed'],
    datasets: [{
      borderColor: randomColor(),
      fill: true,
      data: results['ci'],
      label: "Contensity Intensity",
      pointRadius: 1
    }]
  };

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
          text: "elapsed seconds",
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
          text: "# of contention intensity",
          font: {
            family: "sans-serif",
            size: 16
          },
          color: '#5048E5'
        },
        ticks: {
          color: '#5048E5'
        }
      }
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        title="Contention Intensity Per Second"
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
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
