import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';

export const Latency99th = (props) => (
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
            99% Latency Milliseconds
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.latency99th}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <CrisisAlertIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={99}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);
