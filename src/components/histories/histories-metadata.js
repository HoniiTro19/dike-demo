import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  useEffect,
  useState
} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { v4 as uuid } from 'uuid';
import { SeverityPill } from '../severity-pill';

export const HistoriesMetaData = (props) => {

  const [histories, setHistories] = useState([]);

  useEffect(() => {
    axios.get("/api/history")
         .then(res => {
           setHistories(res.data);
         })
         .catch(err => {
           console.error(err);
         });
  }, [])

  const router = useRouter();

  const toResult = (history) => {
    if (history.status === 'success') {
      router.push({
        pathname: '/result',
        query: { runid: history.runid }
      });
    } else {
      router.push({pathname: '/404'});
    }
  };

  const toProperties = (id) => {
    router.push({
      pathname: '/configuration',
      query: { runid: id }
    });
  };

  const toLogs = (id) => {
    router.push({
      pathname: '/log',
      query: { runid: id }
    });
  };

  return (
    <Card {...props}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Run ID
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Properties File
                </TableCell>
                <TableCell>
                  Result DashBoard
                </TableCell>
                <TableCell>
                  Test Log
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {histories.map((history) => (
                <TableRow
                  hover
                  key={uuid()}
                >
                  <TableCell>
                    {history.runid}
                  </TableCell>
                  <TableCell>
                    {history.date}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(history.status === 'success' && 'success')
                        || (history.status === 'error' && 'error')
                        || 'warning'}
                    >
                      {history.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => { toProperties(history.runid) }}
                      type="primary"
                    >
                      properties
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => { toResult(history) }}
                      type="primary"
                    >
                      result
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => { toLogs(history.runid) }}
                      type="primary"
                    >
                      logs
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}
