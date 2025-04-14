import { createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "./../constants/index";
import axios from "axios";

// An asynchronous thunk action that will receive flag, country, corona data from APIs and transfer them to the slice.
export const getData = createAsyncThunk("countryData", async (isoCode) => {
  // Specified the parameter to be used when requesting the API.
  const params = { q: isoCode };

  // the API request from which we get corona information
  const req1 = axios.get(`https://covid-19-statistics.p.rapidapi.com/reports`, {
    params,
    headers,
  });

  // API request where we get country details
  const req2 = axios.get(`https://restcountries.com/v3.1/name/${isoCode}`);

  // Send both API requests synchronously
  const responses = await Promise.all([req1, req2]);

  // Distributed the region object in the covid information into the coivid object
  const covid = {
    ...responses[0].data.data[0],
    ...responses[0].data.data[0].region,
  };

  // Remove unnecessary values
  delete covid.region;
  delete covid.cities;

  // Return the payload
  return {
    covid,
    country: responses[1].data[0],
  };
});
