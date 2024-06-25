import { createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "./../constants/index";
import axios from "axios";

// API'lerden bayrak, ülke, korona verileri alınıp slice'a aktarıcak asenkron thunk aksiyonu yazalım
export const getData = createAsyncThunk("countryData", async (isoCode) => {
  // API istenildiğinde kullanılacak parametreyi belirle
  const params = { q: isoCode };

  // corona bilgilerini alıcağımız API isteğini ayarla
  const req1 = axios.get(`https://covid-19-statistics.p.rapidapi.com/reports`, {
    params,
    headers,
  });

  // Ülke detaylarını alıcağımız API isteğini ayarla
  const req2 = axios.get(`https://restcountries.com/v3.1/name/${isoCode}`);

  // Her iki API isteğini senkron / paralel bir şekilde gönder
  const responses = await Promise.all([req1, req2]);

  // Covid bilgilerindeki region nesnesini coivid nesnesi içerisine dağıt
  const covid = {
    ...responses[0].data.data[0],
    ...responses[0].data.data[0].region,
  };

  // Gereksiz değerleri kaldır
  delete covid.region;
  delete covid.cities;

  // Payload'ı return edeceğiz
  return {
    covid,
    country: responses[1].data[0],
  };
});
