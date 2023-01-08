import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Router from "next/router";
import { fontSize } from '@mui/system';

export const PropertiesForm = (props) => {

  const plaintextSize = {fontSize: 22}

  const [switches, setSwitches] = useState({
    isDistributedTxn: false,
    isDistributedQuery: false,
    isDynamicConflict: false,
    isDynamicWorkload: false,
    isDynamicTransaction: false,
    isHotSpot: false,
    isFaultInjection: false,
    isGlobalDeadlock: false,
    isGlobalSnapshot: false
  });

  const [properties, setProperties] = useState({
    db: "oceanbase",
    warehouses: 100,
    terminals: 100,
    physicalNode: 1,
    runMins: 5,
    newOrder: 45,
    payment: 43,
    orderStatus: 4,
    delivery: 4,
    stockLevel: 4,
    updateItem: 0,
    updateStock: 0,
    globalDeadlock: 0,
    globalSnapshot: 0,
    rollbackRetry: false,
    newOrderDistributedRate: 0,
    newOrderSpanNode: 1,
    warehouseDistribution: "uniform",
    terminalWarehouseFixed: false,
    stockLevelDistributedRate: 0,
    stockLevelWIDNode: 1,
    statisticsCalc: true,
    broadcastTest: false,
    batchUpdate: true,
    accesssUpdateItemRate: 20,
    readWriteSeperation: false,
    bandTransaction: false,
    dynamicDistrict: false,
    districtDistribution: "zipfian:1.5",
    dynamicLoad: false,
    loadDistribution: "gaussian",
    dynamicConflict: false,
    conflictChangeInterval: 1,
    cilist: 10,
    snapshotTimes: 4,
    deadlockTimes: 5,
    coaccessNumber: 1,
    dynamicTransaction: false,
    changeTransactions: "50,40,6,2,2,0,0,0,0",
    changePoints: 2,
    chaosNode: "root@127.0.0.1",
    cpuLoad: false,
    stressMemory: false,
    diskRead: false,
    diskWrite: false,
    networkDelay: false,
    shutdown: false,
    chaosTime: 1,
    chaosTimes: "1,2,2",
    chaosType: "cpuLoad,networkDelay,diskRead",
    osCollector: true,
    osCollectorScript: "/home/zhanghuidong.zhd/tools/Dike/run/misc/os_collector_linux.py",
    osCollectorSSHAddr: "root@127.0.0.1",
    osCollectorDevices: "net_lo,blk_vdb",
    txnReportInterval: 1,
    schemaScript: "tableCreates",
    partitions: 1,
    jdbc: "jdbc:mysql",
    host: "127.0.0.1",
    port: 2881,
    set: "dike",
    user: "root@mysql",
    password: "",
    useSSL: false,
    rewriteBatchedStatements: true,
    allowMultiQueries: true,
    useLocalSessionState: true,
    allowLoadLocalInfile: false,
    useServerPrepStmts: false,
    useConfigs: "",
    sslmode: "disable",
    reWriteBatchedInserts: true,
    autoReconnect: true,
    socketTimeout: 300000,
    isolationLevel: 2,
    description: "Benchmark Template"
  });

  const dbOptions = [
    { name: "mysql", driver: "jdbc:mysql" },
    { name: "oceanbase", driver: "jdbc:mysql" },
    { name: "tidb", driver: "jdbc:mysql" },
    { name: "postgresql", driver: "jdbc:postgresql" },
    { name: "cockroachdb", driver: "jdbc:postgresql" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(
        "/api/properties",
        properties,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (err) {
      console.error(err.response.data);
    }
    Router.push("/histories");
  };

  const handleChange = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitch = (e) => {
    setSwitches({
      ...switches,
      [e.target.name]: e.target.checked,
    })
  };

  useEffect(() => {
    if (switches.isDistributedTxn) {
      properties.newOrderDistributedRate = 100;
      properties.newOrderSpanNode = 3;
    } else {
      properties.newOrderDistributedRate = 0;
      properties.newOrderSpanNode = 1;
    }
  }, [switches.isDistributedTxn]);

  useEffect(() => {
    if (switches.isDistributedQuery) {
      properties.stockLevelDistributedRate = 100;
      properties.stockLevelWIDNode = 3;
    } else {
      properties.stockLevelDistributedRate = 0;
      properties.stockLevelWIDNode = 1;
    }
  }, [switches.isDistributedQuery]);

  useEffect(() => {
    if (switches.isDynamicConflict) {
      properties.runMins = 5;
      properties.warehouses = 180;
      properties.dynamicConflict = true;
      properties.cilist = "30,110,150,80,50";
    } else {
      properties.runMins = 5;
      properties.warehouses = 100;
      properties.dynamicConflict = false;
    }
  }, [switches.isDynamicConflict]);

  useEffect(() => {
    if (switches.isDynamicWorkload) {
      properties.dynamicLoad = true;
    } else {
      properties.dynamicLoad = false;
    }
  }, [switches.isDynamicWorkload]);

  useEffect(() => {
    if (switches.isDynamicTransaction) {
      properties.runMins = 5;
      properties.dynamicTransaction = true;
    } else {
      properties.runMins = 5;
      properties.dynamicTransaction = false;
    }
  }, [switches.isDynamicTransaction]);

  useEffect(() => {
    if (switches.isHotSpot) {
      properties.newOrder = 0;
      properties.payment = 0;
      properties.orderStatus = 0;
      properties.stockLevel = 0;
      properties.delivery = 0;
      properties.updateItem = 0;
      properties.updateStock = 100;
      properties.globalSnapshot = 0;
      properties.globalDeadlock = 0;
    } else {
      properties.newOrder = 45;
      properties.payment = 43;
      properties.orderStatus = 4;
      properties.stockLevel = 4;
      properties.delivery = 4;
      properties.updateItem = 0;
      properties.updateStock = 0;
      properties.globalSnapshot = 0;
      properties.globalDeadlock = 0;
    }
  }, [switches.isHotSpot]);

  useEffect(() => {
    if (switches.isFaultInjection) {
      properties.runMins = 5;
      properties.cpuLoad = true;
    } else {
      properties.runMins = 5;
      properties.cpuLoad = false;
    }
  }, [switches.isFaultInjection]);

  useEffect(() => {
    if (switches.isGlobalDeadlock) {
      properties.newOrder = 0;
      properties.payment = 0;
      properties.orderStatus = 0;
      properties.stockLevel = 0;
      properties.delivery = 0;
      properties.updateItem = 0;
      properties.updateStock = 0;
      properties.globalSnapshot = 100;
      properties.globalDeadlock = 0;
    } else {
      properties.newOrder = 45;
      properties.payment = 43;
      properties.orderStatus = 4;
      properties.stockLevel = 4;
      properties.delivery = 4;
      properties.updateItem = 0;
      properties.updateStock = 0;
      properties.globalSnapshot = 0;
      properties.globalDeadlock = 0;
    }
  }, [switches.isGlobalDeadlock]);

  useEffect(() => {
    if (switches.isGlobalDeadlock) {
      properties.newOrder = 0;
      properties.payment = 0;
      properties.orderStatus = 0;
      properties.stockLevel = 0;
      properties.delivery = 0;
      properties.updateItem = 0;
      properties.updateStock = 0;
      properties.globalSnapshot = 0;
      properties.globalDeadlock = 100;
    } else {
      properties.newOrder = 45;
      properties.payment = 43;
      properties.orderStatus = 4;
      properties.stockLevel = 4;
      properties.delivery = 4;
      properties.updateItem = 0;
      properties.updateStock = 0;
      properties.globalSnapshot = 0;
      properties.globalDeadlock = 0;
    }
  }, [switches.isGlobalDeadlock]);

  return (
    <form {...props}
          onSubmit={handleSubmit}
    >
      <Card>
        {/*Cluster Setting*/}
        <CardHeader
          title="Database Cluster Settings"
          style={{ padding: "10px 20px"}}
        />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '27.6ch' },
          }}
          noValidate
          autoComplete="on"
        >
          <div>
            <TextField
              required
              label="database"
              type="text"
              name="db"
              value={properties.db}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="servers"
              type="number"
              name="physicalNode"
              value={properties.physicalNode}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="server ssh address"
              type="text"
              name="osCollectorSSHAddr"
              value={properties.osCollectorSSHAddr}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="system devices"
              type="text"
              name="osCollectorDevices"
              value={properties.osCollectorDevices}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="fault injection servers"
              type="text"
              name="chaosNode"
              value={properties.chaosNode}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Box>
        <Divider />

        {/*Connection Settings*/}
        <CardHeader
          title="Connection Settings"
          style={{ padding: "10px 20px"}}
        />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '22.7ch' },
          }}
          noValidate
          autoComplete="on"
        >
          <div>
            <TextField
              required
              label="jdbc driver"
              name="jdbc"
              value={dbOptions.find(({ name }) => name === properties.db)?.driver}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="host"
              type="text"
              name="host"
              value={properties.host}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="port"
              type="number"
              name="port"
              value={properties.port}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="user"
              type="text"
              name="user"
              value={properties.user}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="password"
              type="password"
              name="password"
              value={properties.password}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              label="isolation level"
              type="number"
              name="isolationLevel"
              value={properties.isolationLevel}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Box>
        <Divider />

        {/*Benchmark Scale*/}
        <CardHeader
          title="Data and Workload Scale Settings"
          style={{ padding: "10px 20px"}}
        />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '34.9ch' },
          }}
          noValidate
          autoComplete="on"
        >
          {/*<Autocomplete*/}
          {/*  required*/}
          {/*  options={dbOptions.map((option) => option.name)}*/}
          {/*  onChange={(e, val) => setProperties({*/}
          {/*    ...properties,*/}
          {/*    ["db"]: val,*/}
          {/*  })*/}
          {/*  }*/}
          {/*  renderInput={(params) =>*/}
          {/*    <TextField {...params}*/}
          {/*        label="database"*/}
          {/*        type="text"*/}
          {/*        name="db"*/}
          {/*        value={properties.db}*/}
          {/*        onChange={(e) => handleChange(e)}*/}
          {/*  />}*/}
          {/*/>*/}
          {/*<Autocomplete*/}
          {/*  required*/}
          {/*  options={distributionOptions}*/}
          {/*  onChange={(e, val) =>*/}
          {/*    setProperties({*/}
          {/*      ...properties,*/}
          {/*      ["warehouseDistribution"]: val,*/}
          {/*    })*/}
          {/*  }*/}
          {/*  renderInput={(params) =>*/}
          {/*    <TextField {...params}*/}
          {/*        label="warehouses distribution"*/}
          {/*        type="text"*/}
          {/*        name="warehouseDistribution"*/}
          {/*        value={properties.warehouseDistribution}*/}
          {/*        onChange={(e) => handleChange(e)}*/}
          {/*  />}*/}
          {/*/>*/}
          <TextField
            required
            label="warehouses"
            type="number"
            name="warehouses"
            value={properties.warehouses}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            required
            label="terminals"
            type="number"
            name="terminals"
            value={properties.terminals}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            required
            label="minutes"
            type="number"
            name="runMins"
            value={properties.runMins}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            required
            label="partitions"
            type="number"
            name="partitions"
            value={properties.partitions}
            onChange={(e) => handleChange(e)}
          />
          {/*<TextField*/}
          {/*  required*/}
          {/*  label="description"*/}
          {/*  type="text"*/}
          {/*  name="description"*/}
          {/*  value={properties.description}*/}
          {/*  onChange={(e) => handleChange(e)}*/}
          {/*/>*/}
        </Box>
        <Divider />

        {/*Transaction Settings*/}
        <CardHeader
          title="Transaction Control Settings"
          style={{ padding: "10px 20px"}}
        />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '27.61ch' },
          }}
          noValidate
          autoComplete="on"
        >
          <div>
            <TextField
              required
              label="new order"
              type="number"
              name="newOrder"
              value={properties.newOrder}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="payment"
              type="number"
              name="payment"
              value={properties.payment}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="order status"
              type="number"
              name="orderStatus"
              value={properties.orderStatus}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="delivery"
              type="number"
              name="delivery"
              value={properties.delivery}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="stock level"
              type="number"
              name="stockLevel"
              value={properties.stockLevel}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="update item"
              type="number"
              name="updateItem"
              value={properties.updateItem}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="update stock"
              type="number"
              name="updateStock"
              value={properties.updateStock}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="global deadlock"
              type="number"
              name="globalDeadlock"
              value={properties.globalDeadlock}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="global snapshot"
              type="number"
              name="globalSnapshot"
              value={properties.globalSnapshot}
              onChange={(e) => handleChange(e)}
            />
          {/*</div>*/}
        {/*</Box>*/}
        {/*<Box*/}
        {/*  component="form"*/}
        {/*  sx={{*/}
        {/*    '& .MuiTextField-root': { m: 1, width: '27.6ch' },*/}
        {/*  }}*/}
        {/*  noValidate*/}
        {/*  autoComplete="on"*/}
        {/*>*/}
        {/*  <div>*/}
            <TextField
              required
              label="new order distributed rate"
              type="number"
              name="newOrderDistributedRate"
              value={properties.newOrderDistributedRate}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="new order cross servers"
              type="number"
              name="newOrderSpanNode"
              value={properties.newOrderSpanNode}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="stock level distributed rate"
              type="number"
              name="stockLevelDistributedRate"
              value={properties.stockLevelDistributedRate}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="stock level cross servers"
              type="number"
              name="stockLevelWIDNode"
              value={properties.stockLevelWIDNode}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="contention intensity"
              type="text"
              name="cilist"
              value={properties.cilist}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="load volume distribution"
              type="text"
              name="loadDistribution"
              value={properties.loadDistribution}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="data distribution"
              type="text"
              name="districtDistribution"
              value={properties.districtDistribution}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="partition access"
              type="number"
              name="coaccessNumber"
              value={properties.coaccessNumber}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              required
              label="fault injection type"
              type="text"
              name="chaosType"
              value={properties.chaosType}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Box>
        <Divider />

        <CardHeader
          title="Test Controllers"
          style={{ padding: "10px 20px"}}
        />
        <CardContent
          style={{ padding: "10px 20px"}}
        >
          <Grid
            container
            spacing={8}
            wrap="wrap"
          >
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                Scalability
              </Typography>
              <FormControl
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isDistributedTxn"
                        checked={switches.isDistributedTxn}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>quantitative distributed transaction</Typography>}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        name="isDistributedQuery"
                        checked={switches.isDistributedQuery}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>quantitative distributed query</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isDynamicConflict"
                        checked={switches.isDynamicConflict}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>quantitative contention</Typography>}
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            {/*Schedulability*/}
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                Schedulability
              </Typography>
              <FormControl
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isDynamicWorkload"
                        checked={switches.isDynamicWorkload}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>dynamic load volume</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isDynamicTransaction"
                        checked={switches.isDynamicTransaction}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>non-uniform data distribution</Typography>}
                  />
                <FormControlLabel
                  control={
                    <Switch
                      name="isHotSpot"
                      checked={switches.isHotSpot}
                      onChange={(e) => handleSwitch(e)}
                    />
                  }
                  label={<Typography sx={plaintextSize}>skew partition access</Typography>}
                />
              </FormGroup>
              </FormControl>
            </Grid>

            {/*Availability*/}
            <Grid
              item
              md={4}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                Availability / Function Test
              </Typography>
              <FormControl
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name="isFaultInjection"
                        checked={switches.isFaultInjection}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>comprehensive fault injection</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isGlobalDeadlock"
                        checked={switches.isGlobalDeadlock}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>global deadlock</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="isGlobalSnapshot"
                        checked={switches.isGlobalSnapshot}
                        onChange={(e) => handleSwitch(e)}
                      />
                    }
                    label={<Typography sx={plaintextSize}>global snapshot</Typography>}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  )
}
