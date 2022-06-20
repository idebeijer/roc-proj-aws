import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Paper,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { useRecoilValue, useRecoilState } from "recoil";
import { someTableState, awsInfoState } from "@/store/atoms/aws";
import { dateMaskState } from "@/store/Settings";
import { lmkLocationsState } from "@/store/atoms/lamark";
import { DateTimePicker } from "@mui/x-date-pickers";
import { executeQuery } from "@/services/DynamoClient/DynamoClient.service";
import { handleChartData } from "@/utils/data.helpers";
import { useSnackbar } from "notistack";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export const DataPanel = () => {
  const { enqueueSnackbar } = useSnackbar();

  const awsInfo = useRecoilValue(awsInfoState);
  const tableNames = useRecoilValue(someTableState);
  const lmkLocations = useRecoilValue(lmkLocationsState);
  const dateMask = useRecoilValue(dateMaskState);
  const [selectedTable, setSelectedTable] = useState("");
  const [locationId, setLocationId] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [rawChartData, setRawChartData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const test = axiosPrivate.get("/aws/dynamodb");
      console.log(test);
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleChartData(rawChartData.Items).then((res) => setChartData(res));
  }, [rawChartData]);

  const params = {
    accessKeyId: awsInfo.accessKeyId,
    accessSecretKey: awsInfo.accessSecretKey,
    region: awsInfo.region,
    endpoint: awsInfo.endpoint,
    tableName: selectedTable,
    locationId: locationId,
    startDate: startDate,
    endDate: endDate,
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Paper elevation={1}>
            <Box display="flex" justifyContent="center">
              <Box
                display="flex"
                flexDirection="row"
                width="100%"
                justifyContent="center"
                gap={2}
                sx={{ p: 2 }}
              >
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="table-name-label">Table</InputLabel>
                  <Select
                    labelId="table-name-label"
                    id="table-name"
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    input={<OutlinedInput label="Name" />}
                  >
                    {tableNames.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="location-id-label">Locatie ID</InputLabel>
                  <Select
                    label="Location ID"
                    labelId="location-id-label"
                    id="location-id"
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    input={<OutlinedInput label="Locatie ID" />}
                  >
                    {lmkLocations.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <DateTimePicker
                  mask={dateMask}
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label="Begin Datum"
                      value={startDate}
                      onChange={(newDate) => {
                        setStartDate(newDate);
                      }}
                    />
                  )}
                />

                <DateTimePicker
                  mask={dateMask}
                  value={endDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label="Eind Datum"
                      value={endDate}
                      onChange={(newDate) => {
                        setEndDate(newDate);
                      }}
                    />
                  )}
                />
                <Button
                  sx={{ width: 100 }}
                  type="submit"
                  variant="contained"
                  size="large"
                  onClick={() =>
                    executeQuery(params).then((res) =>
                      res ? setRawChartData(res) : enqueueSnackbar(`Error`, { variant: "error" })
                    )
                  }
                >
                  Run
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Box sx={{ m: "0 auto" }} display="flex" justifyContent="center">
          <Paper elevation={1} sx={{ width: "100%", pt: 2, pr: 2 }}>
            <Box display="flex" width="100%" justifyContent="center">
              <ResponsiveContainer height={400}>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <YAxis />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="temperatuur" stroke="#8884d8" />
                  <Line type="monotone" dataKey="luchtvochtigheid" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
