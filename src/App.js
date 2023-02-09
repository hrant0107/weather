import React, { createContext, useCallback, useEffect, useState } from "react";
import "./App.scss";

import WeatherSearch from "./components/searchWeather/SearchWheather";
import MyLocation from "./components/myLocation/MyLocation";
import Cities from "./components/favoriteCities/Cities";
import Progress from "./components/Progress";
import ErrorMessage from "./components/errorMessage/ErrorMessage";

import { API_KEY, API_URL, API_URL_WEATHER, CITIES } from "./constant";
import axios from "axios";

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
      const response = await axios.get(
        `${API_URL_WEATHER}appid=${API_KEY}&lat=${lat}&lon=${long}&units=metric`
      );
      const { data } = await axios.get(
        `${API_URL}appid=${API_KEY}&cnt=40&lat=${lat}&lon=${long}&units=metric`
      );
      const dataWeather = await response.data;
      setForcastData(data);
      setWeatherData(dataWeather);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const searchLocation = useCallback(
    async (cityName) => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL_WEATHER}q=${cityName}&appid=${API_KEY}&units=metric`
        );
        const response = await axios.get(
          `${API_URL}q=${cityName}&cnt=40&appid=${API_KEY}&units=metric`
        );
        const dataWeather = await response.data;

        setWeatherData(data);
        setForcastData(dataWeather);
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
