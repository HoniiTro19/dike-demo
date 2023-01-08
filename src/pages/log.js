import axios from 'axios';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router';
import CodeMirror from '@uiw/react-codemirror';
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import Head from 'next/head';
import { BackToHistories } from '../components/backToHistories';

const Configuration = (props) => {

  const [log, setLog] = useState();
  const [description, setDescription] = useState();

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/log", { params: { runid: router.query.runid } })
         .then((res) => {
           setLog(res.data.log);
           setDescription(res.data.des);
         })
  }, [])

  return (
    <div>
      <Head>
        <title>
          Log File | Dike
        </title>
      </Head>
      <Card {...props}>
        <BackToHistories/>
        <CardHeader
          title={'Log File For '+description}
          sx={{
            height: 10
          }}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: 'relative'
            }}
          >
            <CodeMirror
              value={log}
              options={{
                theme: 'eclipse',
                tabSize: 0,
                keyMap: 'sublime',
                mode: 'jsx'
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  )
};

Configuration.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Configuration;
