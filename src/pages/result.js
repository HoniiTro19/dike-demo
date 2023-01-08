import { Box, CardHeader, Container, Grid } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { LatencyPlot } from '../components/dashboard/latency-plot';
import { TpsPlot } from '../components/dashboard/tps-plot';
import { DistributedPlot } from '../components/dashboard/distributed-plot'
import { CrossnodePlot } from '../components/dashboard/crossnode-plot';
import { CIPlot } from '../components/dashboard/ci-plot';
import { CPUPlot } from '../components/dashboard/cpu-plot';
import { DataPlot } from '../components/dashboard/data-plot'
import { BackToHistories } from '../components/backToHistories'

const Result = (props) => {

  const [results, setResults] = useState({});
  const [txnType, setTxnType] = useState([]);
  const [description, setDescription] = useState();

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/result", { params: { runid: router.query.runid } })
         .then(res => {
           setResults(res.data.results);
           setTxnType(res.data.txnType);
           setDescription(res.data.des);
         })
  }, [])

  return (
    <div>
      <Head>
        <title>
          Result Dashboard | Dike
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <CardHeader
            title={'Result Dashboard For '+description}
            sx={{
              height: 10
            }}
          />
          <BackToHistories/>
          <Grid
            container
            spacing={3}
          >
            {/*Throughtput*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <TpsPlot results={results} txnType={txnType} />
            </Grid>
            {/*Latency*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <LatencyPlot results={results} txnType={txnType} />
            </Grid>
            {/*Distributed Rate*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <DistributedPlot results={results} txnType={txnType} />
            </Grid>
            {/*Cross Node*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <CrossnodePlot results={results} txnType={txnType} />
            </Grid>
            {/*Contention Intensity*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <CIPlot results={results} />
            </Grid>
            {/*CPU Usage*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <CPUPlot results={results} />
            </Grid>
            {/*Data Size*/}
            <Grid
              item
              lg={6}
              md={12}
              xl={9}
              xs={12}
            >
              <DataPlot results={results} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
};

Result.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Result;
