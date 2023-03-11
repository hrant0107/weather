import React, { createContext, useCallback, useEffect, useState } from "react";
import "./App.scss";

import WeatherSearch from "./components/searchWeather/SearchWheather";
import MyLocation from "./components/myLocation/MyLocation";
import Cities from "./components/favoriteCities/Cities";
import Progress from "./components/Progress";
import ErrorMessage from "./components/errorMessage/ErrorMessage";

import { API_KEY, API_URL, API_URL_WEATHER, CITIES } from "./constant";
import axios from "axios";
import { getWeatherByForecast, getWeatherByWeather } from "./services/weather";

export const weatherContext = createContext();

const App = () => {
  const cityData = JSON.parse(localStorage.getItem("cities"));

  const [coordinates, setCoordinates] = useState({});
  const [weatherData, setWeatherData] = useState("");
  const [forcastData, setForcastData] = useState("");
  const [cities, setCities] = useState(cityData?.length ? cityData : CITIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCoordinates({
        latitude,
        longitude,
      });
      myLocationWeather(latitude, longitude);
    });
  }, []);

  const myLocationWeather = useCallback(async (lat, long) => {
    try {
      setLoading(true);
      const { data: response } = await getWeatherByWeather(
        `appid=${API_KEY}&lat=${lat}&lon=${long}&units=metric`
      );
      const { data } = await getWeatherByForecast(
        `appid=${API_KEY}&cnt=40&lat=${lat}&lon=${long}&units=metri`
      );
      setForcastData(data);
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const searchLocation = useCallback(
    async (cityName) => {
      try {
        setLoading(true);
        const { data } = await getWeatherByWeather(
          `q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const { data: response } = await getWeatherByForecast(
          `q=${cityName}&cnt=40&appid=${API_KEY}&units=metric`
        );
        setWeatherData(data);
        setForcastData(response);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        myLocationWeather(coordinates.latitude, coordinates.longitude);
      }
    },
    [coordinates.latitude, coordinates.longitude, myLocationWeather]
  );

  const handleClickCity = (weather) => {
    searchLocation(weather.name);
    window.scrollTo(0, 0);
  };
  const addFavoriteCity = (name) => {
    if (!cities.includes(name)) {
      setCities([name, ...cities]);
      localStorage.setItem("cities", JSON.stringify([name, ...cities]));
    }
  };
  const deleteCity = (weather) => {
    const filteredCities = cities.filter((c) => c !== weather.name);
    setCities(filteredCities);
    localStorage.setItem("cities", JSON.stringify(filteredCities));
  };

  const onClickLocationBtn = () => {
    const { latitude, longitude } = coordinates;
    myLocationWeather(latitude, longitude);
  };

  return (
    <weatherContext.Provider
      value={{
        deleteCity,
        handleClickCity,
        addFavoriteCity,
        cities,
        weatherData,
        onClickLocationBtn,
        searchLocation,
        coordinates,
        setError,
        forcastData,
      }}
    >
      <div className="container">
        {!(weatherData && forcastData) ? (
          <Progress />
        ) : (
          <>
            <WeatherSearch />
            {error && <ErrorMessage />}
            <MyLocation />
            <Cities />
            {loading && <Progress />}
          </>
        )}
      </div>
    </weatherContext.Provider>
  );
};

export default App;
