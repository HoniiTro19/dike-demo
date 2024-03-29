import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';

export const LatencyAvg = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            50% Latency Milliseconds
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.latencyavg}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <FmdGoodIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={50}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);
