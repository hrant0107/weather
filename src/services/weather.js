import axios from "axios";
import { MAIN_API_URL } from "../constant";

const mainApi = axios.create({ baseURL: MAIN_API_URL });

export const getWeatherByForecast = (query) => mainApi.get(`forecast?${query}`);

export const getWeatherByWeather = (query) => {
  return mainApi.get(`weather?${query}`);
};
