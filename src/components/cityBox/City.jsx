import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { API_KEY, API_URL_WEATHER } from "../../constant";
import ActiveCityInfo from "../cityInfo/ActiveCityInfo";

import styles from "./city.module.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { weatherContext } from "../../App";

const City = ({ cityName }) => {
  const { handleClickCity, deleteCity } = useContext(weatherContext);
  const [weather, setWeather] = useState();

  const onClickDelete = (e) => {
    e.stopPropagation();
    deleteCity(weather);
  };

  const onClick = () => {
    handleClickCity(weather);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${API_URL_WEATHER}q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(data);
    };
    getData();
  }, [cityName]);

  return (
    <div onClick={onClick} className={styles.box}>
      <HighlightOffIcon onClick={onClickDelete} className={styles.deleteIcon} />
      <ActiveCityInfo weather={weather} />
    </div>
  );
};

export default City;
