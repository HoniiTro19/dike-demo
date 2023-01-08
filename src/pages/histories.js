import { Box, Button, Container, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import { DashboardLayout } from '../components/dashboard-layout';
import { HistoriesMetaData } from '../components/histories/histories-metadata';

const Histories = (props) => {

  return (
    <>
      <Head>
        <title>
          Histories | Dike
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              m: -1
            }}
          >
            <Typography
              sx={{ m: 4 }}
              variant="h4"
            >
              Task Histories
            </Typography>
            <Box sx={{ m: 1 }}>
              <NextLink
                href="/"
                passHref
              >
                <Button
                  color="primary"
                  variant="contained"
                >
                  New Benchmark Task
                </Button>
              </NextLink>
            </Box>
          </Box>
          <HistoriesMetaData />
        </Container>
      </Box>
    </>
  )
};

Histories.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Histories;
