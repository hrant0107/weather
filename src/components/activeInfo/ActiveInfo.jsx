import React, { useCallback, useContext } from "react";
import { weatherContext } from "../../App";
import styles from "./activeInfo.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const ActiveInfo = () => {
  const { weatherData: weather, coordinates } = useContext(weatherContext);
  const isLocation =
    weather.coord.lat.toFixed(1) === coordinates.latitude.toFixed(1) &&
    weather.coord.lon.toFixed(1) === coordinates.longitude.toFixed(1);

  const getToday = useCallback(() => {
    const date = new Date();
    const month =
      date.getMonth() + 1 < 10
        ? `0` + (+date.getMonth() + 1)
        : +date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    return `${day}/${month}`;
  }, []);

  return (
    <div className={styles.activeInfoBlock}>
      <div className={styles.nameBlock}>
        <p className={styles.cityName}>{weather?.name}</p>
        {isLocation && <LocationOnIcon className={styles.location} />}
      </div>
      <p className={styles.day}>{getToday()}</p>
      <div className={styles.tempInfo}>
        <img src={`icons/${weather.weather[0].icon}.png`} alt="" />
        <p className={styles.temp}>{Math.round(weather?.main.temp)}° </p>
        <div className={styles.addInfo}>
          <p>
            Humidity: <span>{weather.main.humidity}</span>
          </p>
          <p>
            Wind: <span>{weather.wind.speed}</span>
          </p>
          <p>
            Feels like: <span>{weather.main.feels_like}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveInfo;
