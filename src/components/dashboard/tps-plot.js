import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor'

export const TpsPlot = (props) => {

  const results = props.results;
  const txnType = props.txnType;

  const data = {
    labels: results['elapsed'],
    datasets: [],
  };

  const options =  {
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
          text: "# of transactions",
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
    },
    plugins: {
      legend: {
        labels: {
          color: '#5048E5'
        }
      }
    }
  };

  txnType.forEach((type) => {
    data.datasets.push({
      borderColor: randomColor(),
      fill: true,
      data: results[type + '-tps'],
      label: type,
      pointRadius: 1
    });
  })

  return (
    <Card {...props}>
      <CardHeader
        title="Transactions Per Second"
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
