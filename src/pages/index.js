import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import { PropertiesForm } from "../components/properties/properties-form";
import { DashboardLayout } from '../components/dashboard-layout';

const Properties = () => (
  <>
    <Head>
      <title>
        Properties | Dike
      </title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >

      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Benchmark Properties
        </Typography>
        <PropertiesForm />
      </Container>
    </Box>
  </>
);

Properties.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Properties;
