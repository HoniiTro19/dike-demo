import BusinessIcon from '@mui/icons-material/Business';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

export const Tps = (props) => (
  <Card {...props}>
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
            Transactions Per Second
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.tps}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <BusinessIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
